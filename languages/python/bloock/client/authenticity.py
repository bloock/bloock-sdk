from typing import List
from warnings import warn

from bloock._bridge import bridge
from bloock._bridge.proto.bloock_authenticity_pb2 import (
    GetSignaturesRequest,
    SignRequest,
    VerifyRequest,
)
from bloock._bridge.proto.bloock_keys_pb2 import GenerateLocalKeyRequest
from bloock._bridge.proto.bloock_shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.authenticity.signature import Signature
from bloock.entity.authenticity.signer import Signer
from bloock.entity.key.ecdsa_key_pair import EcdsaKeys
from bloock.entity.key.key_pair import KeyPair
from bloock.entity.key.key_type import KeyType
from bloock.entity.record.record import Record


class AuthenticityClient:
    """
    Represents a client for interacting with the [Bloock Authenticity service dashboard](https://dashboard.bloock.com/login).
    """
    def __init__(self, config_data=None) -> None:
        """
        Creates a new instance of the AuthenticityClient with default configuration.
        :type config_data: object
        :rtype: object
        """
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def generate_ecdsa_keys(self) -> KeyPair:
        """
        Generates ECDSA key pair for signing records.

        Will be deleted in future versions.
        ...deprecated:: 2.8.0
            Use KeyClient.newLocalKey function instead.
        :rtype: object
        """
        warn('Will be deleted in future versions. Use KeyClient.newLocalKey function instead.',
             DeprecationWarning, stacklevel=2
             )
        res = self.bridge_client.key().GenerateLocalKey(
            GenerateLocalKeyRequest(config_data=self.config_data, key_type=KeyType.EcP256k.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return EcdsaKeys.from_proto(res)

    def sign(self, record: Record, signer: Signer) -> Signature:
        """
        Signs a Bloock record using the specified signer.
        :type signer: object
        :type record: object
        :rtype: object
        """
        res = self.bridge_client.authenticity().Sign(
            SignRequest(
                config_data=self.config_data,
                record=record.to_proto(),
                signer=signer.to_proto(),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return Signature.from_proto(res.signature)

    def verify(self, record: Record) -> bool:
        """
        Verifies the authenticity of a Bloock record.
        :type record: object
        :rtype: object
        """
        res = self.bridge_client.authenticity().Verify(
            VerifyRequest(config_data=self.config_data, record=record.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return res.valid

    def get_signatures(self, record: Record) -> List[Signature]:
        """
        Gets the signatures associated with a Bloock record.
        :type record: object
        :rtype: object
        """
        client = bridge.BloockBridge()
        req = GetSignaturesRequest(
            config_data=self.config_data, record=record.to_proto()
        )
        res = client.authenticity().GetSignatures(req)
        if res.error != Error():
            raise Exception(res.error.message)
        return list(map(lambda x: Signature.from_proto(x), res.signatures))
