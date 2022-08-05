use crate::items::Network;
use bloock_core::config::entity::network::Network as CoreNetwork;

pub fn map_network(network: Network) -> CoreNetwork {
    match network {
        Network::BloockChain => CoreNetwork::BloockChain,
        Network::EthereumMainnet => CoreNetwork::EthereumMainnet,
        Network::EthereumRinkeby => CoreNetwork::EthereumRinkeby,
    }
}
