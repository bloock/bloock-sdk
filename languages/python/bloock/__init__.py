__version__ = "2.8.7"

from typing import Dict

import bloock
from bloock._bridge.proto.config_pb2 import NetworkConfig
from bloock.entity.integrity.network import Network

api_key = ""
api_host = ""
identity_api_host = ""
network_config: Dict[int, NetworkConfig] = {}


def set_provider(network: Network, provider: str):
    """
    Sets the HTTP provider for the specified network in the Bloock SDK configuration.
    :type network: object
    :type provider: object
    :rtype: object
    """
    if int(network) in bloock.network_config:
        bloock.network_config[int(network)].HttpProvider = provider
    else:
        bloock.network_config[int(network)] = NetworkConfig(
            HttpProvider=provider)


def set_contract_address(network: Network, contract_address: str):
    """
    Sets the contract address for the specified network in the Bloock SDK configuration.
    :type contract_address: object
    :type network: object
    :rtype: object
    """
    if int(network) in bloock.network_config:
        bloock.network_config[int(network)].ContractAddress = contract_address
    else:
        bloock.network_config[int(network)] = NetworkConfig(
            ContractAddress=contract_address
        )
