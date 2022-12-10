__version__ = "2.0.0"

from typing import Dict

import bloock
from bloock._bridge.proto.config_pb2 import NetworkConfig as NetworkConfigProto
from bloock.client.entity.network import Network
from bloock.client.entity.network_config import NetworkConfig

api_key = ""
api_host = ""
disable_analytics = False
network_config: Dict[int, NetworkConfigProto] = {}


def set_network_config(network: Network, config: NetworkConfig):
    bloock.network_config[int(network)] = NetworkConfigProto(
        ContractAddress=config.contract_address,
        ContractAbi=config.contract_abi,
        HttpProvider=config.http_provider,
    )
