from bloock.entity.key.local_key import LocalKey
from bloock.entity.key.managed_key import ManagedKey


class SignerArgs:
    local_key = None
    managed_key = None

    def __init__(self, key, common_name=None) -> None:
        if isinstance(key, LocalKey):
            self.local_key = key
        elif isinstance(key, ManagedKey):
            self.managed_key = key
        else:
            raise Exception("Invalid key provided. Must be of type LocalKey or ManagedKey")

        self.common_name = common_name
