from __future__ import annotations

from enum import Enum


class SignatureAlg(Enum):
    ECDSA = 0
    ENS = 1
    BJJ = 2
    UNRECOGNIZED = -1

    def __int__(self):
        return self.value

    @staticmethod
    def from_str(alg: str) -> SignatureAlg:
        if alg == "ES256K":
            return SignatureAlg.ECDSA
        elif alg == "ENS":
            return SignatureAlg.ENS
        elif alg == "BJJ":
            return SignatureAlg.BJJ
        else:
            return SignatureAlg.UNRECOGNIZED
