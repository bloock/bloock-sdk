use crate::anchor::entity::anchor::AnchorNetwork;

#[derive(PartialEq, Eq, Hash)]
pub enum Network {
    EthereumMainnet,
    EthereumRinkeby,
    BloockChain,
}

impl From<String> for Network {
    fn from(str: String) -> Self {
        match str.as_ref() {
            "bloock_chain" => Network::BloockChain,
            "ethereum_rinkeby" => Network::EthereumRinkeby,
            "ethereum_mainnet" => Network::EthereumMainnet,
            _ => Network::EthereumMainnet,
        }
    }
}

impl From<Network> for String {
    fn from(n: Network) -> Self {
        match n {
            Network::BloockChain => "bloock_chain".to_string(),
            Network::EthereumRinkeby => "ethereum_rinkeby".to_string(),
            Network::EthereumMainnet => "ethereum_mainnet".to_string(),
        }
    }
}

pub fn select_network(networks: &Vec<AnchorNetwork>) -> Network {
    for n in networks {
        let network: String = Network::EthereumMainnet.into();
        if n.name == network {
            return Network::EthereumMainnet;
        }
    }

    Network::from(networks[0].name.clone())
}
