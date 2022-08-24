use bloock_web3::blockchain::Blockchain;

pub async fn get_state() {
    let state = "fd6d38f2dbbf3e875af204b5e0a337906e5a00e36ade46a2de8b18ad0f05247c";
    let contract_address = "7E22c795325E76306920293F62a02F353536280b";
    let provider = "https://rinkeby.infura.io/v3/40e23a35d578492daacb318023772b52";

    let web3 = Blockchain {};
    let timestamp = web3
        .validate_state(
            provider.to_string(),
            contract_address.to_string(),
            state.to_string(),
        )
        .await
        .unwrap();

    assert_eq!(
        timestamp, 1655801554,
        "Timestamp doesn't match the expected"
    );
}
