use bloock_http::BloockHttpClient;

pub async fn bloock_http_client_get_api_key() {
    let client = BloockHttpClient::new(String::from("my_api_key"), None);

    assert_eq!(
        client.get_api_key(),
        "my_api_key",
        "Returning Err instead of Ok."
    );
}
