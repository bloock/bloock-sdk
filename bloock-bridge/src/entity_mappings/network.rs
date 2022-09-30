use crate::items::{Network, NetworkConfig};
use bloock_core::config::entity::{
    config::NetworkConfiguration as CoreNetworkConfig, network::Network as CoreNetwork,
};

impl From<Network> for CoreNetwork {
    fn from(n: Network) -> Self {
        match n {
            Network::BloockChain => CoreNetwork::BloockChain,
            Network::EthereumMainnet => CoreNetwork::EthereumMainnet,
            Network::EthereumRinkeby => CoreNetwork::EthereumRinkeby,
            Network::GnosisChain => CoreNetwork::GnosisChain,
        }
    }
}

pub fn map_network_from_i32(network: i32) -> Option<CoreNetwork> {
    Network::from_i32(network).map(|network| network.into())
}

pub fn map_network_config(network: NetworkConfig) -> CoreNetworkConfig {
    CoreNetworkConfig {
        contract_address: network.contract_address,
        contract_abi: network.contract_abi,
        http_provider: network.http_provider,
    }
}
