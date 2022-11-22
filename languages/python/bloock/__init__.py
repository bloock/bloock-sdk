__version__ = "2.0.0-beta.24"

from typing import Dict

from bloock._bridge.proto.config_pb2 import NetworkConfig

api_key = ""
api_host = ""
network_config: Dict[int, NetworkConfig] = {}
