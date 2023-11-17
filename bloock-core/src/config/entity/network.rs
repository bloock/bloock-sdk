use crate::integrity::entity::anchor::AnchorNetwork;

#[derive(Debug, PartialEq, Eq, Hash, Clone)]
pub enum Network {
    EthereumMainnet,
    EthereumGoerli,
    BloockChain,
    GnosisChain,
    PolygonChain,
}

impl From<String> for Network {
    fn from(str: String) -> Self {
        match str.as_ref() {
            "bloock_chain" => Network::BloockChain,
            "gnosis_chain" => Network::GnosisChain,
            "ethereum_goerli" => Network::EthereumGoerli,
            "ethereum_mainnet" => Network::EthereumMainnet,
            "polygon_chain" => Network::PolygonChain,
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
            Network::PolygonChain => "polygon_chain".to_string(),
        }
    }
}

pub fn select_network(root: String, networks: &Vec<AnchorNetwork>) -> Option<Network> {
    let mut selected = None;
    for n in networks {
        if n.root == Some(root.clone()) {
            let network: Network = n.name.clone().into();
            if network == Network::EthereumMainnet {
                return Some(network);
            }

            if selected.is_none() {
                selected = Some(network);
            }
        }
    }

    selected
}

#[cfg(test)]
mod tests {
    use crate::{config::entity::network::Network, integrity::entity::anchor::AnchorNetwork};

    #[test]
    fn test_select_network() {
        let root = "root".to_string();
        let networks = vec![
            AnchorNetwork {
                name: Network::GnosisChain.into(),
                state: "state".to_string(),
                tx_hash: "tx_hash".to_string(),
                root: Some("root".to_string()),
            },
            AnchorNetwork {
                name: Network::PolygonChain.into(),
                state: "state".to_string(),
                tx_hash: "tx_hash".to_string(),
                root: Some("root".to_string()),
            },
        ];
        let network = super::select_network(root, &networks);

        assert_eq!(network, Some(Network::GnosisChain));
    }

    #[test]
    fn test_select_network_mainnet() {
        let root = "root".to_string();
        let networks = vec![
            AnchorNetwork {
                name: Network::GnosisChain.into(),
                state: "state".to_string(),
                tx_hash: "tx_hash".to_string(),
                root: Some("root".to_string()),
            },
            AnchorNetwork {
                name: Network::EthereumMainnet.into(),
                state: "state".to_string(),
                tx_hash: "tx_hash".to_string(),
                root: Some("root".to_string()),
            },
        ];
        let network = super::select_network(root, &networks);

        assert_eq!(network, Some(Network::EthereumMainnet));
    }

    #[test]
    fn test_select_network_different_root() {
        let root = "root".to_string();
        let networks = vec![
            AnchorNetwork {
                name: Network::GnosisChain.into(),
                state: "state".to_string(),
                tx_hash: "tx_hash".to_string(),
                root: Some("different_root".to_string()),
            },
            AnchorNetwork {
                name: Network::PolygonChain.into(),
                state: "state".to_string(),
                tx_hash: "tx_hash".to_string(),
                root: Some("root".to_string()),
            },
        ];
        let network = super::select_network(root, &networks);

        assert_eq!(network, Some(Network::PolygonChain));
    }

    #[test]
    fn test_select_network_none_valid() {
        let root = "root".to_string();
        let networks = vec![
            AnchorNetwork {
                name: Network::GnosisChain.into(),
                state: "state".to_string(),
                tx_hash: "tx_hash".to_string(),
                root: Some("root2".to_string()),
            },
            AnchorNetwork {
                name: Network::EthereumMainnet.into(),
                state: "state".to_string(),
                tx_hash: "tx_hash".to_string(),
                root: Some("root2".to_string()),
            },
        ];
        let network = super::select_network(root, &networks);

        assert_eq!(network, None);
    }
}
