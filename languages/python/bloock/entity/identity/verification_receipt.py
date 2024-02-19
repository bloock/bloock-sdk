from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class VerificationReceipt:
    """
    Represents a receipt for a verification session.
    """
    def __init__(self, session_id: int, verification_request: str) -> None:
        """
        Constructs a VerificationReceipt object with the specified parameters.
        :type verification_request: object
        :type session_id: object
        :rtype: object
        """
        self.session_id = session_id
        self.verification_request = verification_request

    @staticmethod
    def from_proto(c: proto.VerificationReceipt) -> VerificationReceipt:
        return VerificationReceipt(
            session_id=c.session_id,
            verification_request=c.verification_request,
        )

    def to_proto(self) -> proto.VerificationReceipt:
        return proto.VerificationReceipt(
            session_id=self.session_id,
            verification_request=self.verification_request,
        )