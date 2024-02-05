from __future__ import annotations

from enum import Enum


class SignatureAlg(Enum):
    """
    Represents different signature algorithms.
    """
    ECDSA = 0
    """
    Represents the ECDSA signature algorithm with the "ES256K" name.
    """
    ENS = 1
    """
    Represents the ENS (Ethereum Name Service) signature algorithm.
    """
    BJJ = 2
    """
    Represents the BJJ signature algorithm with the "BJJ" name.
    """
    UNRECOGNIZED = -1
    """
    Represents an unrecognized signature algorithm.
    """

    def __int__(self):
        return self.value

    @staticmethod
    def from_str(alg: str) -> SignatureAlg:
        """
        Converts a string representation of an algorithm to the corresponding SignatureAlg enum.
        :type alg: object
        :rtype: object
        """
        if alg == "ES256K":
            return SignatureAlg.ECDSA
        elif alg == "ENS":
            return SignatureAlg.ENS
        elif alg == "BJJ":
            return SignatureAlg.BJJ
        else:
            return SignatureAlg.UNRECOGNIZED
