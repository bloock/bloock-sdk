from bloock._bridge import bridge
from bloock._bridge.proto.encryption_pb2 import (
    GenerateRsaKeyPairRequest,
    GenerateEciesKeyPairRequest,
    EncryptRequest,
    DecryptRequest,
    EncryptionAlgRequest,
)
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.decrypter import Decrypter
from bloock.entity.encrypter import Encrypter
from bloock.entity.encryption_alg import EncryptionAlg
from bloock.entity.key_pair import KeyPair, RsaKeyPair, EciesKeyPair
from bloock.entity.record import Record


class EncryptionClient:
    def __init__(self, config_data=None) -> None:
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def generate_rsa_keypair(self) -> KeyPair:
        res = self.bridge_client.encryption().GenerateRsaKeyPair(
            GenerateRsaKeyPairRequest(config_data=self.config_data)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return RsaKeyPair.from_proto(res)

    def generate_ecies_keypair(self) -> KeyPair:
        res = self.bridge_client.encryption().GenerateEciesKeyPair(
            GenerateEciesKeyPairRequest(config_data=self.config_data)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return EciesKeyPair.from_proto(res)

    def encrypt(self, record: Record, encrypter: Encrypter) -> Record:
        req = EncryptRequest(
            config_data=self.config_data,
            record=record.to_proto(),
            encrypter=encrypter.to_proto(),
        )
        res = self.bridge_client.encryption().Encrypt(req)

        if res.error != Error():
            raise Exception(res.error.message)

        return Record.from_proto(res.record, self.config_data)

    def decrypt(self, record: Record, decrypter: Decrypter) -> Record:
        req = DecryptRequest(
            config_data=self.config_data,
            record=record.to_proto(),
            decrypter=decrypter.to_proto(),
        )
        res = self.bridge_client.encryption().Decrypt(req)

        if res.error != Error():
            raise Exception(res.error.message)

        return Record.from_proto(res.record, self.config_data)

    def get_encryption_alg(self, record: Record) -> EncryptionAlg:
        client = bridge.BloockBridge()
        req = EncryptionAlgRequest(
            config_data=self.config_data, record=record.to_proto()
        )
        res = client.encryption().GetEncryptionAlg(req)
        if res.error != Error():
            raise Exception(res.error.message)
        return EncryptionAlg.from_proto(res.alg)