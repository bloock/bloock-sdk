use crate::identity::IdentityError;

pub enum DidMethod {
    PolygonID,
    PolygonIDTest,
}

impl DidMethod {
    pub fn new(method: &str) -> Result<DidMethod, IdentityError> {
        match method {
            "polygon_id" => Ok(DidMethod::PolygonID),
            "polygon_id_test" => Ok(DidMethod::PolygonIDTest),
            _ => Err(IdentityError::InvalidDidMethod()),
        }
    }

    pub fn get_did_method(&self) -> String {
        match self {
            DidMethod::PolygonID => "polygon_id".to_string(),
            DidMethod::PolygonIDTest => "polygon_id_test".to_string(),
        }
    }
}
