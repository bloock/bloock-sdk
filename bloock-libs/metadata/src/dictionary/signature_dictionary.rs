use super::{error::Error, utils};
use chrono::Utc;
use lopdf::Dictionary;

const BYTE_RANGE_PLACEHOLDER: &str = "/ByteRange[0 10000 20000 100]";
const CONTENT_PLACEHOLDER: [u8; 3000] = [0u8; 3000];

#[derive(Debug, Clone)]
pub struct SignatureDictionary {
    pub r#type: Option<String>,
    pub filter: String,
    pub sub_filter: Option<String>,
    pub contents: Vec<u8>,
    pub byte_range: Vec<i64>,
    pub name: Option<String>,
    pub m: Option<String>,
}

impl Default for SignatureDictionary {
    fn default() -> Self {
        let now = Utc::now();

        Self {
            r#type: Some("Sig".to_string()),
            filter: "Adobe.PPKLite".to_string(),
            sub_filter: Some("ETSI.CAdES.detached".to_string()),
            byte_range: vec![0, 10000, 20000, 100],
            contents: CONTENT_PLACEHOLDER.to_vec(),
            m: Some(now.format("D:%Y%m%d%H%M%S+00'00'").to_string()),
            name: Some("Bloock".to_string()),
        }
    }
}

impl SignatureDictionary {
    pub fn compute_byte_range(&mut self, content: Vec<u8>) -> Result<(), Error> {
        let byte_range_pos = content
            .windows(BYTE_RANGE_PLACEHOLDER.len())
            .rposition(|window| window == BYTE_RANGE_PLACEHOLDER.as_bytes())
            .ok_or(Error::Other("Malformed PDF".into()))?;
        let byte_range_end = byte_range_pos + BYTE_RANGE_PLACEHOLDER.len();

        let contents_tag_pos = content[byte_range_end..]
            .windows(9)
            .position(|window| window == b"/Contents")
            .ok_or(Error::Other("Malformed PDF".into()))?
            + byte_range_end;
        let placeholder_pos = content[contents_tag_pos..]
            .windows(1)
            .position(|window| window == b"<")
            .ok_or(Error::Other("Malformed PDF".into()))?
            + contents_tag_pos;
        let placeholder_end = content[placeholder_pos..]
            .windows(1)
            .position(|window| window == b">")
            .ok_or(Error::Other("Malformed PDF".into()))?
            + placeholder_pos;
        let placeholder_length_with_brackets = (placeholder_end + 1) - placeholder_pos;

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
        byte_range[1] += diff;
        byte_range[2] += diff;

        self.byte_range = byte_range.to_vec();
        Ok(())
    }

    pub fn compute_content(&mut self, signature: Vec<u8>) -> Result<(), Error> {
        if signature.len() > CONTENT_PLACEHOLDER.len() {
            panic!(
                "Length of content is to long. Available: {}, Needed: {}",
                CONTENT_PLACEHOLDER.len(),
                signature.len()
            );
        }

        for (pos, e) in signature.iter().enumerate() {
            self.contents[pos] = e.to_owned();
        }

        Ok(())
    }

    pub fn get_signed_content(&self, payload: &[u8]) -> Result<Vec<u8>, Error> {
        let first_range =
            self.byte_range[0] as usize..=(self.byte_range[0] + self.byte_range[1] - 1) as usize;
        let first_part = &payload[first_range];

        let second_range =
            self.byte_range[2] as usize..=(self.byte_range[2] + self.byte_range[3] - 1) as usize;
        let second_part = &payload[second_range];

        let capacity: usize = (self.byte_range[1] + self.byte_range[3])
            .try_into()
            .map_err(|_| Error::Other("could not reserve capacity for byte range".into()))?;
        let mut signed_data = Vec::with_capacity(capacity);
        signed_data.extend_from_slice(first_part);
        signed_data.extend_from_slice(second_part);

        Ok(signed_data)
    }
}

impl TryInto<Dictionary> for SignatureDictionary {
    type Error = Error;

    fn try_into(self) -> Result<Dictionary, Self::Error> {
        use lopdf::{Object::*, StringFormat};

        let mut dict = lopdf::Dictionary::from_iter(vec![
            ("Filter", Name(self.filter.as_bytes().to_vec())),
            (
                "ByteRange",
                Array(self.byte_range.iter().map(|b| Integer(*b)).collect()),
            ),
            ("Contents", String(self.contents, StringFormat::Hexadecimal)),
        ]);

        if let Some(t) = self.r#type {
            dict.set("Type", Name(t.as_bytes().to_vec()));
        }

        if let Some(sf) = self.sub_filter {
            dict.set("SubFilter", Name(sf.as_bytes().to_vec()));
        }

        if let Some(m) = self.m {
            dict.set("M", String(m.as_bytes().to_vec(), StringFormat::Literal));
        }

        if let Some(name) = self.name {
            dict.set(
                "Name",
                String(name.as_bytes().to_vec(), StringFormat::Literal),
            );
        }

        Ok(dict)
    }
}

impl TryFrom<&Dictionary> for SignatureDictionary {
    type Error = Error;

    fn try_from(value: &Dictionary) -> Result<Self, Self::Error> {
        Ok(Self {
            r#type: utils::as_option_name(value.get(b"Type").ok())?,
            filter: utils::as_name(value.get(b"Filter").ok())?,
            sub_filter: utils::as_option_name(value.get(b"SubFilter").ok())?,
            contents: utils::as_byte_string(value.get(b"Contents").ok())?,
            byte_range: utils::as_byte_range(value.get(b"ByteRange").ok())?,
            name: utils::as_option_text_string(value.get(b"Name").ok())?,
            m: utils::as_option_text_string(value.get(b"M").ok())?,
        })
    }
}
