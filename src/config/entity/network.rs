use crate::anchor::entity::network;

#[derive(PartialEq, Eq, Hash)]
pub enum Network {
    EthereumMainnet,
    EthereumRinkeby,
    BloockChain,
}

enum CoreNetwork {
    BloockChain,
    Rinkeby,
    Mainnet,
}

impl CoreNetwork {
    fn as_str(&self) -> &'static str {
        match self {
            CoreNetwork::BloockChain => "bloock_chain",
            CoreNetwork::Rinkeby => "ethereum_rinkeby",
            CoreNetwork::Mainnet => "ethereum_mainnet",
        }
    }

    fn from_str(s: &str) -> Option<CoreNetwork> {
        match s {
            "bloock_chain" => Some(CoreNetwork::BloockChain),
            "ethereum_rinkeby" => Some(CoreNetwork::Rinkeby),
            "ethereum_mainnet" => Some(CoreNetwork::Mainnet),
            _ => None,
        }
    }
}

fn select_network(networks: &Vec<network::Network>) -> Network {
    for n in networks {
        if n.name == CoreNetwork::Mainnet.as_str() {
            return Network::EthereumMainnet;
        }
    }

    let network = CoreNetwork::from_str(&networks[0].name).unwrap_or(CoreNetwork::Mainnet);
    match network {
        CoreNetwork::BloockChain => Network::BloockChain,
        CoreNetwork::Rinkeby => Network::EthereumRinkeby,
        CoreNetwork::Mainnet => Network::EthereumMainnet,
    }
}
