use crate::anchor::entity::anchor::AnchorNetwork;

#[derive(PartialEq, Eq, Hash, Clone)]
pub enum Network {
    EthereumMainnet,
    EthereumGoerli,
    BloockChain,
    GnosisChain,
}

impl From<String> for Network {
    fn from(str: String) -> Self {
        match str.as_ref() {
            "bloock_chain" => Network::BloockChain,
            "gnosis_chain" => Network::GnosisChain,
            "ethereum_goerli" => Network::EthereumGoerli,
            "ethereum_mainnet" => Network::EthereumMainnet,
            _ => Network::EthereumMainnet,
        }
    }
}

impl From<Network> for String {
    fn from(n: Network) -> Self {
        match n {
            Network::BloockChain => "bloock_chain".to_string(),
            Network::EthereumGoerli => "ethereum_goerli".to_string(),
            Network::EthereumMainnet => "ethereum_mainnet".to_string(),
            Network::GnosisChain => "gnosis_chain".to_string(),
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
