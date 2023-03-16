from bloock._bridge import bridge
from bloock._bridge.proto.keys_pb2 import GenerateLocalKeyRequest, GenerateManagedKeyRequest, LoadLocalKeyRequest, \
    LoadManagedKeyRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.local_key import LocalKey
from bloock.entity.key.managed_key import ManagedKey
from bloock.entity.key.managed_key_params import ManagedKeyParams


class KeyClient:
    def __init__(self, config_data=None) -> None:
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def new_local_key(self, key_type: KeyType) -> LocalKey:
        res = self.bridge_client.key().GenerateLocalKey(
            GenerateLocalKeyRequest(config_data=self.config_data, key_type=key_type.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return LocalKey.from_proto(res.local_key)

    def load_local_key(self, key_type: KeyType, key: str, private_key: str = "") -> LocalKey:
        res = self.bridge_client.key().LoadLocalKey(
            LoadLocalKeyRequest(config_data=self.config_data, key_type=key_type.to_proto(), key=key, private_key=private_key)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return LocalKey.from_proto(res.local_key)

    def new_managed_key(self, params: ManagedKeyParams) -> ManagedKey:
        res = self.bridge_client.key().GenerateManagedKey(
            GenerateManagedKeyRequest(config_data=self.config_data, params=params.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return ManagedKey.from_proto(res.managed_key)

    def load_managed_key(self, id: str) -> ManagedKey:
        res = self.bridge_client.key().LoadManagedKey(
            LoadManagedKeyRequest(config_data=self.config_data, id=id)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return ManagedKey.from_proto(res.managed_key)
