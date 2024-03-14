use bloock_web3::blockchain::Blockchain;

pub async fn get_state() {
    let state = "009b54cfa8b1aaf914dd8d0399256e4bea76d08c3291cb96f66c3a65a9c15a26";
    let contract_address = "522b2040CdfD247ED60921623044dF1c929524B7";
    let provider = "https://ethereum.bloock.com";

    let web3 = Blockchain {};
    let timestamp = web3
        .validate_state(
            provider.to_string(),
            contract_address.to_string(),
            state.to_string(),
            option_env!("API_KEY").unwrap().to_string(),
        )
        .await
        .unwrap();

    assert_eq!(
        timestamp, 1664086163,
        "Timestamp doesn't match the expected"
    );
}

pub async fn reverse_ens() {
    let address = "d8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
    let provider = "https://ethereum.bloock.com";

    let web3 = Blockchain {};
    let domain = web3
        .reverse_ens(
            provider.to_string(),
            address.to_string(),
            option_env!("API_KEY").unwrap().to_string(),
        )
        .await
        .unwrap();

    assert_eq!(domain, "vitalik.eth", "Domain doesn't match the expected");
}
