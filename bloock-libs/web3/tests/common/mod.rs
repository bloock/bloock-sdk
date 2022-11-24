use bloock_web3::blockchain::Blockchain;

pub async fn get_state() {
    let state = "009b54cfa8b1aaf914dd8d0399256e4bea76d08c3291cb96f66c3a65a9c15a26";
    let contract_address = "522b2040CdfD247ED60921623044dF1c929524B7";
    let provider = "https://ethereum.bloock.dev";

    let web3 = Blockchain {};
    let timestamp = web3
        .validate_state(
            provider.to_string(),
            contract_address.to_string(),
            state.to_string(),
            "test_k8S3N2jEqwPC4ear2iAfIKmtukSi5uAFbYjL1qcxIjnGuFR9D8qv4viyy6CMb5MB".to_string(),
        )
        .await
        .unwrap();

    assert_eq!(
        timestamp, 1664086163,
        "Timestamp doesn't match the expected"
    );
}
