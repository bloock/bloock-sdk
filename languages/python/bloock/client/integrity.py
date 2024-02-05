from typing import List, Optional

from bloock._bridge import bridge
from bloock._bridge.proto.integrity_pb2 import (
    SendRecordsRequest,
    GetAnchorRequest,
    WaitAnchorRequest,
    GetProofRequest,
    VerifyProofRequest,
    VerifyRecordsRequest,
    ValidateRootRequest,
)
from bloock._bridge.proto.shared_pb2 import Error
from bloock._config.config import Config
from bloock.entity.integrity.anchor import Anchor
from bloock.entity.integrity.network import Network
from bloock.entity.integrity.proof import Proof
from bloock.entity.integrity.record_receipt import RecordReceipt
from bloock.entity.record.record import Record


class IntegrityClient:
    """
    Provides functionality to interact with the [Bloock Integrity service](https://dashboard.bloock.com/login).
    """
    def __init__(self, config_data=None) -> None:
        """
        Creates a new IntegrityClient with the given configuration.
        :type config_data: object
        :rtype: object
        """
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data

    def send_records(self, records: List[Record]) -> List[RecordReceipt]:
        """
        Sends records to the Bloock Integrity service for certification.
        :type records: object
        :rtype: object
        """
        res = self.bridge_client.integrity().SendRecords(
            SendRecordsRequest(
                config_data=self.config_data,
                records=map(lambda x: x.to_proto(), records),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)
        return list(map(lambda x: RecordReceipt.from_proto(x), res.records))

    def get_anchor(self, anchor_id: int) -> Anchor:
        """
        Gets an anchor by its ID from the Bloock Integrity service.
        :type anchor_id: object
        :rtype: object
        """
        res = self.bridge_client.integrity().GetAnchor(
            GetAnchorRequest(config_data=self.config_data, anchor_id=anchor_id)
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return Anchor.from_proto(res.anchor)

    def wait_anchor(self, anchor_id: int, timeout=120000) -> Anchor:
        """
        Waits for the completion of an anchor on the Bloock Integrity service.
        :type timeout: object
        :type anchor_id: object
        :rtype: object
        """
        res = self.bridge_client.integrity().WaitAnchor(
            WaitAnchorRequest(
                config_data=self.config_data, anchor_id=anchor_id, timeout=timeout
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return Anchor.from_proto(res.anchor)

    def get_proof(self, records: List[Record]) -> Proof:
        """
        Waits for the completion of an anchor on the Bloock Integrity service.
        :type records: object
        :rtype: object
        """
        res = self.bridge_client.integrity().GetProof(
            GetProofRequest(
                config_data=self.config_data,
                records=map(lambda x: x.to_proto(), records),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return Proof.from_proto(res.proof)

    def verify_proof(self, proof: Proof) -> str:
        """
        Gets a proof for a set of records from the Bloock Integrity service.
        :type proof: object
        :rtype: object
        """
        res = self.bridge_client.integrity().VerifyProof(
            VerifyProofRequest(config_data=self.config_data, proof=proof.to_proto())
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return res.record

    def verify_records(
            self, records: List[Record], network: Optional[Network] = None
    ) -> int:
        """
        Verifies the integrity of a set of records.
        :type network: object
        :type records: object
        :rtype: object
        """
        res = self.bridge_client.integrity().VerifyRecords(
            VerifyRecordsRequest(
                config_data=self.config_data,
                records=map(lambda x: x.to_proto(), records),
                network=Network.to_proto(network) if network is not None else None,
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return res.timestamp

    def validate_root(self, root: str, network: Network) -> int:
        """
        Validates the integrity of a merkle root proof on blockchain.
        :type network: object
        :type root: object
        :rtype: object
        """
        res = self.bridge_client.integrity().ValidateRoot(
            ValidateRootRequest(
                config_data=self.config_data,
                root=root,
                network=Network.to_proto(network),
            )
        )

        if res.error != Error():
            raise Exception(res.error.message)

        return res.timestamp
