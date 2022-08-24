use std::collections::HashMap;

use bloock_http::{Client, HttpClient};

pub async fn http_client_get_api_key() {
    let client = HttpClient::new(String::from("my_api_key"));

    assert_eq!(
        client.get_api_key(),
        "my_api_key",
        "Returning Err instead of Ok."
    );
}

pub async fn http_client_get() {
    let client = HttpClient::new(String::from("my-api-key"));
    let res: serde_json::Value = client.get("https://httpbin.org/get", None).await.unwrap();

    assert_eq!(
        res.get("headers")
            .unwrap()
            .get("X-Api-Key")
            .unwrap()
            .as_str()
            .unwrap(),
        "my-api-key",
        "HTTP Get not returning valid auth header."
    );
}

pub async fn http_client_post() {
    let client = HttpClient::new(String::from("my-api-key"));

    let mut body: HashMap<String, String> = HashMap::new();
    body.insert(String::from("hello"), String::from("world"));
    let res: serde_json::Value = client
        .post("https://httpbin.org/post", body, None)
        .await
        .unwrap();

    assert_eq!(
        res.get("headers")
            .unwrap()
            .get("X-Api-Key")
            .unwrap()
            .as_str()
            .unwrap(),
        "my-api-key",
        "HTTP Get not returning valid auth header."
    );

    assert_eq!(
        res.get("json")
            .unwrap()
            .get("hello")
            .unwrap()
            .as_str()
            .unwrap(),
        "world",
        "HTTP Post not returning valid body."
    );
}
