use std::collections::HashMap;

use bloock_http::{Client, SimpleHttpClient};

pub async fn simple_http_client_get() {
    let client = SimpleHttpClient::new();
    let res: serde_json::Value = client.get("https://httpbin.org/get", None).await.unwrap();
    assert!(!res.is_null());
}

pub async fn simple_http_client_post() {
    let client = SimpleHttpClient::new();

    let mut body: HashMap<String, String> = HashMap::new();
    body.insert(String::from("hello"), String::from("world"));
    let res: serde_json::Value = client
        .post("https://httpbin.org/post", body, None)
        .await
        .unwrap();

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

pub async fn simple_http_client_post_file() {
    let client = SimpleHttpClient::new();

    let file: Vec<u8> = vec![1, 2, 3, 4, 5];
    let res: serde_json::Value = client
        .post_file("https://httpbin.org/post", &file, None)
        .await
        .unwrap();

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