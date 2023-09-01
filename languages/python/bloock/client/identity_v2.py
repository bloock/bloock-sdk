from bloock._bridge import bridge
from bloock._config.config import Config
from bloock.entity.identity_v2.issuer_key import IssuerKey
from typing import List, Optional
from bloock._bridge.proto.shared_pb2 import Error


from bloock.entity.identity_v2.issuer_params import IssuerParams
from bloock._bridge.proto.identity_v2_pb2 import CreateIssuerRequest
from bloock._bridge.proto.identity_v2_pb2 import GetIssuerListRequest
from bloock._bridge.proto.identity_v2_pb2 import GetIssuerByKeyRequest
from bloock._bridge.proto.identity_v2_pb2 import GetCredentialProofRequest
from bloock._bridge.proto.identity_v2_pb2 import RevokeCredentialRequestV2
from bloock.entity.identity_v2.schema_builder import SchemaBuilder
from bloock.entity.identity_v2.credential_builder import CredentialBuilder
from bloock.entity.identity_v2.issuer_state_publisher import IssuerStatePublisher
from bloock.entity.identity_v2.credential_proof import CredentialProof
from bloock.entity.identity_v2.credential import Credential


class IdentityV2Client:
    def __init__(self, api_managed_host: str, config_data=None) -> None:
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data
        self.api_managed_host = api_managed_host

    def create_issuer(self, issuer_key: IssuerKey, issuer_params: Optional[IssuerParams] = None) -> str:
        res = self.bridge_client.identity_v2().CreateIssuer(
            CreateIssuerRequest(
                config_data=self.config_data,
                issuer_key=issuer_key.to_proto(),
                issuer_params=issuer_params.to_proto() if issuer_params is not None else None,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.did

    def get_issuer_list(self) -> List[str]:
        res = self.bridge_client.identity_v2().GetIssuerList(
            GetIssuerListRequest(
                config_data=self.config_data,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return list(res.did)

    def get_issuer_by_key(self, issuer_key: IssuerKey, issuer_params: Optional[IssuerParams] = None) -> str:
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

    def build_credential(self, display_name: str, issuer_did: str, holder_did: str, expiration: int, version: int) -> CredentialBuilder:
        return CredentialBuilder(display_name, issuer_did, holder_did, expiration, version, self.api_managed_host, self.config_data)

    def build_issuer_state_publisher(self, issuer_did: str) -> IssuerStatePublisher:
        return IssuerStatePublisher(issuer_did, self.config_data)

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

    def revoke_credential(self, credential: Credential) -> bool:
        res = self.bridge_client.identity_v2().RevokeCredential(
            RevokeCredentialRequestV2(
                config_data=self.config_data,
                credential=credential.to_proto()
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return res.result.success
