use super::Headers;

#[derive(PartialEq)]
pub enum PayloadType {
    String,
    Hex,
    Json,
    Bytes,
    File(Option<String>),
}

impl PayloadType {
    pub fn to_header(&self) -> Headers {
        match self {
            PayloadType::String => Headers {
                ty: "string".to_string(),
            },
            PayloadType::Hex => Headers {
                ty: "hex".to_string(),
            },
            PayloadType::Json => Headers {
                ty: "json".to_string(),
            },
            PayloadType::Bytes => Headers {
                ty: "bytes".to_string(),
            },
            PayloadType::File(t) => match t {
                Some(mime_type) => Headers {
                    ty: mime_type.clone(),
                },
                None => Headers {
                    ty: "unknown_file".to_string(),
                },
            },
        }
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_string() {
        let payload_type = PayloadType::String;

        let expected_header = Headers {
            ty: "string".to_string(),
        };

        assert_eq!(
            expected_header,
            payload_type.to_header(),
            "Received unexpected headers from payload type"
        )
    }

    #[test]
    fn test_file_with_mime_type() {
        let payload_type = PayloadType::File(Some("application/json".to_string()));

        let expected_header = Headers {
            ty: "application/json".to_string(),
        };

        assert_eq!(
            expected_header,
            payload_type.to_header(),
            "Received unexpected headers from payload type"
        )
    }

    #[test]
    fn test_file_without_mime_type() {
        let payload_type = PayloadType::File(None);

        let expected_header = Headers {
            ty: "unknown_file".to_string(),
        };

        assert_eq!(
            expected_header,
            payload_type.to_header(),
            "Received unexpected headers from payload type"
        )
    }
}
