use bloock_http::Client;
use bloock_http::SimpleHttpClient;
use futures::future::BoxFuture;
use iref::IriBuf;
use json_ld::{syntax::ErrorCode, Loader, RemoteDocument};
use json_syntax::Parse;
use locspan::Span;
use rdf_types::IriVocabularyMut;

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
        Box::pin(async move {
            let url: IriBuf = url.into();
            let client = SimpleHttpClient {};

            #[cfg(target_arch = "wasm32")]
            web_sys::console::log_1(&"1".into());

            let req = client.get(
                url.as_str().to_string(),
                Some(vec![(
                    "Content-Type".to_string(),
                    "application/ld+json".to_string(),
                )]),
            );

            #[cfg(target_arch = "wasm32")]
            web_sys::console::log_1(&"2".into());

            //let res = Executor::block_on(req).unwrap().unwrap();
            let res = req.await.unwrap();

            #[cfg(target_arch = "wasm32")]
            web_sys::console::log_1(&"3".into());

            let text = std::str::from_utf8(&res).unwrap();

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
        })
    }
}
