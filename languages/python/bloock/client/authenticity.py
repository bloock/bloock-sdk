from typing import List

from bloock._bridge import bridge
from bloock._bridge.proto.authenticity_pb2 import (
    GenerateEcdsaKeysRequest,
    SignatureCommonNameRequest,
    GetSignaturesRequest,
    SignRequest,
    VerifyRequest,
)
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.key_pair import KeyPair, EcdsaKeys
from bloock.entity.record import Record
from bloock.entity.signature import Signature
from bloock.entity.signer import Signer


class AuthenticityClient:
    def __init__(self, config_data=None) -> None:
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def generate_ecdsa_keys(self) -> KeyPair:
        res = self.bridge_client.authenticity().GenerateEcdsaKeys(
            GenerateEcdsaKeysRequest(config_data=self.config_data)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return EcdsaKeys.from_proto(res)

    def sign(self, record: Record, signer: Signer) -> Signature:
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
        res = self.bridge_client.authenticity().Verify(
            VerifyRequest(config_data=self.config_data, record=record.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return res.valid

    def get_signatures(self, record: Record) -> List[Signature]:
        client = bridge.BloockBridge()
        req = GetSignaturesRequest(
            config_data=self.config_data, record=record.to_proto()
        )
        res = client.authenticity().GetSignatures(req)
        if res.error != Error():
            raise Exception(res.error.message)
        return list(map(lambda x: Signature.from_proto(x), res.signatures))

    def get_signature_common_name(self, signature: Signature) -> str:
        res = self.bridge_client.authenticity().GetSignatureCommonName(
            SignatureCommonNameRequest(
                config_data=self.config_data, signature=signature.to_proto()
            )
        )
        if res.error != Error():
            raise Exception(res.error.message)
        return res.common_name