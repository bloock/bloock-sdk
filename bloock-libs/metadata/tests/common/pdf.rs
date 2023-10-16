use bloock_metadata::{pdf::PdfParser, MetadataParser};

pub fn pdf_load() {
    let payload = include_bytes!("../assets/dummy.pdf");
    PdfParser::load(payload).unwrap();
}

pub fn pdf_get() {
    // let payload = include_bytes!("../assets/dummy-with-metadata.pdf");
    // let pdf = PdfParser::load(payload).unwrap();

    // let value: Vec<String> = pdf.get("signature").unwrap();

    // assert_eq!(value, vec!["signature1"])
}

pub fn pdf_set() {
    // let payload = include_bytes!("../assets/dummy.pdf");
    // let mut pdf = PdfParser::load(payload).unwrap();
    // assert!(pdf.get::<String>("proof").is_none());
    // pdf.set("proof", &String::from("proof")).unwrap();
    // assert_eq!(pdf.get::<String>("proof").unwrap(), "proof".to_owned());

    // let out = pdf.build().unwrap();
    // let pdf = PdfParser::load(&out).unwrap();
    // assert_eq!(pdf.get::<String>("proof").unwrap(), "proof".to_owned());
}
