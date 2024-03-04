from __future__ import annotations
from warnings import warn

from enum import Enum

from bloock._bridge.proto.config_pb2 import Network as NetworkProto


class Network(Enum):
    """
    Represents a network.
    """
    ETHEREUM_MAINNET = 0
    ETHEREUM_GOERLI = 1
    """
    Test networks will be deleted in future versions. If you have been integrating with an existent test API key and you want to start a free trial period please contact support@bloock.com.

    Will be deleted in future versions.
    ...deprecated:: 2.9.0
    """
    warn('Test networks will be deleted in future versions. If you have been integrating with an existent test API key and you want to start a free trial period please contact support@bloock.com.',
         DeprecationWarning, stacklevel=2
         )
    GNOSIS_CHAIN = 2
    BLOOCK_CHAIN = 3
    """
    Test networks will be deleted in future versions. If you have been integrating with an existent test API key and you want to start a free trial period please contact support@bloock.com.

    Will be deleted in future versions.
    ...deprecated:: 2.9.0
    """
    warn('Test networks will be deleted in future versions. If you have been integrating with an existent test API key and you want to start a free trial period please contact support@bloock.com.',
         DeprecationWarning, stacklevel=2
         )
    POLYGON_CHAIN = 4

    def __int__(self):
        return self.value

    @staticmethod
    def to_proto(network: Network) -> NetworkProto.ValueType:
        if network == Network.ETHEREUM_MAINNET:
            return NetworkProto.ETHEREUM_MAINNET
        elif network == Network.ETHEREUM_GOERLI:
            return NetworkProto.ETHEREUM_GOERLI
        elif network == Network.GNOSIS_CHAIN:
            return NetworkProto.GNOSIS_CHAIN
        elif network == Network.BLOOCK_CHAIN:
            return NetworkProto.BLOOCK_CHAIN
        elif network == Network.POLYGON_CHAIN:
            return NetworkProto.POLYGON_CHAIN
