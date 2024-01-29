__version__ = "2.8.0-beta.1"

from typing import Dict

import bloock
from bloock._bridge.proto.config_pb2 import NetworkConfig
from bloock.entity.integrity.network import Network

api_key = ""
api_host = ""
force_env = ""
identity_api_host = ""
disable_analytics = False
network_config: Dict[int, NetworkConfig] = {}


def set_provider(network: Network, provider: str):
    if int(network) in bloock.network_config:
        bloock.network_config[int(network)].HttpProvider = provider
    else:
        bloock.network_config[int(network)] = NetworkConfig(
            HttpProvider=provider)


def set_contract_address(network: Network, contract_address: str):
    if int(network) in bloock.network_config:
        bloock.network_config[int(network)].ContractAddress = contract_address
    else:
        bloock.network_config[int(network)] = NetworkConfig(
            ContractAddress=contract_address
        )
