use futures::{future::BoxFuture, FutureExt};
use iref::IriBuf;
use json_ld::{syntax::ErrorCode, Loader, RemoteDocument};
use json_syntax::Parse;
use locspan::Span;
use rdf_types::IriVocabularyMut;
use std::io::BufReader;
use std::io::Read;

pub struct BloockLoader {}

impl Loader<IriBuf, Span> for BloockLoader {
    type Output = json_syntax::Value<Span>;
    type Error = ErrorCode;

    fn load_with<'a>(
        &'a mut self,
        _vocabulary: &'a mut (impl Sync + Send + IriVocabularyMut<Iri = IriBuf>),
        url: IriBuf,
    ) -> BoxFuture<'a, json_ld::LoadingResult<IriBuf, Span, Self::Output, Self::Error>>
    where
        IriBuf: 'a,
    {
        let url: IriBuf = url.into();

        let mut req = ureq::get(&url.as_str());
        req = req.set("Content-Type", "application/ld+json");

        async move {
            let res = req.call().unwrap();

            let mut reader = BufReader::new(res.into_reader());
            let mut res_buffer = Vec::new();
            reader.read_to_end(&mut res_buffer).unwrap();
            let text = std::str::from_utf8(&res_buffer).unwrap();

            if let Ok(doc) = json_syntax::Value::parse_str(text, |span| span) {
                let remote_doc = RemoteDocument::new(
                    Some(url.clone()),
                    Some("application/ld+json".parse().unwrap()),
                    doc,
                );
                return Ok(remote_doc);
            } else {
                return Err(ErrorCode::LoadingDocumentFailed.into());
            }
        }
        .boxed()
    }
}
