use lopdf::{Dictionary, Object, ObjectId};

use super::{error::Error, utils};

pub struct AcroForm {
    pub sig_flags: i64,
    pub fields: Vec<ObjectId>,
}

impl Default for AcroForm {
    fn default() -> Self {
        Self {
            sig_flags: 3,
            fields: vec![],
        }
    }
}

impl TryInto<Dictionary> for AcroForm {
    type Error = Error;

    fn try_into(self) -> Result<Dictionary, Self::Error> {
        let dict = lopdf::Dictionary::from_iter(vec![
            ("SigFlags", Object::Integer(self.sig_flags)),
            (
                "Fields",
                Object::Array(
                    self.fields
                        .iter()
                        .map(|f| Object::Reference(f.to_owned()))
                        .collect(),
                ),
            ),
        ]);

        Ok(dict)
    }
}

impl TryFrom<&Dictionary> for AcroForm {
    type Error = Error;

    fn try_from(value: &Dictionary) -> Result<Self, Self::Error> {
        Ok(Self {
            sig_flags: utils::as_integer(value.get(b"SigFlags").ok())?,
            fields: utils::as_object_id_array(value.get(b"Fields").ok())?,
        })
    }
}
