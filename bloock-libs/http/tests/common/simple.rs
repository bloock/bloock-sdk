use std::collections::HashMap;

use bloock_http::{Client, SimpleHttpClient};

pub async fn simple_http_client_get() {
    let client = SimpleHttpClient::new();
    let res = client.get("https://httpbin.org/get", None).await.unwrap();

    assert!(!res.is_empty(), "HTTP Get not returning valid auth header.");
}

pub async fn simple_http_client_get_json() {
    let client = SimpleHttpClient::new();
    let res: serde_json::Value = client
        .get_json("https://httpbin.org/get", None)
        .await
        .unwrap();
    assert!(!res.is_null());
}

pub async fn simple_http_client_post() {
    let client = SimpleHttpClient::new();

    let body = "Hello world".as_bytes();
    let res: serde_json::Value = client
        .post("https://httpbin.org/post", body, None)
        .await
        .unwrap();

    let response: String = serde_json::from_value(res.get("data").unwrap().clone()).unwrap();
    assert_eq!(
        response.as_bytes(),
        body,
        "HTTP Post not returning correct response."
    );
}

pub async fn simple_http_client_post_json() {
    let client = SimpleHttpClient::new();

    let mut body: HashMap<String, String> = HashMap::new();
    body.insert(String::from("hello"), String::from("world"));
    let res: serde_json::Value = client
        .post_json("https://httpbin.org/post", body, None)
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

    let file = "A file".as_bytes().to_vec();
    let res: serde_json::Value = client
        .post_file(
            "https://httpbin.org/post",
            vec![("payload".to_owned(), file.clone())],
            None,
        )
        .await
        .unwrap();

    let response: String =
        serde_json::from_value(res.get("files").unwrap().get("payload").unwrap().clone()).unwrap();
    assert_eq!(
        response.as_bytes(),
        file.as_slice(),
        "HTTP Post not returning correct response."
    );
}
