use super::error::Error;
use lopdf::{Dictionary, Document, Object, ObjectId};

pub(crate) fn get_root(doc: &Document) -> Result<&Dictionary, Error> {
    let root_obj_id = doc.trailer.get(b"Root")?.as_reference()?;

    let root = doc.get_object(root_obj_id)?.as_dict()?;

    Ok(root)
}

pub(crate) fn get_root_mut(doc: &mut Document) -> Result<&mut Dictionary, Error> {
    let root_obj_id = doc.trailer.get(b"Root")?.as_reference()?;
    let root = doc.get_object_mut(root_obj_id)?.as_dict_mut()?;

    Ok(root)
}

pub(crate) fn _get_object_id(object: &Object) -> Option<ObjectId> {
    match *object {
        Object::Reference(ref id) => Some(*id),
        _ => None,
    }
}

pub(crate) fn as_integer(obj: Option<&Object>) -> Result<i64, Error> {
    obj.map(|obj| obj.as_i64())
        .transpose()?
        .map(|s| s.to_owned())
        .ok_or(Error::LoPdf(lopdf::Error::DictKey))
}

pub(crate) fn as_option_name(obj: Option<&Object>) -> Result<Option<String>, Error> {
    Ok(obj
        .map(|obj| obj.as_name_str())
        .transpose()?
        .map(|s| s.to_owned()))
}

pub(crate) fn as_name(obj: Option<&Object>) -> Result<String, Error> {
    as_option_name(obj)?.ok_or(Error::LoPdf(lopdf::Error::DictKey))
}

pub(crate) fn as_option_byte_string(obj: Option<&Object>) -> Result<Option<Vec<u8>>, Error> {
    Ok(obj
        .map(|obj| obj.as_str())
        .transpose()?
        .map(|s| s.to_owned()))
}

pub(crate) fn as_byte_string(obj: Option<&Object>) -> Result<Vec<u8>, Error> {
    as_option_byte_string(obj)?.ok_or(Error::LoPdf(lopdf::Error::DictKey))
}

pub(crate) fn as_text_string(obj: Option<&Object>) -> Result<String, Error> {
    let byte_string = as_byte_string(obj)?;

    let text_string = String::from_utf8(byte_string).map_err(lopdf::Error::from)?;
    Ok(text_string)
}

pub(crate) fn as_option_text_string(obj: Option<&Object>) -> Result<Option<String>, Error> {
    let byte_string = as_option_byte_string(obj)?;
    let text_string = byte_string
        .map(String::from_utf8)
        .transpose()
        .map_err(lopdf::Error::from)?;
    Ok(text_string)
}

pub(crate) fn as_byte_range(obj: Option<&Object>) -> Result<Vec<i64>, Error> {
    let mut result = Vec::new();
    let obj = obj.ok_or(Error::LoPdf(lopdf::Error::DictKey))?;
    let list = obj.as_array()?;
    // Temporary store the value of prev loop so we can create pairs.
    for item in list {
        result.push(item.as_i64()?);
    }
    Ok(result)
}

pub(crate) fn as_option_object_id(obj: Option<&Object>) -> Result<Option<ObjectId>, Error> {
    Ok(obj
        .map(|obj| obj.as_reference())
        .transpose()?
        .map(|s| s.to_owned()))
}

pub(crate) fn as_option_integer_array(obj: Option<&Object>) -> Result<Option<Vec<i64>>, Error> {
    let mut result = Vec::new();
    let obj = match obj {
        Some(o) => o,
        None => return Ok(None),
    };
    let list = obj.as_array()?;

    for item in list {
        result.push(item.as_i64()?);
    }
    Ok(Some(result))
}

pub(crate) fn as_object_id_array(obj: Option<&Object>) -> Result<Vec<ObjectId>, Error> {
    let mut result = Vec::new();
    let list = obj.ok_or(Error::LoPdf(lopdf::Error::DictKey))?.as_array()?;

    for item in list {
        result.push(item.as_reference()?);
    }
    Ok(result)
}
