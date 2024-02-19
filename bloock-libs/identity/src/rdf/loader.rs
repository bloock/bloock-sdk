use bloock_http::Client;
use bloock_http::SimpleHttpClient;
use futures::future::BoxFuture;
use iref::IriBuf;
use json_ld::{syntax::ErrorCode, Loader, RemoteDocument};
use json_syntax::Parse;
use locspan::Span;
use rdf_types::IriVocabularyMut;

const W3C_CREDENTIAL_2018_CONTEXT_URL: &str = "https://www.w3.org/2018/credentials/v1";
const W3C_CREDENTIAL_2018_CONTEXT_DOCUMENT: &str = r#"{
    "@context": {
      "@version": 1.1,
      "@protected": true,
      "id": "@id",
      "type": "@type",
      "VerifiableCredential": {
        "@id": "https://www.w3.org/2018/credentials#VerifiableCredential",
        "@context": {
          "@version": 1.1,
          "@protected": true,
          "id": "@id",
          "type": "@type",
          "cred": "https://www.w3.org/2018/credentials#",
          "sec": "https://w3id.org/security#",
          "xsd": "http://www.w3.org/2001/XMLSchema#",
          "credentialSchema": {
            "@id": "cred:credentialSchema",
            "@type": "@id",
            "@context": {
              "@version": 1.1,
              "@protected": true,
              "id": "@id",
              "type": "@type",
              "cred": "https://www.w3.org/2018/credentials#",
              "JsonSchemaValidator2018": "cred:JsonSchemaValidator2018"
            }
          },
          "credentialStatus": {"@id": "cred:credentialStatus", "@type": "@id"},
          "credentialSubject": {"@id": "cred:credentialSubject", "@type": "@id"},
          "evidence": {"@id": "cred:evidence", "@type": "@id"},
          "expirationDate": {"@id": "cred:expirationDate", "@type": "xsd:dateTime"},
          "holder": {"@id": "cred:holder", "@type": "@id"},
          "issued": {"@id": "cred:issued", "@type": "xsd:dateTime"},
          "issuer": {"@id": "cred:issuer", "@type": "@id"},
          "issuanceDate": {"@id": "cred:issuanceDate", "@type": "xsd:dateTime"},
          "proof": {"@id": "sec:proof", "@type": "@id", "@container": "@graph"},
          "refreshService": {
            "@id": "cred:refreshService",
            "@type": "@id",
            "@context": {
              "@version": 1.1,
              "@protected": true,
              "id": "@id",
              "type": "@type",
              "cred": "https://www.w3.org/2018/credentials#",
              "ManualRefreshService2018": "cred:ManualRefreshService2018"
            }
          },
          "termsOfUse": {"@id": "cred:termsOfUse", "@type": "@id"},
          "validFrom": {"@id": "cred:validFrom", "@type": "xsd:dateTime"},
          "validUntil": {"@id": "cred:validUntil", "@type": "xsd:dateTime"}
        }
      },
      "VerifiablePresentation": {
        "@id": "https://www.w3.org/2018/credentials#VerifiablePresentation",
        "@context": {
          "@version": 1.1,
          "@protected": true,
          "id": "@id",
          "type": "@type",
          "cred": "https://www.w3.org/2018/credentials#",
          "sec": "https://w3id.org/security#",
          "holder": {"@id": "cred:holder", "@type": "@id"},
          "proof": {"@id": "sec:proof", "@type": "@id", "@container": "@graph"},
          "verifiableCredential": {"@id": "cred:verifiableCredential", "@type": "@id", "@container": "@graph"}
        }
      },
      "EcdsaSecp256k1Signature2019": {
        "@id": "https://w3id.org/security#EcdsaSecp256k1Signature2019",
        "@context": {
          "@version": 1.1,
          "@protected": true,
          "id": "@id",
          "type": "@type",
          "sec": "https://w3id.org/security#",
          "xsd": "http://www.w3.org/2001/XMLSchema#",
          "challenge": "sec:challenge",
          "created": {"@id": "http://purl.org/dc/terms/created", "@type": "xsd:dateTime"},
          "domain": "sec:domain",
          "expires": {"@id": "sec:expiration", "@type": "xsd:dateTime"},
          "jws": "sec:jws",
          "nonce": "sec:nonce",
          "proofPurpose": {
            "@id": "sec:proofPurpose",
            "@type": "@vocab",
            "@context": {
              "@version": 1.1,
              "@protected": true,
              "id": "@id",
              "type": "@type",
              "sec": "https://w3id.org/security#",
              "assertionMethod": {"@id": "sec:assertionMethod", "@type": "@id", "@container": "@set"},
              "authentication": {"@id": "sec:authenticationMethod", "@type": "@id", "@container": "@set"}
            }
          },
          "proofValue": "sec:proofValue",
          "verificationMethod": {"@id": "sec:verificationMethod", "@type": "@id"}
        }
      },
      "EcdsaSecp256r1Signature2019": {
        "@id": "https://w3id.org/security#EcdsaSecp256r1Signature2019",
        "@context": {
          "@version": 1.1,
          "@protected": true,
          "id": "@id",
          "type": "@type",
          "sec": "https://w3id.org/security#",
          "xsd": "http://www.w3.org/2001/XMLSchema#",
          "challenge": "sec:challenge",
          "created": {"@id": "http://purl.org/dc/terms/created", "@type": "xsd:dateTime"},
          "domain": "sec:domain",
          "expires": {"@id": "sec:expiration", "@type": "xsd:dateTime"},
          "jws": "sec:jws",
          "nonce": "sec:nonce",
          "proofPurpose": {
            "@id": "sec:proofPurpose",
            "@type": "@vocab",
            "@context": {
              "@version": 1.1,
              "@protected": true,
              "id": "@id",
              "type": "@type",
              "sec": "https://w3id.org/security#",
              "assertionMethod": {"@id": "sec:assertionMethod", "@type": "@id", "@container": "@set"},
              "authentication": {"@id": "sec:authenticationMethod", "@type": "@id", "@container": "@set"}
            }
          },
          "proofValue": "sec:proofValue",
          "verificationMethod": {"@id": "sec:verificationMethod", "@type": "@id"}
        }
      },
      "Ed25519Signature2018": {
        "@id": "https://w3id.org/security#Ed25519Signature2018",
        "@context": {
          "@version": 1.1,
          "@protected": true,
          "id": "@id",
          "type": "@type",
          "sec": "https://w3id.org/security#",
          "xsd": "http://www.w3.org/2001/XMLSchema#",
          "challenge": "sec:challenge",
          "created": {"@id": "http://purl.org/dc/terms/created", "@type": "xsd:dateTime"},
          "domain": "sec:domain",
          "expires": {"@id": "sec:expiration", "@type": "xsd:dateTime"},
          "jws": "sec:jws",
          "nonce": "sec:nonce",
          "proofPurpose": {
            "@id": "sec:proofPurpose",
            "@type": "@vocab",
            "@context": {
              "@version": 1.1,
              "@protected": true,
              "id": "@id",
              "type": "@type",
              "sec": "https://w3id.org/security#",
              "assertionMethod": {"@id": "sec:assertionMethod", "@type": "@id", "@container": "@set"},
              "authentication": {"@id": "sec:authenticationMethod", "@type": "@id", "@container": "@set"}
            }
          },
          "proofValue": "sec:proofValue",
          "verificationMethod": {"@id": "sec:verificationMethod", "@type": "@id"}
        }
      },
      "RsaSignature2018": {
        "@id": "https://w3id.org/security#RsaSignature2018",
        "@context": {
          "@version": 1.1,
          "@protected": true,
          "challenge": "sec:challenge",
          "created": {"@id": "http://purl.org/dc/terms/created", "@type": "xsd:dateTime"},
          "domain": "sec:domain",
          "expires": {"@id": "sec:expiration", "@type": "xsd:dateTime"},
          "jws": "sec:jws",
          "nonce": "sec:nonce",
          "proofPurpose": {
            "@id": "sec:proofPurpose",
            "@type": "@vocab",
            "@context": {
              "@version": 1.1,
              "@protected": true,
              "id": "@id",
              "type": "@type",
              "sec": "https://w3id.org/security#",
              "assertionMethod": {"@id": "sec:assertionMethod", "@type": "@id", "@container": "@set"},
              "authentication": {"@id": "sec:authenticationMethod", "@type": "@id", "@container": "@set"}
            }
          },
          "proofValue": "sec:proofValue",
          "verificationMethod": {"@id": "sec:verificationMethod", "@type": "@id"}
        }
      },
      "proof": {"@id": "https://w3id.org/security#proof", "@type": "@id", "@container": "@graph"}
    }
  }"#;

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
            let client = SimpleHttpClient {};
            let url_string = url.as_str().to_string();

            let schema = if url_string != W3C_CREDENTIAL_2018_CONTEXT_URL {
                let req = client.get(
                    url.as_str().to_string(),
                    Some(vec![(
                        "Content-Type".to_string(),
                        "application/ld+json".to_string(),
                    )]),
                );

                let res = req.await.unwrap();

                std::str::from_utf8(&res).unwrap().to_string()
            } else {
                W3C_CREDENTIAL_2018_CONTEXT_DOCUMENT.to_string()
            };

            if let Ok(doc) = json_syntax::Value::parse_str(&schema, |span| span) {
                let remote_doc = RemoteDocument::new(
                    Some(url.clone()),
                    Some("application/ld+json".parse().unwrap()),
                    doc,
                );
                Ok(remote_doc)
            } else {
                Err(ErrorCode::LoadingDocumentFailed)
            }
        })
    }
}
