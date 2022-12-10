use crate::items::Network;
use bloock_core::config::entity::network::Network as CoreNetwork;

impl From<Network> for CoreNetwork {
    fn from(n: Network) -> Self {
        match n {
            Network::BloockChain => CoreNetwork::BloockChain,
            Network::EthereumMainnet => CoreNetwork::EthereumMainnet,
            Network::EthereumGoerli => CoreNetwork::EthereumGoerli,
            Network::GnosisChain => CoreNetwork::GnosisChain,
        }
    }
}

pub fn map_network_from_i32(network: i32) -> Option<CoreNetwork> {
    Network::from_i32(network).map(|network| network.into())
}
