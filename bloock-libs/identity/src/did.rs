use crate::{IdentityError, Result};
use bloock_hasher::{keccak::Keccak256, Hasher};
use libsecp256k1::{curve::Affine, PublicKey};

pub struct Did {
    key: String,
}

impl Did {
    pub fn from_public_key(public_key: String) -> Result<Did> {
        let typ = Self::get_did_type();
        let genesis = Self::get_genesis(public_key)?;
        let checksum = Self::get_checksum(typ, genesis);

        let mut payload = vec![];
        payload.extend(typ);
        payload.extend(genesis);
        payload.extend(checksum);

        Ok(Did {
            key: bs58::encode(payload).into_string(),
        })
    }

    fn get_did_type() -> [u8; 2] {
        let fb: u8 = 0b00000001; // iden3
        let sb: u8 = 0b00100000 | 0b00000001; // eth:main
        [fb, sb]
    }

    fn get_genesis(public_key: String) -> Result<[u8; 27]> {
        let decoded_public_key =
            hex::decode(public_key).map_err(|_| IdentityError::InvalidPublicKey())?;
        let key = PublicKey::parse_slice(decoded_public_key.as_slice(), None)
            .map_err(|_| IdentityError::InvalidPublicKey())?;

        let affine: Affine = key.into();
        let x = affine.x.b32().to_vec();
        let y = affine.y.b32().to_vec();

        let mut payload = vec![];
        payload.extend(x);
        payload.extend(y);

        let hash = Keccak256::generate_hash(&payload);
        let genesis = hash[hash.len() - 27..].try_into().unwrap();
        Ok(genesis)
    }

    fn get_checksum(typ: [u8; 2], genesis: [u8; 27]) -> [u8; 2] {
        let mut to_checksum = vec![];
        to_checksum.extend(typ);
        to_checksum.extend(genesis);

        let mut s: u16 = 0;
        for i in 0..to_checksum.len() {
            s = s + to_checksum[i] as u16;
        }
        s.to_le_bytes()
    }
}

impl ToString for Did {
    fn to_string(&self) -> String {
        format!("did:iden3:eth:main:{}", self.key)
    }
}

#[cfg(test)]
mod tests {
    use crate::did::Did;

    #[test]
    fn test_create_did() {
        let public_key =
            "020703f82185e6be40f7086ac676b1114647d63d6ea906ec8cad3c427a1aac5c2a".to_string();
        let did = Did::from_public_key(public_key).unwrap();
        assert_eq!(
            did.to_string(),
            "did:iden3:eth:main:213TATBRDPjfy747UnLYPXNTdQs3Nm9er5pDDzi1mW".to_string()
        );
    }
}
