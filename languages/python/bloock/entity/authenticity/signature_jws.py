from __future__ import annotations

import bloock._bridge.proto.bloock_identity_entities_pb2 as proto
from bloock.entity.authenticity.signature_alg import SignatureAlg
from bloock.entity.authenticity.signature_header_jws import SignatureHeaderJws


class SignatureJws:
    """
    Represents a JSON Web Signature (JWS). [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515).
    """
    def __init__(
            self, message_hash: str, signature: str, protected: str, header: SignatureHeaderJws
    ) -> None:
        """
        Constructs a SignatureJws object with the specified parameters.
        :type header: object
        :type protected: object
        :type signature: object
        :type message_hash: object
        :rtype: object
        """
        self.signature = signature
        self.protected = protected
        self.header = header
        self.message_hash = message_hash

    @staticmethod
    def from_proto(signature: proto.SignatureJWS) -> SignatureJws:
        return SignatureJws(
            signature=signature.signature,
            protected=signature.protected,
            header=SignatureHeaderJws.from_proto(signature.header),
            message_hash=signature.message_hash,
        )

    def to_proto(self) -> proto.SignatureJWS:
        return proto.SignatureJWS(
            signature=self.signature,
            protected=self.protected,
            header=self.header.to_proto(),
            message_hash=self.message_hash,
        )

    def get_alg(self) -> SignatureAlg:
        """
        Gets the algorithm used for the JWS signature.
        :rtype: object
        """
        return SignatureAlg.from_str(self.header.alg)
