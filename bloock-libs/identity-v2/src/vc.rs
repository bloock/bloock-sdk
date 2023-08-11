use crate::{
    claim::Claim,
    did::parse_did,
    error::IdentityError,
    hash::Hasher,
    merkle::Merkle,
    merklize::merklize::{add_entries_to_merkle_tree, entries_from_rdf},
    rdf::{
        loader::BloockLoader,
        rdf_entry::{normalize, to_dataset_for_signing},
    },
    schema::{create_schema_hash, DEFAULT_SCHEMA_TYPE},
    util::{new_uuid, rand_int64},
};
use chrono::{Local, NaiveDateTime};
use jsonschema::JSONSchema;
use num_bigint::BigInt;
use serde_json::{Number, Value};
use ssi::vc::{Context, Credential, CredentialSubject, OneOrMany, Schema, Status, VCDateTime};
use std::collections::HashMap;
use std::{collections::HashMap as Map, str::FromStr};

pub const DEFAULT_CONTEXT: &str = "https://www.w3.org/2018/credentials/v1";
pub const DEFAULT_IDEN3_CONTEXT: &str = "https://schema.iden3.io/core/jsonld/iden3proofs.jsonld";
pub const DEFAULT_IDEN3_CREDENTIAL_STATUS_TYPE: &str = "SparseMerkleTreeProof";
pub const DEFAULT_VERIFIABLE_CREDENTIAL_TYPE: &str = "VerifiableCredential";
pub const DEFAULT_EXPIRATION_DATE_FORMAT: &str = "%Y-%m-%dT%H:%M:%SZ";

pub struct VC {
    credential: Credential,
    credential_id: String,
    credential_type: String,
    nonce: u64,
    version: i32,
}

impl VC {
    pub fn new(
        context_json_ld: String,
        schema_cid: String,
        schema_type: String,
        issuer: String,
        holder: String,
        expiration: i64,
        attributes: Vec<(String, Value)>,
        credential_type: String,
        version: i32,
        api_host: String,
    ) -> Result<Self, IdentityError> {
        let issuance_date = Local::now().naive_local();
        let nonce =
            rand_int64().map_err(|e| IdentityError::ErrorCreatingCredential(e.to_string()))?;
        let uuid = new_uuid();

        Self::new_internal(
            context_json_ld,
            schema_cid,
            schema_type,
            issuer,
            holder,
            expiration,
            attributes,
            credential_type,
            version,
            issuance_date,
            nonce,
            uuid,
            api_host,
        )
    }

    fn new_internal(
        context_json_ld: String,
        schema_cid: String,
        schema_type: String,
        issuer: String,
        holder: String,
        expiration: i64,
        attributes: Vec<(String, Value)>,
        credential_type: String,
        version: i32,
        issuance: NaiveDateTime,
        nonce: u64,
        uuid: String,
        api_host: String,
    ) -> Result<Self, IdentityError> {
        parse_did(issuer.clone()).map_err(|e| IdentityError::InvalidDid(e.to_string()))?;
        parse_did(holder.clone()).map_err(|e| IdentityError::InvalidDid(e.to_string()))?;

        let default_context = Context::URI(ssi::vc::URI::String(DEFAULT_CONTEXT.to_string()));
        let iden3_context = Context::URI(ssi::vc::URI::String(DEFAULT_IDEN3_CONTEXT.to_string()));
        let json_context = Context::URI(ssi::vc::URI::String(context_json_ld));
        let contexts: Vec<Context> = [default_context, iden3_context, json_context].to_vec();

        let credential_schema_id = format!("{}/hosting/v1/ipfs/{}", api_host, schema_cid);
        let credential_schema_type = DEFAULT_SCHEMA_TYPE.to_string();

        let credential_schema = Schema {
            id: ssi::vc::URI::String(credential_schema_id),
            type_: credential_schema_type,
            property_set: None,
        };

        let credential_status_id = format!(
            "{}/identity/v1/{}/claims/revocation/status/{}",
            api_host,
            issuer.clone(),
            nonce
        );
        let credential_status_type = DEFAULT_IDEN3_CREDENTIAL_STATUS_TYPE.to_string();

        let mut credential_status_map: HashMap<String, Value> = HashMap::new();
        credential_status_map.insert(
            "revocationNonce".to_string(),
            Value::Number(Number::from(nonce)),
        );
        let credential_status = Status {
            id: ssi::vc::URI::String(credential_status_id),
            type_: credential_status_type,
            property_set: Some(credential_status_map),
        };

        let expiration_date = NaiveDateTime::from_timestamp_opt(expiration, 0).unwrap();
        let credential_id = format!(
            "{}/identity/v1/{}/claims/{}",
            api_host,
            issuer.clone(),
            uuid
        );

        let credential_subject_map: Map<String, Value> = attributes.into_iter().collect();

        let credential_subject = CredentialSubject {
            id: Some(ssi::vc::URI::String(holder)),
            property_set: Some(credential_subject_map),
        };

        let _type = vec![DEFAULT_VERIFIABLE_CREDENTIAL_TYPE.to_string(), schema_type];

        let vc_issuance_date: VCDateTime = issuance.and_utc().try_into().unwrap();
        let vc_expiration_date: VCDateTime = expiration_date.and_utc().try_into().unwrap();

        let vc = VC {
            credential: Credential {
                context: ssi::vc::Contexts::Many(contexts),
                id: Some(ssi::vc::StringOrURI::String(credential_id)),
                type_: ssi::vc::OneOrMany::Many(_type),
                credential_subject: ssi::vc::OneOrMany::One(credential_subject),
                issuer: Some(ssi::vc::Issuer::URI(ssi::vc::URI::String(issuer))),
                issuance_date: Some(vc_issuance_date),
                expiration_date: Some(vc_expiration_date),
                credential_status: Some(credential_status),
                credential_schema: Some(ssi::vc::OneOrMany::One(credential_schema)),
                terms_of_use: None,
                evidence: None,
                refresh_service: None,
                property_set: None,
                proof: None,
            },
            credential_id: uuid,
            credential_type,
            nonce,
            version,
        };
        vc.credential
            .validate_unsigned()
            .map_err(|e| IdentityError::ErrorCreatingCredential(e.to_string()))?;

        Ok(vc)
    }

    pub fn validate_schema(&self, schema: String) -> Result<(), IdentityError> {
        let vc = serde_json::to_value(self.credential.clone())
            .map_err(|e| IdentityError::ErrorCredentialSerialize(e.to_string()))?;
        let schema_value = Value::from_str(&schema)
            .map_err(|e| IdentityError::ErrorParsingSchema(e.to_string()))?;

        let schema_compiled = JSONSchema::compile(&schema_value)
            .map_err(|e| IdentityError::ErrorParsingSchema(e.to_string()))?;

        let result = schema_compiled.validate(&vc);
        if let Err(errors) = result {
            for error in errors {
                return Err(IdentityError::ErrorSchemaValidation(error.to_string()));
            }
        }

        Ok(())
    }

    pub async fn get_core_claim(&self) -> Result<Claim, IdentityError> {
        let hash = Hasher {};

        let root_merkle = self.merklize_credential(hash.clone()).await?;
        let schema_hash = create_schema_hash(self.credential_type.as_bytes());
        let subject_id_uri: ssi::vc::URI = match self.credential.credential_subject.clone() {
            OneOrMany::One(credential_subject) => match credential_subject.id {
                Some(id) => id,
                None => Err(IdentityError::ErrorCredentialIdNotFound)?,
            },
            OneOrMany::Many(credential_subject) => match credential_subject.get(0) {
                Some(cs) => match cs.id.clone() {
                    Some(id) => id,
                    None => Err(IdentityError::ErrorCredentialIdNotFound)?,
                },
                None => Err(IdentityError::ErrorCredentialIdNotFound)?,
            },
        };
        let subject_did = parse_did(subject_id_uri.as_str().to_string())
            .map_err(|e| IdentityError::InvalidDid(e.to_string()))?;
        let expiration_date_string: String = match self.credential.expiration_date.clone() {
            Some(e) => e.into(),
            None => return Err(IdentityError::ErrorCredentialExpirtionDateNotFound),
        };
        let expiration_date =
            NaiveDateTime::parse_from_str(&expiration_date_string, DEFAULT_EXPIRATION_DATE_FORMAT)
                .map_err(|e| IdentityError::ErrorParseType(e.to_string()))?;

        let mut claim_core = Claim::default(schema_hash, hash);
        claim_core.set_revocation_nonce(self.nonce);
        claim_core.set_version(self.version);
        claim_core.set_expiration_date(expiration_date);
        claim_core.set_index_id(subject_did.id);
        claim_core.set_index_merklized_root(&root_merkle).unwrap();

        Ok(claim_core)
    }

    async fn merklize_credential(&self, hash: Hasher) -> Result<BigInt, IdentityError> {
        let mut loader = BloockLoader {};
        let dataset = to_dataset_for_signing(&self.credential, None, &mut loader)
            .await
            .map_err(|e| IdentityError::ErrorDataset(e.to_string()))?;
        let dataset_normalized = normalize(dataset.quads().map(Into::into));

        let rdf_entries = entries_from_rdf(dataset_normalized)
            .map_err(|e| IdentityError::ErrorRdfEntry(e.to_string()))?;

        let merkle = Merkle::default()
            .await
            .map_err(|e| IdentityError::ErrorMerkleTree(e.to_string()))?;
        let root_merkle = add_entries_to_merkle_tree(&hash, merkle, rdf_entries)
            .await
            .unwrap();

        Ok(root_merkle)
    }

    pub fn to_json(&self) -> Result<String, IdentityError> {
        let vc = &self.credential;

        let res = serde_json::to_string(&vc)
            .map_err(|e| IdentityError::ErrorCredentialSerialize(e.to_string()))?;

        Ok(res)
    }

    pub fn get_credential(&self) -> Credential {
        self.credential.clone()
    }

    pub fn get_credentia_id(&self) -> Result<String, IdentityError> {
        Ok(self.credential_id.clone())
    }
}

#[cfg(test)]
mod tests {
    use chrono::NaiveDateTime;
    use serde_json::{json, Number, Value};
    use ssi::vc::Credential;

    use crate::vc::VC;

    use super::DEFAULT_EXPIRATION_DATE_FORMAT;

    fn create_credential() -> VC {
        let context_json_ld =
            "https://api.bloock.dev/hosting/v1/ipfs/QmZ9BzmMGzLv4y9P6djYUm8sgQt47ZjECGAM8nToFW2qvt"
                .to_string();
        let schema_cid = "QmTvHzXiegijCdhGC4kgjps8hSi3FP1K17ezrYPgdMU6Ek".to_string();
        let schema_type = "DrivingLicense".to_string();
        let issuer =
            "did:polygonid:polygon:mumbai:2qGUovMWDMyoXKLWiRMBRTyMfKcdrUg958QcCDkC9U".to_string();
        let holder =
            "did:polygonid:polygon:mumbai:2qGg7TzmcoU4Jg3E86wXp4WJcyGUTuafPZxVRxpYQr".to_string();
        let expiration_date =
            NaiveDateTime::parse_from_str("2028-06-15T07:07:39Z", DEFAULT_EXPIRATION_DATE_FORMAT)
                .unwrap();
        let expiration = expiration_date.timestamp();
        let issuance = NaiveDateTime::parse_from_str(
            "2023-07-24T10:29:25.18351605Z",
            "%Y-%m-%dT%H:%M:%S%.9fZ",
        )
        .unwrap();
        let attributes: Vec<(String, Value)> = vec![
            (
                "birth_date".to_string(),
                Value::Number(Number::from(921950325)),
            ),
            ("country".to_string(), Value::String("Spain".to_string())),
            ("name".to_string(), Value::String("Eduard".to_string())),
            (
                "type".to_string(),
                Value::String("DrivingLicense".to_string()),
            ),
            (
                "first_surname".to_string(),
                Value::String("Tomas".to_string()),
            ),
            ("license_type".to_string(), Value::Number(Number::from(1))),
            ("nif".to_string(), Value::String("54688188M".to_string())),
            (
                "second_surname".to_string(),
                Value::String("Escoruela".to_string()),
            ),
        ];
        let api_host = "https://api.bloock.dev".to_string();
        let credential_type = "urn:uuid:40762daa-16e5-4a6c-aa0e-b7730596f8b4".to_string();
        let version = 0;
        let nonce: u64 = 3825417065;
        let uuid = "5c9b42c2-13c6-4fcf-b76b-57e104ee8f9c".to_string();

        let vc = VC::new_internal(
            context_json_ld.clone(),
            schema_cid,
            schema_type,
            issuer,
            holder,
            expiration,
            attributes,
            credential_type,
            version,
            issuance,
            nonce,
            uuid,
            api_host,
        )
        .unwrap();

        vc
    }

    fn create_schema() -> String {
        let schema = json!({
            "$metadata": {
                "type": "DrivingLicense",
                "uris": {
                    "jsonLdContext": "https://api.bloock.dev/hosting/v1/ipfs/QmZ9BzmMGzLv4y9P6djYUm8sgQt47ZjECGAM8nToFW2qvt"
                },
                "version": "1.0"
            },
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "description": "driving license schema",
            "title": "Driving License",
            "properties": {
                "@context": {
                    "type": [
                        "string",
                        "array",
                        "object"
                    ]
                },
                "expirationDate": {
                    "format": "date-time",
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "issuanceDate": {
                    "format": "date-time",
                    "type": "string"
                },
                "issuer": {
                    "type": [
                        "string",
                        "object"
                    ],
                    "format": "uri",
                    "properties": {
                        "id": {
                            "format": "uri",
                            "type": "string"
                        }
                    },
                    "required": [
                        "id"
                    ]
                },
                "type": {
                    "type": [
                        "string",
                        "array"
                    ],
                    "items": {
                        "type": "string"
                    }
                },
                "credentialSubject": {
                    "description": "Stores the data of the credential",
                    "title": "Credential subject",
                    "properties": {
                        "license_type": {
                            "description": "license_type",
                            "title": "License Type",
                            "type": "integer"
                        },
                        "nif": {
                            "description": "nif",
                            "title": "NIF",
                            "type": "string"
                        },
                        "country": {
                            "description": "country",
                            "title": "Country",
                            "type": "string"
                        },
                        "birth_date": {
                            "description": "birth_date",
                            "title": "Birth Date",
                            "type": "integer"
                        },
                        "name": {
                            "description": "name",
                            "title": "Name",
                            "type": "string"
                        },
                        "second_surname": {
                            "description": "second_surname",
                            "title": "Second Surname",
                            "type": "string"
                        },
                        "first_surname": {
                            "description": "first_surname",
                            "title": "First Surname",
                            "type": "string"
                        },
                        "id": {
                            "description": "Stores the DID of the subject that owns the credential",
                            "title": "Credential subject ID",
                            "format": "uri",
                            "type": "string"
                        }
                    },
                    "required": [
                        "nif",
                        "country",
                        "birth_date",
                        "name",
                        "second_surname",
                        "first_surname"
                    ],
                    "type": "object"
                },
                "credentialSchema": {
                    "properties": {
                        "id": {
                            "format": "uri",
                            "type": "string"
                        },
                        "type": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "id",
                        "type"
                    ],
                    "type": "object"
                }
            },
            "required": [
                "@context",
                "id",
                "issuanceDate",
                "issuer",
                "type",
                "credentialSubject",
                "credentialSchema"
            ],
            "type": "object"
        });

        schema.to_string()
    }

    #[tokio::test]
    async fn test_e2e() {
        let vc = create_credential();
        let schema = create_schema();

        vc.validate_schema(schema).unwrap();

        let expected_claim_core_hex = "b9064d46baefd34de66fd370f0f3f0f92a00000000000000000000000000000002125caf312e33a0b0c82d57fdd240b7261d58901a346261c5ce5621136c0b00f79f40114c92814ee55fac46cdebf21d77ce80a5c9f439cd85a18461a888aa170000000000000000000000000000000000000000000000000000000000000000693b03e4000000003b5df36d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000".to_string();
        let expected_hash_index_value =
            "27c13d7cc2f2f738943ce0d1bf364ac656616ab241189974a33a564dca4d0f05".to_string();

        let core_claim = vc.get_core_claim().await.unwrap();
        let core_claim_hex = core_claim.hex().unwrap();

        let hash_index_value = core_claim.hi_hv_hash();

        assert_eq!(expected_hash_index_value, hash_index_value);
        assert_eq!(expected_claim_core_hex, core_claim_hex);
    }
}
