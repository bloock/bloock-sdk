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
    Mainnet
}

impl CoreNetwork {
    fn as_str(&self) -> &'static str {
        match self {
            CoreNetwork::BloockChain => "bloock_chain",
            CoreNetwork::Rinkeby => "ethereum_rinkeby",
            CoreNetwork::Mainnet => "ethereum_mainnet"
        }
    }
}

fn select_network(networks: &Vec<network::Network>) -> Network {
    for n in networks {
        if n.name == CoreNetwork::Mainnet.as_str() {
            return Network::EthereumMainnet;
        }
    }

    let name = &networks[0].name;
    match name {
        name if name == CoreNetwork::BloockChain.as_str() => Network::BloockChain,
        name if name == CoreNetwork::Rinkeby.as_str() => Network::EthereumRinkeby,
          _ => Network::EthereumMainnet   
    }
}
