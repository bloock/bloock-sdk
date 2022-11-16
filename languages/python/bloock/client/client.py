from typing import List
from bloock._bridge import bridge
from bloock._bridge.proto.anchor_pb2 import GetAnchorRequest, WaitAnchorRequest
from bloock._bridge.proto.proof_pb2 import (
    GetProofRequest,
    ValidateRootRequest,
    VerifyProofRequest,
    VerifyRecordsRequest,
)
from bloock._bridge.proto.record_pb2 import GenerateKeysRequest, SendRecordsRequest
from bloock._bridge.proto.shared_pb2 import Error
from bloock.client.entity.anchor import Anchor
from bloock.client.entity.network import Network
from bloock.client.entity.proof import Proof
from bloock.client.entity.record import Keys, RecordReceipt
from bloock._config.config import Config


class Client:
    def __init__(self) -> None:
        self.bridge_client = bridge.BloockBridge()

    def send_records(self, records: List[str]) -> List[RecordReceipt]:
        res = self.bridge_client.record().SendRecords(
            SendRecordsRequest(config_data=Config.new(), records=records)
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return list(map(lambda x: RecordReceipt.from_proto(x), res.records))

    def get_anchor(self, anchor_id: int) -> Anchor:
        res = self.bridge_client.anchor().GetAnchor(
            GetAnchorRequest(config_data=Config.new(), anchor_id=anchor_id)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return Anchor.from_proto(res.anchor)

    def wait_anchor(self, anchor_id: int, timeout=120000) -> Anchor:
        res = self.bridge_client.anchor().WaitAnchor(
            WaitAnchorRequest(
                config_data=Config.new(), anchor_id=anchor_id, timeout=timeout
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return Anchor.from_proto(res.anchor)

    def get_proof(self, records: List[str]) -> Proof:
        res = self.bridge_client.proof().GetProof(
            GetProofRequest(config_data=Config.new(), records=records)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return Proof.from_proto(res.proof)

    def verify_proof(self, proof: Proof) -> str:
        res = self.bridge_client.proof().VerifyProof(
            VerifyProofRequest(config_data=Config.new(), proof=proof.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return res.record

    def verify_records(
        self, records: List[str], network: Network = Network.ETHEREUM_MAINNET
    ) -> int:
        res = self.bridge_client.proof().VerifyRecords(
            VerifyRecordsRequest(
                config_data=Config.new(),
                records=records,
                network=Network.to_proto(network),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return res.timestamp

    def validate_root(
        self, root: str, network: Network = Network.ETHEREUM_MAINNET
    ) -> int:
        res = self.bridge_client.proof().ValidateRoot(
            ValidateRootRequest(
                config_data=Config.new(),
                root=root,
                network=Network.to_proto(network),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return res.timestamp

    def generate_keys(self) -> Keys:
        res = self.bridge_client.record().GenerateKeys(GenerateKeysRequest())

        if res.error != Error():
            raise Exception(res.error.message)

        return Keys.from_proto(res)
