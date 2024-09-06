use std::collections::HashMap;

use lopdf::{Dictionary, Object, ObjectId};

use super::{error::Error, utils};

#[derive(Debug)]
pub struct AcroForm {
    pub sig_flags: i64,
    pub fields: Vec<ObjectId>,
    pub additional: HashMap<Vec<u8>, Object>,
}

impl Default for AcroForm {
    fn default() -> Self {
        Self {
            sig_flags: 3,
            fields: vec![],
            additional: HashMap::new(),
        }
    }
}

impl TryInto<Dictionary> for AcroForm {
    type Error = Error;

    fn try_into(self) -> Result<Dictionary, Self::Error> {
        let mut dict = lopdf::Dictionary::from_iter(vec![
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

        for (key, value) in self.additional {
            dict.set(key, value);
        }

        Ok(dict)
    }
}

impl TryFrom<&Dictionary> for AcroForm {
    type Error = Error;

    fn try_from(value: &Dictionary) -> Result<Self, Self::Error> {
        let mut additional = HashMap::new();
        
        let sig_flags = match value.get(b"SigFlags") {
            Ok(s) => utils::as_integer(Some(s))?,
            Err(_) => 3,
        };
        let fields = match value.get(b"Fields") {
            Ok(s) => utils::as_object_id_array(Some(s))?,
            Err(_) => vec![],
        };

        for (key, obj) in value.iter() {
            if key.as_slice() == b"SigFlags" || key.as_slice() == b"Fields" {
                continue;
            }
            
            additional.insert(key.to_vec(), obj.clone());
        }

        Ok(Self {
            sig_flags,
            fields,
            additional,
        })
    }
}
