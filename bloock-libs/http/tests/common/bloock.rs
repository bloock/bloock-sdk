use bloock_http::BloockHttpClient;

pub async fn bloock_http_client_get_api_key() {
    let client = BloockHttpClient::new(String::from("my_api_key"), None);

    assert_eq!(
        client.get_api_key(),
        "my_api_key",
        "Returning Err instead of Ok."
    );

    assert_eq!(
        client.get_enviornment(),
        None,
        "Returning Err instead of Ok."
    );
}

pub async fn bloock_http_client_get_environment() {
    let client = BloockHttpClient::new(String::from("my_api_key"), Some(String::from("env")));

    assert_eq!(
        client.get_enviornment(),
        Some("env".to_string()),
        "Returning Err instead of Ok."
    );
}
