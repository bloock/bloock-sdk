pub mod items {
    include!(concat!(env!("OUT_DIR"), "/bloock.rs"));
}
mod entity_mappings;
mod error;
mod server;

#[diplomat::bridge]
pub mod ffi {
    use crate::error::BridgeError;
    use crate::server;
    use diplomat_runtime::DiplomatResult;
    use diplomat_runtime::DiplomatWriteable;

    use std::fmt::Write;

    pub struct BloockBridge {
        _phantom: usize,
    }
    impl BloockBridge {
        pub fn request(
            request_type: &str,
            payload: &str,
            response: &mut DiplomatWriteable,
        ) -> DiplomatResult<(), ()> {
            match tokio::runtime::Runtime::new()
                .unwrap()
                .block_on(BloockBridge::do_request(request_type, payload, response))
            {
                Ok(r) => Ok(r).into(),
                Err(e) => {
                    println!("{}", e);
                    Err(()).into()
                }
            }
        }

        async fn do_request(
            request_type: &str,
            payload: &str,
            response: &mut DiplomatWriteable,
        ) -> Result<(), BridgeError> {
            let payload = payload.as_bytes();
            let result = server::Server::new()
                .dispatch(request_type, payload)
                .await?;

            let result_vec = result.get_bytes()?;
            let result_str = String::from_utf8(result_vec)
                .map_err(|e| BridgeError::ResponseSerialization(e.to_string()))?;
            write!(response, "{}", result_str);
            response.flush();
            Ok(()).into()
        }
    }
}
