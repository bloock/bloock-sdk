use serde::{Deserialize, Serialize};

use crate::identity::IdentityError;

use super::dto::get_offer_response::GetOfferResponse;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CredentialOffer {
    pub thid: String,
    pub body: CredentialOfferBody,
    pub from: String,
    pub to: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CredentialOfferBody {
    pub url: String,
    pub credentials: Vec<CredentialOfferBodyCredential>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CredentialOfferBodyCredential {
    pub id: String,
    pub description: String,
}

impl TryFrom<GetOfferResponse> for CredentialOffer {
    type Error = IdentityError;

    fn try_from(value: GetOfferResponse) -> Result<Self, Self::Error> {
        Ok(CredentialOffer {
            thid: value.thid,
            body: CredentialOfferBody {
                url: value.body.url,
                credentials: value
                    .body
                    .credentials
                    .into_iter()
                    .map(|c| CredentialOfferBodyCredential {
                        id: c.id,
                        description: c.description,
                    })
                    .collect(),
            },
            from: value.from,
            to: value.to,
        })
    }
}

#[cfg(test)]
mod tests {
    use serde_json::Value;

    use crate::identity::entity::credential_offer::CredentialOffer;

    #[tokio::test]
    async fn test_serialization() {
        let json = "{\"thid\":\"aff91293-faec-4ffb-b0a0-c9be5e17fcaf\",\"body\":{\"url\":\"https//api.bloock.com/identity/v1/claims/792f62fb-7b26-4dd6-a440-f0e6f4ad402a/redeem\",\"credentials\":[{\"id\":\"792f62fb-7b26-4dd6-a440-f0e6f4ad402a\",\"description\":\"TestSchema\"}]},\"from\":\"did:iden3:eth:main:zxHh4f4NFe6a6D1NhUNEUrMw1nb36YNMHgiboNNz7\",\"to\":\"did:iden3:eth:main:zxJDvyiWDaLXiFEUBCKbPBQBxznbb2LgqwG9vXTp2\"}";

        let value: Value = serde_json::from_str(&json).unwrap();

        let offer: CredentialOffer = serde_json::from_value(value.clone()).unwrap();

        let offer_json = serde_json::to_value(&offer).unwrap();

        assert_eq!(offer_json, value);
    }
}
