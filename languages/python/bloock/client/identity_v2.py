from bloock._bridge import bridge
from bloock._config.config import Config
from bloock.entity.authenticity.signer import Signer
from bloock.entity.identity_v2.identity_key import IdentityKey
from typing import Optional
from bloock._bridge.proto.shared_pb2 import Error
from bloock.entity.identity_v2.did_params import DidParams
from bloock._bridge.proto.identity_v2_pb2 import CreateIdentityV2Request, CreateIssuerRequest, GetSchemaRequestV2, \
    PublishIssuerStateRequest, CreateVerificationRequest, WaitVerificationRequest, GetVerificationStatusRequest
from bloock._bridge.proto.identity_v2_pb2 import GetIssuerByKeyRequest
from bloock._bridge.proto.identity_v2_pb2 import GetCredentialProofRequest
from bloock._bridge.proto.identity_v2_pb2 import RevokeCredentialRequestV2
from bloock.entity.identity_v2.issuer_state_receipt import IssuerStateReceipt
from bloock.entity.identity_v2.publish_interval_params import PublishIntervalParams
from bloock.entity.identity_v2.schema_builder import SchemaBuilder
from bloock.entity.identity_v2.credential_builder import CredentialBuilder
from bloock.entity.identity_v2.credential_proof import CredentialProof
from bloock.entity.identity_v2.credential import Credential
from bloock.entity.identity_v2.schema import Schema
from bloock.entity.identity_v2.verification_receipt import VerificationReceipt


class IdentityClient:
    def __init__(self, config_data=None) -> None:
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def create_identity(self, identity_key: IdentityKey, did_params: Optional[DidParams] = None) -> str:
        res = self.bridge_client.identity_v2().CreateIdentity(
            CreateIdentityV2Request(
                config_data=self.config_data,
                issuer_key=identity_key.to_proto(),
                did_params=did_params.to_proto() if did_params is not None else None,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.did
    
    def create_issuer(self, issuer_key: IdentityKey, publish_interval: PublishIntervalParams, issuer_params: Optional[DidParams] = None, name: str = None, description: str = None, image: str = None) -> str:
        res = self.bridge_client.identity_v2().CreateIssuer(
            CreateIssuerRequest(
                config_data=self.config_data,
                issuer_key=issuer_key.to_proto(),
                issuer_params=issuer_params.to_proto() if issuer_params is not None else None,
                name=name if name is not None else None,
                description=description if description is not None else None,
                image=image if image is not None else None,
                publish_interval=PublishIntervalParams.to_proto(publish_interval),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.did

    def get_issuer_by_key(self, issuer_key: IdentityKey, issuer_params: Optional[DidParams] = None) -> str:
        res = self.bridge_client.identity_v2().GetIssuerByKey(
            GetIssuerByKeyRequest(
                config_data=self.config_data,
                issuer_key=issuer_key.to_proto(),
                issuer_params=issuer_params.to_proto() if issuer_params is not None else None,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.did

    def build_schema(self, display_name: str, schema_type: str, version: str, description: str, issuer_did: str) -> SchemaBuilder:
        return SchemaBuilder(display_name, schema_type, version, description, issuer_did, self.config_data)

    def get_schema(self, schema_id: str) -> Schema:
        res = self.bridge_client.identity_v2().GetSchema(
            GetSchemaRequestV2(
                config_data=self.config_data,
                id=schema_id
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return Schema.from_proto(res.schema)

    def build_credential(self, display_name: str, issuer_did: str, holder_did: str, expiration: int, version: int) -> CredentialBuilder:
        return CredentialBuilder(display_name, issuer_did, holder_did, expiration, version, self.config_data)

    def publish_issuer_state(self, issuer_did: str, signer: Signer) -> IssuerStateReceipt:
        req = PublishIssuerStateRequest(
            config_data=self.config_data,
            issuer_did=issuer_did,
            signer=signer.to_proto(),
        )

        res = self.bridge_client.identity_v2().PublishIssuerState(req)
        if res.error != Error():
            raise Exception(res.error.message)

        return IssuerStateReceipt.from_proto(res.state_receipt)

    def get_credential_proof(self, issuer_did: str, credential_id: str) -> CredentialProof:
        res = self.bridge_client.identity_v2().GetCredentialProof(
            GetCredentialProofRequest(
                config_data=self.config_data,
                issuer_did=issuer_did,
                credential_id=credential_id,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return CredentialProof.from_proto(res.proof)

    def revoke_credential(self, credential: Credential, signer: Signer) -> bool:
        res = self.bridge_client.identity_v2().RevokeCredential(
            RevokeCredentialRequestV2(
                config_data=self.config_data,
                credential=credential.to_proto(),
                signer=signer.to_proto()
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.result.success

    def create_verification(self, proof_request: str) -> VerificationReceipt:
        res = self.bridge_client.identity_v2().CreateVerification(
            CreateVerificationRequest(
                config_data=self.config_data,
                proof_request=proof_request,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return VerificationReceipt.from_proto(res.result)

    def wait_verification(self, session_id: int, timeout=120000) -> bool:
        res = self.bridge_client.identity_v2().WaitVerification(
            WaitVerificationRequest(
                config_data=self.config_data,
                session_id=session_id,
                timeout=timeout,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.status

    def get_verification_status(self, session_id: int) -> bool:
        res = self.bridge_client.identity_v2().GetVerificationStatus(
            GetVerificationStatusRequest(
                config_data=self.config_data,
                session_id=session_id,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.status