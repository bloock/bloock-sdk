use crate::client::BloockClient;

mod anchor;
mod client;
mod config;
mod infrastructure;
mod proof;
mod record;

fn main() -> () {
    let client = client::configure(String::from("my api key"));
    println!("{}", client.get_key())
}
