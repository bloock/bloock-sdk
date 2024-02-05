from __future__ import annotations

import bloock._bridge.proto.identity_entities_pb2 as proto


class SignatureHeaderJws:
    """
    Represents the header of a JSON Web Signature (JWS). [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515).
    """
    def __init__(self, alg: str, kid: str) -> None:
        """
        Constructs a SignatureHeaderJws object with the specified algorithm and key identifier.
        :type kid: object
        :type alg: object
        :rtype: object
        """
        self.alg = alg
        self.kid = kid

    @staticmethod
    def from_proto(header: proto.SignatureHeaderJWS) -> SignatureHeaderJws:
        return SignatureHeaderJws(alg=header.alg, kid=header.kid)

    def to_proto(self) -> proto.SignatureHeaderJWS:
        return proto.SignatureHeaderJWS(alg=self.alg, kid=self.kid)
