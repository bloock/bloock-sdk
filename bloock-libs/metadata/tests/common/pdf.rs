use std::fs;

use bloock_keys::{
    certificates::{
        local::{LocalCertificate, LocalCertificateParams},
        CertificateSubject,
    },
    KeyType,
};
use bloock_metadata::{pdf::PdfParser, MetadataParser};

pub fn pdf_load() {
    let payload = include_bytes!("../assets/dummy.pdf");
    PdfParser::load(payload).unwrap();
}

pub async fn pdf_sign() {
    let payload = include_bytes!("../assets/dummy.pdf");
    let mut pdf = PdfParser::load(payload).unwrap();

    let p12 = include_bytes!("/Users/marcbaque/Desktop/Certificates.p12");
    let first_certificate = LocalCertificate::load_pkcs12(p12, "47958150E").unwrap();

    pdf.sign(
        &first_certificate.into(),
        None,
        None,
        "".to_string(),
        "".to_string(),
    )
    .await
    .unwrap();

    fs::write("./tests/assets/dummy-sign.pdf", pdf.build().unwrap()).unwrap();
}

pub async fn pdf_multisign() {
    let payload = include_bytes!("../assets/dummy.pdf");
    let mut pdf = PdfParser::load(payload).unwrap();

    let certificate_params = LocalCertificateParams {
        key_type: bloock_keys::KeyType::Rsa2048,
        subject: CertificateSubject {
            common_name: "Google internet Authority G2".to_string(),
            organization: Some("Google Inc".to_string()),
            organizational_unit: Some("IT Department".to_string()),
            country: Some("US".to_string()),
            state: None,
            location: None,
        },
        expiration: 1,
        password: "password".to_string(),
    };
    let local_certificate = LocalCertificate::new(&certificate_params).unwrap();

    pdf.sign(
        &local_certificate.clone().into(),
        None,
        None,
        "".to_string(),
        "".to_string(),
    )
    .await
    .unwrap();

    let result = pdf.build().unwrap();

    let mut pdf = PdfParser::load(&result).unwrap();
    pdf.sign(
        &local_certificate.clone().into(),
        None,
        None,
        "".to_string(),
        "".to_string(),
    )
    .await
    .unwrap();

    let result = pdf.build().unwrap();
}
