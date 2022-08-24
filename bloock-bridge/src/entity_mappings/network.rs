use crate::items::{Network, NetworkConfig};
use bloock_core::config::entity::{
    config::NetworkConfiguration as CoreNetworkConfig, network::Network as CoreNetwork,
};

pub fn map_network(network: Network) -> CoreNetwork {
    match network {
        Network::BloockChain => CoreNetwork::BloockChain,
        Network::EthereumMainnet => CoreNetwork::EthereumMainnet,
        Network::EthereumRinkeby => CoreNetwork::EthereumRinkeby,
    }
}

pub fn map_network_from_i32(network: i32) -> Option<CoreNetwork> {
    match Network::from_i32(network) {
        Some(network) => Some(map_network(network)),
        None => None,
    }
}

pub fn map_network_config(network: NetworkConfig) -> CoreNetworkConfig {
    CoreNetworkConfig {
        contract_address: network.contract_address,
        contract_abi: network.contract_abi,
        http_provider: network.http_provider,
    }
}