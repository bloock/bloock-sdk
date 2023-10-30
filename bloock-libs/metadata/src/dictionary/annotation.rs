use lopdf::{Dictionary, Object, ObjectId};

use super::{error::Error, utils};

pub struct APDictionary {
    pub n: ObjectId,
}

pub struct PdfAnnotationWidget {
    pub r#type: String,
    pub sub_type: String,
    pub ft: String,
    pub rect: Option<Vec<i64>>,
    pub t: String,
    pub f: i64,
    pub p: Option<ObjectId>,
    pub ap: Option<APDictionary>,
    pub v: Option<ObjectId>,
}

impl Default for PdfAnnotationWidget {
    fn default() -> Self {
        Self {
            r#type: "Annot".to_string(),
            sub_type: "Widget".to_string(),
            ft: "Sig".to_string(),
            rect: None,
            t: "Signature".to_string(),
            f: 4,
            v: None,
            p: None,
            ap: None,
        }
    }
}

impl TryInto<Dictionary> for PdfAnnotationWidget {
    type Error = Error;

    fn try_into(self) -> Result<Dictionary, Self::Error> {
        let mut dict = lopdf::Dictionary::from_iter(vec![
            ("Type", Object::Name(self.r#type.into_bytes())),
            ("Subtype", Object::Name(self.sub_type.into_bytes())),
            ("FT", Object::Name(self.ft.into_bytes())),
            (
                "T",
                Object::String(self.t.into_bytes(), lopdf::StringFormat::Literal),
            ),
            ("F", Object::Integer(self.f)),
        ]);

        if let Some(v) = self.v {
            dict.set("V", Object::Reference(v))
        }

        if let Some(rect) = self.rect {
            dict.set(
                "Rect",
                Object::Array(rect.iter().map(|r| Object::Integer(*r)).collect()),
            )
        }

        if let Some(p) = self.p {
            dict.set("P", Object::Reference(p))
        }

        if let Some(ap) = self.ap {
            dict.set(
                "AP",
                Object::Dictionary(lopdf::Dictionary::from_iter(vec![(
                    "N",
                    Object::Reference(ap.n),
                )])),
            )
        }

        Ok(dict)
    }
}

impl TryFrom<&Dictionary> for PdfAnnotationWidget {
    type Error = Error;

    fn try_from(value: &Dictionary) -> Result<Self, Self::Error> {
        Ok(Self {
            r#type: utils::as_name(value.get(b"Type").ok())?,
            sub_type: utils::as_name(value.get(b"Subtype").ok())?,
            ft: utils::as_name(value.get(b"FT").ok())?,
            rect: utils::as_option_integer_array(value.get(b"Rect").ok())?,
            t: utils::as_text_string(value.get(b"T").ok())?,
            f: utils::as_integer(value.get(b"F").ok())?,
            p: utils::as_option_object_id(value.get(b"P").ok())?,
            ap: None,
            v: utils::as_option_object_id(value.get(b"V").ok())?,
        })
    }
}
