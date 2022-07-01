pub trait HttpClient {
    fn new(api_key: String) -> Self;
    fn get_api_key(&self) -> String;
    fn get() -> ();
    fn post() -> ();
}

pub struct HttpClientImpl {
    api_key: String,
}

impl HttpClient for HttpClientImpl {
    fn new(api_key: String) -> Self {
        Self { api_key: api_key }
    }
    fn get_api_key(&self) -> String {
        return self.api_key.clone();
    }
    fn get() {
        todo!()
    }
    fn post() {
        todo!()
    }
}
