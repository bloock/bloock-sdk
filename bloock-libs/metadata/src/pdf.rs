use crate::{
    cms::asn1::rfc5035::{
        ESSCertIDv2, ESSCertIDv2Sequence, SigningCertificateV2, ESSCERTIDV2_DEFAULT_HASH_ALGORITHM,
    },
    dictionary::{
        acro_form::AcroForm as AcroFormDictionary, annotation::PdfAnnotationWidget, error::Error,
        signature_dictionary::SignatureDictionary, utils,
    },
    MetadataError, MetadataParser, Result as BloockResult,
};
use async_trait::async_trait;
use bcder::{Captured, Mode, OctetString};
use bloock_encrypter::{Decrypter, Encrypter};
use bloock_hasher::sha256::Sha256;
use bloock_hasher::Hasher;
use bloock_keys::{certificates::GetX509Certficate, entity::key::Key};
use bloock_signer::entity::{alg::SignAlg, signature::Signature};
use cms::content_info::ContentInfo;
use cms::{
    cert::{CertificateChoices, IssuerAndSerialNumber},
    content_info::CmsVersion,
    signed_data::{
        DigestAlgorithmIdentifiers, EncapsulatedContentInfo, SignatureValue, SignedAttributes,
        SignedData, SignerIdentifier, SignerInfo, SignerInfos,
    },
};
use const_oid::db::rfc5911::{ID_AA_SIGNING_CERTIFICATE_V_2, ID_SIGNED_DATA};
use const_oid::db::rfc5912::{ID_SHA_256, SHA_256_WITH_RSA_ENCRYPTION};
use const_oid::db::rfc6268::{ID_CONTENT_TYPE, ID_DATA, ID_MESSAGE_DIGEST};
use lopdf::{Dictionary, Document, Object};
use rsa::{
    pkcs8::{DecodePublicKey, EncodePublicKey, LineEnding},
    RsaPublicKey,
};
use serde::{de::DeserializeOwned, Serialize};
use x509_cert::{
    attr::Attribute,
    der::{
        asn1::{OctetStringRef, SetOfVec},
        Any,
    },
    spki::{AlgorithmIdentifier, AlgorithmIdentifierOwned},
};
use x509_cert::{
    certificate::CertificateInner,
    der::{Decode, Encode},
};
use x509_cert::{der::AnyRef, Certificate};

#[derive(Debug, Clone)]
pub struct PdfParser {
    modified: bool,
    document: Document,
    original_payload: Vec<u8>,
}

#[async_trait(?Send)]
impl MetadataParser for PdfParser {
    fn load(payload: &[u8]) -> BloockResult<Self> {
        let document =
            Document::load_from(payload).map_err(|e| MetadataError::LoadError(e.to_string()))?;
        let parser = PdfParser {
            modified: false,
            document,
            original_payload: payload.to_vec(),
        };

        Ok(parser)
    }

    async fn sign(
        &mut self,
        key: &Key,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> BloockResult<Signature> {
        self.modified = true;

        // Preparation of the file
        let page_id = self.document.get_pages().get(&1).unwrap().to_owned();

        let mut signature_dict = SignatureDictionary::default();
        let dictionary: Dictionary = signature_dict
            .clone()
            .try_into()
            .map_err(|_| MetadataError::LoadMetadataError("".to_string()))?;
        let signature_id = self.document.add_object(dictionary);

        // Create signature annotation
        let annotation = PdfAnnotationWidget {
            rect: Some(vec![0, 0, 0, 0]),
            p: Some(page_id),
            ap: None,
            v: Some(signature_id),
            ..Default::default()
        };
        let annotation_dict: Dictionary = annotation
            .try_into()
            .map_err(|_| MetadataError::LoadMetadataError("".to_string()))?;
        let annotation_id = self.document.add_object(annotation_dict);

        let page_dict = self
            .document
            .get_dictionary_mut(page_id)
            .map_err(|_| MetadataError::LoadMetadataError("".to_string()))?;

        let mut annots = match page_dict.get(b"Annots") {
            Ok(a) => a
                .as_array()
                .map_err(|_| MetadataError::LoadMetadataError("".to_string()))?
                .to_owned(),
            Err(_) => vec![],
        };
        annots.push(Object::Reference(annotation_id));
        page_dict.set(b"Annots".to_vec(), annots);

        // Create AcroForm dictionary entry
        let root = utils::get_root_mut(&mut self.document)
            .map_err(|_| MetadataError::LoadMetadataError("".to_string()))?;

        let mut acro_form = match root.get(b"AcroForm") {
            Ok(a) => AcroFormDictionary::try_from(
                a.as_dict()
                    .map_err(|_| MetadataError::LoadMetadataError("".to_string()))?,
            )
            .map_err(|_| MetadataError::LoadMetadataError("".to_string()))?,
            Err(_) => AcroFormDictionary::default(),
        };
        acro_form.fields.push(annotation_id);
        let acro_form_dict: Dictionary = acro_form
            .try_into()
            .map_err(|_| MetadataError::LoadMetadataError("".to_string()))?;

        root.set(b"AcroForm".to_vec(), acro_form_dict);

        // Compute ByteRange
        let pdf_payload = self.build()?;
        let byte_range_payload = self.compute_byte_range(pdf_payload)?;
        signature_dict.byte_range = byte_range_payload.clone();
        let dictionary: Dictionary = signature_dict
            .clone()
            .try_into()
            .map_err(|e| MetadataError::LoadMetadataError("".to_string()))?;
        self.document.set_object(signature_id, dictionary);

        //Get payload to sign
        let effective_payload = self.get_signed_content(byte_range_payload.clone())?;
        let cert = match key
            .get_certificate(api_host.clone(), api_key.clone(), environment.clone())
            .await
        {
            Some(c) => c,
            None => Err(MetadataError::GetSignedDataError(
                "Error getting certificate".to_string(),
            ))?,
        };
        let signed_attributes = self.get_signed_attributes(effective_payload, cert.clone())?;
        let signed_attributes_encoded =
            self.get_signed_attributes_encoded(signed_attributes.clone())?;

        //Sign
        let signature = bloock_signer::sign(
            api_host.clone(),
            api_key.clone(),
            environment.clone(),
            &signed_attributes_encoded,
            &key,
        )
        .await
        .map_err(|e| MetadataError::LoadError(e.to_string()))?;

        //Prepare sign inclusion
        let signature_payload = self
            .get_signed_data(signature.clone(), cert, signed_attributes)
            .await?;

        //Add signature
        signature_dict
            .compute_content(signature_payload)
            .map_err(|e| MetadataError::LoadMetadataError("".to_string()))?;
        let dictionary: Dictionary = signature_dict
            .clone()
            .try_into()
            .map_err(|e| MetadataError::LoadMetadataError("".to_string()))?;
        self.document.set_object(signature_id, dictionary);

        Ok(signature)
    }

    async fn verify(
        &self,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> BloockResult<bool> {
        let verifications = self.get_signatures_and_payload()?;

        for verification in verifications.iter() {
            bloock_signer::verify(
                api_host.clone(),
                api_key.clone(),
                environment.clone(),
                &verification.1,
                &verification.0,
            )
            .await
            .map_err(|e| MetadataError::LoadError(e.to_string()))?;
        }

        Ok(true)
    }

    async fn encrypt(&mut self, encrypter: Box<dyn Encrypter>) -> BloockResult<()> {
        todo!()
    }

    async fn decrypt(&mut self, decrypter: Box<dyn Decrypter>) -> BloockResult<()> {
        todo!()
    }

    fn set_proof<T: Serialize>(&mut self, value: &T) -> BloockResult<()> {
        self.set("proof", value)
    }

    fn get_proof<T: DeserializeOwned>(&self) -> Option<T> {
        self.get("proof")
    }

    fn get_signatures(&self) -> BloockResult<Vec<Signature>> {
        let mut signatures = Vec::new();
        let verifications = self.get_signatures_and_payload()?;

        for verification in verifications.iter() {
            signatures.push(verification.0.clone());
        }

        Ok(signatures)
    }

    fn get_encryption_algorithm(&self) -> Option<String> {
        self.get("encryption_alg")
    }

    fn is_encrypted(&self) -> bool {
        let is_encrypted: Option<bool> = self.get("is_encrypted");
        match is_encrypted {
            Some(s) => s,
            None => false,
        }
    }

    fn build(&self) -> BloockResult<Vec<u8>> {
        // document.save_to alters the original document (even if it hasn't been modified) and thus
        // BloockResults in a different hash. To avoid this, we return the original payload if it has not
        // been modified
        if self.modified {
            let mut out: Vec<u8> = Vec::new();
            let mut raw_document = self.document.clone();
            raw_document.compress();
            raw_document
                .save_to(&mut out)
                .map_err(|e| MetadataError::WriteError(e.to_string()))?;
            Ok(out)
        } else {
            Ok(self.original_payload.clone())
        }
    }
}

const BYTE_RANGE_PLACEHOLDER: &str = "/ByteRange[0 10000 20000 100]";

impl PdfParser {
    fn del(&mut self, key: &str) -> BloockResult<()> {
        self.modified = true;

        let dictionary = self.get_metadata_dict_mut()?;

        let object = Object::from(key);
        let object_key = object
            .as_name()
            .map_err(|e| MetadataError::LoadMetadataError(e.to_string()))?;
        dictionary.remove(object_key);

        Ok(())
    }

    fn set<T: Serialize>(&mut self, key: &str, value: &T) -> BloockResult<()> {
        self.modified = true;

        let dictionary = self.get_metadata_dict_mut()?;

        let object = Object::from(key);
        let object_key = object
            .as_name()
            .map_err(|e| MetadataError::LoadMetadataError(e.to_string()))?;

        let v = serde_json::to_string(value).map_err(|_| MetadataError::SerializeError)?;
        dictionary.set(object_key, Object::string_literal(v));

        Ok(())
    }

    fn get<T: DeserializeOwned>(&self, key: &str) -> Option<T> {
        let dictionary = self.get_metadata_dict().ok()?;

        let object = Object::from(key);
        dictionary
            .get(object.as_name().ok()?)
            .ok()
            .and_then(|v| v.as_str().ok())
            .and_then(|v| serde_json::from_slice(v).ok())
    }

    fn get_metadata_dict(&self) -> BloockResult<&Dictionary> {
        self.document
            .trailer
            .get(b"Info")
            .and_then(Object::as_reference)
            .and_then(|id| self.document.get_object(id))
            .and_then(Object::as_dict)
            .map_err(|e| MetadataError::LoadMetadataError(e.to_string()))
    }

    fn get_metadata_dict_mut(&mut self) -> BloockResult<&mut Dictionary> {
        self.document
            .trailer
            .get(b"Info")
            .and_then(Object::as_reference)
            .and_then(|id| self.document.get_object_mut(id))
            .and_then(Object::as_dict_mut)
            .map_err(|e| MetadataError::LoadMetadataError(e.to_string()))
    }

    fn compute_byte_range(&self, content: Vec<u8>) -> BloockResult<Vec<i64>> {
        let byte_range_pos = content
            .windows(BYTE_RANGE_PLACEHOLDER.len())
            .rposition(|window| window == BYTE_RANGE_PLACEHOLDER.as_bytes())
            .ok_or(MetadataError::GetPayloadToSignError("Malformed PDF".into()))?;
        let byte_range_end = byte_range_pos + BYTE_RANGE_PLACEHOLDER.len();

        let contents_tag_pos = content[byte_range_end..]
            .windows(9)
            .position(|window| window == b"/Contents")
            .ok_or(MetadataError::GetPayloadToSignError("Malformed PDF".into()))?
            + byte_range_end;
        let placeholder_pos = content[contents_tag_pos..]
            .windows(1)
            .position(|window| window == b"<")
            .ok_or(MetadataError::GetPayloadToSignError("Malformed PDF".into()))?
            + contents_tag_pos;
        let placeholder_end = content[placeholder_pos..]
            .windows(1)
            .position(|window| window == b">")
            .ok_or(MetadataError::GetPayloadToSignError("Malformed PDF".into()))?
            + placeholder_pos;
        let placeholder_length_with_brackets = (placeholder_end + 1) - placeholder_pos;
        let placeholder_length = placeholder_length_with_brackets - 2;

        let mut byte_range = [0i64; 4];
        byte_range[1] = placeholder_pos as i64;
        byte_range[2] = byte_range[1] + placeholder_length_with_brackets as i64;
        byte_range[3] = content.len() as i64 - byte_range[2];

        // /ByteRange[0 10000 20000 100]
        let original_length = BYTE_RANGE_PLACEHOLDER.len() - 12;

        let actual_length = byte_range
            .iter()
            .map(|item| format!("{:?}", item))
            .collect::<Vec<String>>()
            .join(" ")
            .len();

        let diff = actual_length as i64 - original_length as i64;
        byte_range[1] = byte_range[1] + diff;
        byte_range[2] = byte_range[2] + diff;

        let byte_range = byte_range.to_vec();

        Ok(byte_range)
    }

    fn get_signed_content(&self, byte_range: Vec<i64>) -> BloockResult<Vec<u8>> {
        let payload = self
            .build()
            .map_err(|e| MetadataError::GetPayloadToSignError(e.to_string()))?;
        let first_range = byte_range[0] as usize..=(byte_range[0] + byte_range[1] - 1) as usize;
        let first_part = &payload[first_range];

        let second_range = byte_range[2] as usize..=(byte_range[2] + byte_range[3] - 1) as usize;

        let second_part = &payload[second_range];

        let capacity: usize = (byte_range[1] + byte_range[3]).try_into().map_err(|_| {
            MetadataError::GetPayloadToSignError("could not reserve capacity for byte range".into())
        })?;
        let mut signed_data = Vec::with_capacity(capacity);
        signed_data.extend_from_slice(first_part);
        signed_data.extend_from_slice(second_part);

        Ok(signed_data)
    }

    fn get_signed_attributes(
        &self,
        effective_payload: Vec<u8>,
        cert: Certificate,
    ) -> BloockResult<SignedAttributes> {
        let mut signed_attributes = SignedAttributes::default();
        let content_type = ID_DATA;

        signed_attributes
            .insert(Attribute {
                oid: ID_CONTENT_TYPE,
                values: SetOfVec::try_from(vec![Any::from(content_type)]).unwrap(),
            })
            .unwrap();

        let digest = Sha256::generate_hash(&[&effective_payload]);

        signed_attributes
            .insert(Attribute {
                oid: ID_MESSAGE_DIGEST,
                values: SetOfVec::try_from(vec![Any::from(OctetStringRef::new(&digest).unwrap())])
                    .unwrap(),
            })
            .unwrap();

        let cert_der = cert.to_der().unwrap();
        let cert_hash = Sha256::generate_hash(&[&cert_der]).to_vec();

        let signing_certificate = SigningCertificateV2 {
            certs: ESSCertIDv2Sequence(vec![ESSCertIDv2 {
                hash_algorithm: ESSCERTIDV2_DEFAULT_HASH_ALGORITHM.into(),
                cert_hash: OctetString::new(cert_hash.into()),
                issuer_serial: None,
            }]),
            policies: None,
        };
        let captured_signing_certificate =
            Captured::from_values(Mode::Der, signing_certificate.encode_ref());
        let signing_certificate_bytes = captured_signing_certificate.as_slice();

        signed_attributes
            .insert(Attribute {
                oid: ID_AA_SIGNING_CERTIFICATE_V_2,
                values: SetOfVec::try_from(vec![Any::from_der(signing_certificate_bytes).unwrap()])
                    .unwrap(),
            })
            .unwrap();

        let attributes: Vec<(Vec<u8>, Attribute)> = signed_attributes
            .iter()
            .map(|x| {
                let mut encoded = vec![];
                x.values.encode_to_vec(&mut encoded).unwrap();

                Ok((encoded, x.clone()))
            })
            .collect::<Result<Vec<(_, _)>, std::io::Error>>()
            .unwrap();
        let mut signed_sorted_attributes = SignedAttributes::default();
        for attr in attributes {
            signed_sorted_attributes.insert(attr.1).unwrap();
        }

        Ok(signed_sorted_attributes)
    }

    fn get_signed_attributes_encoded(
        &self,
        signed_attributes: SignedAttributes,
    ) -> BloockResult<Vec<u8>> {
        let mut signed_attributes_der = Vec::new();
        signed_attributes
            .encode_to_vec(&mut signed_attributes_der)
            .unwrap();

        Ok(signed_attributes_der)
    }
    async fn get_signed_data(
        &self,
        signature: Signature,
        cert: Certificate,
        signed_attributes: SignedAttributes,
    ) -> BloockResult<Vec<u8>> {
        let mut signer_infos = SetOfVec::default();
        let mut certificates = SetOfVec::default();

        certificates
            .insert(CertificateChoices::Certificate(cert.clone()))
            .unwrap();

        let signer_info = SignerInfo {
            version: CmsVersion::V1,
            sid: SignerIdentifier::IssuerAndSerialNumber(IssuerAndSerialNumber {
                issuer: cert.tbs_certificate.issuer,
                serial_number: cert.tbs_certificate.serial_number,
            }),
            signed_attrs: Some(signed_attributes),
            signature_algorithm: AlgorithmIdentifierOwned {
                oid: SHA_256_WITH_RSA_ENCRYPTION,
                parameters: None,
            },
            signature: SignatureValue::new(hex::decode(signature.signature).unwrap()).unwrap(),
            digest_alg: AlgorithmIdentifierOwned {
                oid: ID_SHA_256,
                parameters: None,
            },
            unsigned_attrs: None,
        };

        signer_infos.insert(signer_info).unwrap();

        let mut digest_algorithms = DigestAlgorithmIdentifiers::default();
        digest_algorithms
            .insert(AlgorithmIdentifier {
                oid: ID_SHA_256,
                parameters: None,
            })
            .unwrap();

        let signed_data = SignedData {
            version: CmsVersion::V1,
            digest_algorithms,
            encap_content_info: EncapsulatedContentInfo {
                econtent_type: ID_DATA,
                econtent: None,
            },
            certificates: if certificates.is_empty() {
                None
            } else {
                Some(cms::signed_data::CertificateSet(certificates))
            },
            crls: None,
            signer_infos: SignerInfos(signer_infos),
        };

        let signed_data_der = signed_data
            .to_der()
            .map_err(|e| MetadataError::GetSignedDataError(e.to_string()))?;

        let content = AnyRef::try_from(signed_data_der.as_slice()).unwrap();

        let content_info = ContentInfo {
            content_type: ID_SIGNED_DATA,
            content: Any::from(content),
        };

        content_info
            .to_der()
            .map_err(|e| MetadataError::GetSignedDataError(e.to_string()))
    }

    fn get_signatures_and_payload(&self) -> BloockResult<Vec<(Signature, Vec<u8>)>> {
        println!("Enter get signatures and payload");

        let document = self.document.clone();
        let root = utils::get_root(&document).map_err(|e| MetadataError::DeserializeError)?;

        let acro_form = match root.get(b"AcroForm") {
            Ok(a) => AcroFormDictionary::try_from(
                a.as_dict()
                    .map_err(|e| MetadataError::LoadError(e.to_string()))?,
            )
            .map_err(|e| MetadataError::DeserializeError)?,
            Err(_) => AcroFormDictionary::default(),
        };

        let annotations: Vec<PdfAnnotationWidget> = acro_form
            .fields
            .iter()
            .filter_map(|f| {
                let id = f.to_owned().to_owned();
                document
                    .get_object(id)
                    .and_then(|o| o.as_dict())
                    .map_err(Error::LoPdf)
                    .and_then(PdfAnnotationWidget::try_from)
                    .ok()
                    .filter(|a| a.r#type == *"Annot")
            })
            .collect();

        let signature_ids: Vec<(u32, u16)> = annotations.iter().filter_map(|a| a.v).collect();
        let signatures: Vec<SignatureDictionary> = signature_ids
            .iter()
            .filter_map(|s| {
                let id = s.to_owned();
                document
                    .get_object(id)
                    .and_then(|o| o.as_dict())
                    .map_err(Error::LoPdf)
                    .and_then(SignatureDictionary::try_from)
                    .ok()
            })
            .collect();

        let pdf_payload = self.build().map_err(|e| MetadataError::DeserializeError)?;

        let mut response = Vec::new();
        for signature in signatures.iter() {
            let sanitized_signature_content = remove_trailing_zeros(signature.contents.clone());
            let ci = ContentInfo::from_der(&sanitized_signature_content).unwrap();
            let bytes = ci.content.to_der().unwrap();
            let signed_content = signature
                .get_signed_content(&pdf_payload)
                .ok()
                .zip(SignedData::from_der(bytes.as_slice()).ok());
            let res_signed_content = match signed_content {
                Some(s) => (s.0, s.1),
                None => return Err(MetadataError::DeserializeError),
            };
            let signed_payload = res_signed_content.0.clone();
            let signed_data = res_signed_content.1.clone();

            for signer in signed_data.signer_infos.0.iter() {
                let raw_signature = signer.signature.as_bytes();
                let algorithm = SignAlg::Rsa;
                let message_hash = match signer.signed_attrs.clone() {
                    Some(s) => {
                        let signed_attributes_encoded = self.get_signed_attributes_encoded(s)?;
                        Sha256::generate_hash(&[&signed_attributes_encoded]).to_vec()
                    }
                    None => return Err(MetadataError::DeserializeError),
                };

                let unparsed_public_key = match signed_data.certificates.clone() {
                    Some(c) => {
                        let mut vv = vec![];
                        for certificate in c.0.iter() {
                            let cert: CertificateInner =
                                CertificateInner::from_der(&certificate.to_der().unwrap()).unwrap();
                            vv = cert
                                .tbs_certificate
                                .subject_public_key_info
                                .to_der()
                                .unwrap();
                            break;
                        }
                        vv
                    }
                    None => return Err(MetadataError::DeserializeError),
                };
                let rsa_public_key: RsaPublicKey =
                    DecodePublicKey::from_public_key_der(&unparsed_public_key).unwrap();

                let signature = Signature {
                    alg: algorithm,
                    kid: rsa_public_key
                        .to_public_key_pem(LineEnding::default())
                        .unwrap(),
                    signature: hex::encode(raw_signature),
                    message_hash: hex::encode(message_hash),
                };
                response.push((signature, signed_payload.clone()));
            }
        }
        Ok(response)
    }
}

fn remove_trailing_zeros(mut data: Vec<u8>) -> Vec<u8> {
    while !data.is_empty() && data.last() == Some(&0u8) {
        data.pop();
    }
    data
}
