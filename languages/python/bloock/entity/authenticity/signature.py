from __future__ import annotations

import bloock._bridge.proto.authenticity_entities_pb2 as proto
from bloock.entity.authenticity.signature_alg import SignatureAlg


class Signature:
    """
    Represents a cryptographic signature along with additional metadata.
    """
    def __init__(
            self, signature: str, alg: str, kid: str, message_hash: str, subject: str
    ) -> None:
        """
        Constructs a Signature object with the specified parameters.
        :type subject: object
        :type message_hash: object
        :type kid: object
        :type alg: object
        :type signature: object
        :rtype: object
        """
        self.signature = signature
        """
        Is the cryptographic signature.
        """
        self.alg = alg
        """
        Is the algorithm used for the signature.
        """
        self.kid = kid
        """
        Is the key identifier associated with the signature. (public key or key ID).
        """
        self.message_hash = message_hash
        """
        Is the hash of the message that was signed.
        """
        self.subject = subject
        """
        Is an optional field representing the subject of the signature.
        """

    @staticmethod
    def from_proto(signature: proto.Signature) -> Signature:
        return Signature(
            signature=signature.signature,
            alg=signature.alg,
            kid=signature.kid,
            message_hash=signature.message_hash,
            subject=signature.subject,
        )

    def to_proto(self) -> proto.Signature:
        return proto.Signature(
            signature=self.signature,
            alg=self.alg,
            kid=self.kid,
            message_hash=self.message_hash,
            subject=self.subject,
        )

    def get_alg(self) -> SignatureAlg:
        return SignatureAlg.from_str(self.alg)
