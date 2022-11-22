import bloock
from bloock._bridge.proto.config_pb2 import NetworkConfig as NetworkConfigProto
from bloock.client.entity.network import Network
from bloock.client.entity.network_config import NetworkConfig


def set_network_config(network: Network, config: NetworkConfig):
    bloock.network_config[int(network)] = NetworkConfigProto(
        ContractAddress=config.contract_address,
        ContractAbi=config.contract_abi,
        HttpProvider=config.http_provider,
    )
