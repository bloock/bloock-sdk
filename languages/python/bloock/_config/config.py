from bloock._bridge.proto.config_pb2 import ConfigData, Configuration
import bloock


class Config:
    @staticmethod
    def new() -> ConfigData:
        return ConfigData(
            config=Configuration(
                library_name="Python",
                api_key=bloock.api_key,
                host=bloock.api_host,
                disable_analytics=bloock.disable_analytics,
            ),
            networks_config=bloock.network_config,
        )
