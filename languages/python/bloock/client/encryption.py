from warnings import warn

from bloock._bridge import bridge
from bloock._bridge.proto.encryption_pb2 import (
    EncryptRequest,
    DecryptRequest,
    EncryptionAlgRequest,
)
from bloock._bridge.proto.keys_pb2 import GenerateLocalKeyRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.encryption.encrypter import Encrypter
from bloock.entity.encryption.encryption_alg import EncryptionAlg
from bloock.entity.key.key_pair import KeyPair
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.rsa_key_pair import RsaKeyPair
from bloock.entity.record.record import Record


class EncryptionClient:
    """
    Represents a client for interacting with the [Bloock Encryption service](https://dashboard.bloock.com/login).
    """
    def __init__(self, config_data=None) -> None:
        """
        Creates a new instance of the EncryptionClient with the provided configuration.
        :type config_data: object
        :rtype: object
        """
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def generate_rsa_keypair(self) -> KeyPair:
        """
        GenerateRsaKeyPair generates an RSA key pair for encryption.

        Will be deleted in future versions.
        ...deprecated:: 2.8.0
            Use KeyClient.newLocalKey function instead.
        :rtype: object
        """
        warn('Will be deleted in future versions. Use KeyClient.newLocalKey function instead.',
             DeprecationWarning, stacklevel=2
             )
        res = self.bridge_client.key().GenerateLocalKey(
            GenerateLocalKeyRequest(config_data=self.config_data, key_type=KeyType.Rsa2048.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return RsaKeyPair.from_proto(res)

    def encrypt(self, record: Record, encrypter: Encrypter) -> Record:
        """
        Encrypts a Bloock record using the specified encrypter.
        :type encrypter: object
        :type record: object
        :rtype: object
        """
        req = EncryptRequest(
            config_data=self.config_data,
            record=record.to_proto(),
            encrypter=encrypter.to_proto(),
        )
        res = self.bridge_client.encryption().Encrypt(req)

        if res.error != Error():
            raise Exception(res.error.message)

        return Record.from_proto(res.record, self.config_data)

    def decrypt(self, record: Record, decrypter: Encrypter) -> Record:
        """
        Decrypts a Bloock record using the specified decrypter.
        :type decrypter: object
        :type record: object
        :rtype: object
        """
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
        """
        Gets the encryption algorithm used for a Bloock record.
        :type record: object
        :rtype: object
        """
        client = bridge.BloockBridge()
        req = EncryptionAlgRequest(
            config_data=self.config_data, record=record.to_proto()
        )
        res = client.encryption().GetEncryptionAlg(req)
        if res.error != Error():
            raise Exception(res.error.message)
        return EncryptionAlg.from_proto(res.alg)
