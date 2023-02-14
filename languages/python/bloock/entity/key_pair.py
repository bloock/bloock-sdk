from bloock._bridge.proto.encryption_pb2 import (
    GenerateRsaKeyPairResponse,
    GenerateEciesKeyPairResponse,
)
from bloock._bridge.proto.authenticity_pb2 import GenerateEcdsaKeysResponse


class KeyPair:
    def __init__(self, public_key: str, private_key: str) -> None:
        self.public_key = public_key
        self.private_key = private_key


class EcdsaKeys(KeyPair):
    @staticmethod
    def from_proto(res: GenerateEcdsaKeysResponse) -> KeyPair:
        return EcdsaKeys(res.publicKey, res.privateKey)


class RsaKeyPair(KeyPair):
    @staticmethod
    def from_proto(res: GenerateRsaKeyPairResponse) -> KeyPair:
        return KeyPair(res.publicKey, res.privateKey)


class EciesKeyPair(KeyPair):
    @staticmethod
    def from_proto(res: GenerateEciesKeyPairResponse) -> KeyPair:
        return KeyPair(res.publicKey, res.privateKey)
