from typing import List
from bloock._bridge import bridge
from bloock._bridge.proto.config_pb2 import ConfigData, Configuration, Network, NetworkConfig
from bloock._bridge.proto.record_pb2 import SendRecordsRequest


class Client:
    def __init__(self, api_key: str, host: str) -> None:
        self.bridge_client = bridge.BloockBridge()
        self.confid_data = ConfigData(
            config=Configuration(api_key=api_key, host=host),
        )

    def set_api_host(self, host: str):
        self.confid_data.config.host = host

    def set_network_config(self, network: Network.ValueType, config: NetworkConfig):
        self.confid_data.networks_config[network] = config

    def send_records(self, records: List[str]):
        res = self.bridge_client.record().SendRecords(
                SendRecordsRequest(config_data=self.confid_data, records=records)
        )
        if res.error:
            pass


    def get_anchor(self):
        pass

    def wait_anchor(self):
        pass

    def get_proof(self):
        pass

    def verify_proof(self):
        pass

    def verify_records(self):
        pass

    def validate_root(self):
        pass

    def generate_keys(self):
        pass
