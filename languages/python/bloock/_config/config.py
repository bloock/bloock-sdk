import bloock
from bloock._bridge.proto.config_pb2 import ConfigData, Configuration


class Config:
    @staticmethod
    def default() -> ConfigData:
        return ConfigData(
            config=Configuration(
                library_name="Python",
                api_key=bloock.api_key,
                identityApiHost=bloock.identity_api_host,
                host=bloock.api_host,
            ),
            networks_config=bloock.network_config,
        )

    @staticmethod
    def new(config_data: ConfigData) -> ConfigData:
        return config_data
