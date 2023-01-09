use std::time::Duration;

use hmac::{Hmac, Mac};
use sha2::Sha256;

use crate::{error::BloockResult, shared::util};

use super::WebhookError;

#[derive(Debug)]
struct Header {
    timestamp: u128,
    signature: Vec<u8>,
}

pub fn verify_signature(
    payload: &[u8],
    header: &str,
    secret_key: &str,
    enforce_tolerance: bool,
) -> BloockResult<bool> {
    let header = parse_header(header)?;

    let current_timestamp = util::get_current_timestamp();
    let time_diff = current_timestamp - header.timestamp;

    if enforce_tolerance && time_diff > 600000 /* 10 min */ {
        return Err(WebhookError::TooOld().into());
    }

    let mut mac = Hmac::<Sha256>::new_from_slice(secret_key.as_bytes()).unwrap();
    mac.update(format!("{}", header.timestamp).as_bytes());
    mac.update(b".");
    mac.update(payload);

    Ok(mac.verify_slice(&header.signature[..]).is_ok())
}

fn parse_header(header: &str) -> BloockResult<Header> {
    let (timestamp, signature) = header
        .split_once(',')
        .ok_or(WebhookError::InvalidSignatureHeader())?;

    let timestamp = timestamp
        .split('=')
        .collect::<Vec<&str>>()
        .get(1)
        .ok_or(WebhookError::InvalidSignatureHeader())?
        .parse::<u64>()
        .map_err(|_| WebhookError::InvalidSignatureHeader())?;

    let timestamp = Duration::from_secs(timestamp).as_millis();

    let signature = hex::decode(
        signature
            .split('=')
            .collect::<Vec<&str>>()
            .get(1)
            .ok_or(WebhookError::InvalidSignatureHeader())?,
    )
    .unwrap();

    Ok(Header {
        timestamp,
        signature,
    })
}

#[test]
fn verify_signature_ok() {
    let payload = r#"{"webhook_id":"80b505b4-df81-48f4-92a6-69cbc1a114a0","request_id":"8d30ef45-69a3-4cdd-8457-8cad485848f2","type":"core.bloock_chain","created_at":1672909660,"data":{"created_at":1672909591,"finalized":true,"id":105122,"message_count":1,"network":{"anchor_id":105122,"created_at":1672909661,"name":"bloock_chain","status":"Confirmed","test":false,"tx_hash":"0x53d1c7c1ff8100b921ce0ef593c81ed4e5e50eff888b3bb5c69260c13f0b2f58"},"root":"fd71e7ac128ff2219853e43e4044769df36c5329ce34655b4c5d166d1564d5b7","test":false}}"#
    .as_bytes();

    let header = "t=1672909660,v1=955e726c98d606ff5534d325f68854173411be61698ef7c5c466a5485f979a29";
    let secret = "NHJTAE6ikKBccSaeCSBSWGdp7NmixXy7";

    assert!(verify_signature(payload, header, secret, false).unwrap());
}

#[test]
fn verify_signature_invalid_secret() {
    let payload = r#"{"webhook_id":"80b505b4-df81-48f4-92a6-69cbc1a114a0","request_id":"8d30ef45-69a3-4cdd-8457-8cad485848f2","type":"core.bloock_chain","created_at":1672909660,"data":{"created_at":1672909591,"finalized":true,"id":105122,"message_count":1,"network":{"anchor_id":105122,"created_at":1672909661,"name":"bloock_chain","status":"Confirmed","test":false,"tx_hash":"0x53d1c7c1ff8100b921ce0ef593c81ed4e5e50eff888b3bb5c69260c13f0b2f58"},"root":"fd71e7ac128ff2219853e43e4044769df36c5329ce34655b4c5d166d1564d5b7","test":false}}"#
    .as_bytes();

    let header = "t=1672909660,v1=955e726c98d606ff5534d325f68854173411be61698ef7c5c466a5485f979a29";
    let secret = "asdf";

    assert!(!verify_signature(payload, header, secret, false).unwrap());
}

#[test]
fn verify_signature_invalid_header() {
    let payload = r#"{"webhook_id":"80b505b4-df81-48f4-92a6-69cbc1a114a0","request_id":"8d30ef45-69a3-4cdd-8457-8cad485848f2","type":"core.bloock_chain","created_at":1672909660,"data":{"created_at":1672909591,"finalized":true,"id":105122,"message_count":1,"network":{"anchor_id":105122,"created_at":1672909661,"name":"bloock_chain","status":"Confirmed","test":false,"tx_hash":"0x53d1c7c1ff8100b921ce0ef593c81ed4e5e50eff888b3bb5c69260c13f0b2f58"},"root":"fd71e7ac128ff2219853e43e4044769df36c5329ce34655b4c5d166d1564d5b7","test":false}}"#
    .as_bytes();

    let header = "t=1672909660";
    let secret = "asdf";

    assert!(verify_signature(payload, header, secret, false).is_err());
}
