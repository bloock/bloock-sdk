use crate::types::network_configuration::NetworkConfiguration;
use crate::types::proof::Proof;
use crate::types::record::Record;
use crate::types::record::RecordList;
use bloock_core::client;
use bloock_core::config::entity::network::Network;
use bloock_core::record::entity::record::Record as BloockRecord;
use js_sys::Promise;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::errors::{serialization_error, Error};
use crate::JsResult;

#[wasm_bindgen]
pub struct WasmClient(client::BloockClient);

#[wasm_bindgen]
impl WasmClient {
    #[wasm_bindgen(constructor)]
    pub fn client_new(api_key: &str) -> Self {
        WasmClient(client::configure(api_key.to_string()))
    }

    #[wasm_bindgen(js_class = Client, js_name = setAPIHost)]
    pub fn client_set_api_host(&self, host: &str) -> JsResult<()> {
        self.0.set_api_host(host.to_string());
        Ok(())
    }

    #[wasm_bindgen(js_class = Client, js_name = setNetworkConfiguration)]
    pub fn client_set_network_configuration(
        &self,
        network: &str,
        configuration: NetworkConfiguration,
    ) -> JsResult<()> {
        self.0
            .set_network_configuration(Network::from(network.to_string()), configuration.into());
        Ok(())
    }

    #[wasm_bindgen(js_class = Client, js_name = sendRecords)]
    pub fn client_send_records(self, records: &JsValue) -> Promise {
        let payload: RecordList = records.into();
        future_to_promise(async move {
            self.0
                .send_records(payload.into())
                .await
                .map_err(Error::from)
                .map_err(Error::into)
                .and_then(|event| {
                    serde_wasm_bindgen::to_value(&event)
                        .map_err(|e| serialization_error(e.to_string()))
                })
        })
    }

    // #[wasm_bindgen(js_class = Client, js_name = getRecords)]
    // pub fn client_get_records(&self, records: &JsValue) -> JsResult<JsValue> {
    //     let payload: RecordList = records.into();
    //     self.0
    //         .get_records(&payload.into())
    //         .map_err(Error::from)
    //         .map_err(Error::into)
    //         .and_then(|event| {
    //             serde_wasm_bindgen::to_value(&event).map_err(|e| serialization_error(e.to_string()))
    //         })
    // }

    #[wasm_bindgen(js_class = Client, js_name = getAnchor)]
    pub async fn client_get_anchor(self, anchor: i64) -> Promise {
        future_to_promise(async move {
            self.0
                .get_anchor(anchor)
                .await
                .map_err(Error::from)
                .map_err(Error::into)
                .and_then(|event| {
                    serde_wasm_bindgen::to_value(&event)
                        .map_err(|e| serialization_error(e.to_string()))
                })
        })
    }

    #[wasm_bindgen(js_class = Client, js_name = waitAnchor)]
    pub async fn client_wait_anchor(self, anchor: i64, timeout: i64) -> Promise {
        future_to_promise(async move {
            self.0
                .wait_anchor(anchor, timeout)
                .await
                .map_err(Error::from)
                .map_err(Error::into)
                .and_then(|event| {
                    serde_wasm_bindgen::to_value(&event)
                        .map_err(|e| serialization_error(e.to_string()))
                })
        })
    }

    // #[wasm_bindgen(js_class = Client, js_name = getProof)]
    // pub fn client_get_proof(&self, records: &JsValue) -> JsResult<JsValue> {
    //     let payload: RecordList = records.into();
    //     self.0
    //         .get_proof(&payload.into())
    //         .map_err(Error::from)
    //         .map_err(Error::into)
    //         .and_then(|event| {
    //             serde_wasm_bindgen::to_value(&event).map_err(|e| serialization_error(e.to_string()))
    //         })
    // }

    // #[wasm_bindgen(js_class = Client, js_name = verifyRoot)]
    // pub fn client_verify_root(&self, root: Record, network: &str) -> JsResult<JsValue> {
    //     let root_record: BloockRecord = root.into();
    //     self.0
    //         .verify_root(&root_record, network)
    //         .map_err(Error::from)
    //         .map_err(Error::into)
    //         .and_then(|event| {
    //             serde_wasm_bindgen::to_value(&event).map_err(|e| serialization_error(e.to_string()))
    //         })
    // }

    // #[wasm_bindgen(js_class = Client, js_name = verifyProof)]
    // pub fn client_verify_proof(&self, proof: Proof) -> JsResult<JsValue> {
    //     self.0
    //         .verify_proof(proof.into())
    //         .map_err(Error::from)
    //         .map_err(Error::into)
    //         .and_then(|event| {
    //             serde_wasm_bindgen::to_value(&event).map_err(|e| serialization_error(e.to_string()))
    //         })
    // }
    // #[wasm_bindgen(js_class = Client, js_name = verifyRecords)]
    // pub fn client_verify_records(&self, records: &JsValue) -> JsResult<JsValue> {
    //     let payload: RecordList = records.into();
    //     self.0
    //         .verify_records(&payload.into())
    //         .map_err(Error::from)
    //         .map_err(Error::into)
    //         .and_then(|event| {
    //             serde_wasm_bindgen::to_value(&event).map_err(|e| serialization_error(e.to_string()))
    //         })
    // }

    // #[wasm_bindgen(js_class = Client, js_name = verifySignatures)]
    // pub fn client_verify_signatures(&self, records: &JsValue) -> JsResult<JsValue> {
    //     let payload: RecordList = records.into();
    //     self.0
    //         .verify_signatures(&payload.into())
    //         .map_err(Error::from)
    //         .map_err(Error::into)
    //         .and_then(|event| {
    //             serde_wasm_bindgen::to_value(&event).map_err(|e| serialization_error(e.to_string()))
    //         })
    // }
}
