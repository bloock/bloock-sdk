from bloock._bridge.proto.bloock_keys_pb2 import GenerateLocalKeyResponse
from bloock.entity.key.key_pair import KeyPair


class RsaKeyPair(KeyPair):
    """
    Represents a rsa key pair, with private and public key.
    """
    @staticmethod
    def from_proto(res: GenerateLocalKeyResponse) -> KeyPair:
        return KeyPair(res.local_key.key, res.local_key.private_key)
