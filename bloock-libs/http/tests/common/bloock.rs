use std::collections::HashMap;

use bloock_http::{BloockHttpClient, Client};

pub async fn bloock_http_client_get_api_key() {
    let client = BloockHttpClient::new(String::from("my_api_key"));

    assert_eq!(
        client.get_api_key(),
        "my_api_key",
        "Returning Err instead of Ok."
    );
}

pub async fn bloock_http_client_get() {
    let client = BloockHttpClient::new(String::from("my-api-key"));
    let res = client.get("https://httpbin.org/get", None).await.unwrap();

    assert!(!res.is_empty(), "HTTP Get not returning valid auth header.");
}

pub async fn bloock_http_client_get_json() {
    let client = BloockHttpClient::new(String::from("my-api-key"));
    let res: serde_json::Value = client
        .get_json("https://httpbin.org/get", None)
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
}

pub async fn bloock_http_client_post() {
    let client = BloockHttpClient::new(String::from("my-api-key"));

    let body = "Hello world".as_bytes();
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

    let response: String = serde_json::from_value(res.get("data").unwrap().clone()).unwrap();
    assert_eq!(
        response.as_bytes(),
        body,
        "HTTP Post not returning correct response."
    );
}

pub async fn bloock_http_client_post_json() {
    let client = BloockHttpClient::new(String::from("my-api-key"));

    let mut body: HashMap<String, String> = HashMap::new();
    body.insert(String::from("hello"), String::from("world"));
    let res: serde_json::Value = client
        .post_json("https://httpbin.org/post", body, None)
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

pub async fn bloock_http_client_post_file() {
    let client = BloockHttpClient::new(String::from("my-api-key"));

    let file = "A file".as_bytes().to_vec();
    let res: serde_json::Value = client
        .post_file(
            "https://httpbin.org/post",
            vec![("payload".to_owned(), file.clone())],
            None,
        )
        .await
        .unwrap();

    println!("{:?}", res);

    let response: String =
        serde_json::from_value(res.get("files").unwrap().get("payload").unwrap().clone()).unwrap();
    assert_eq!(
        response.as_bytes(),
        file.as_slice(),
        "HTTP Post not returning correct response."
    );

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
