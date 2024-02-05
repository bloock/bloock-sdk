from __future__ import annotations

from enum import Enum

import bloock._bridge.proto.keys_entities_pb2 as proto


class KeyType(Enum):
    """
    Represents the type of cryptographic key.
    """
    EcP256k = 0
    """
    Represents the elliptic curve key type P-256k.
    """
    Rsa2048 = 1
    """
    Represents the RSA key type with a 2048-bit modulus.
    """
    Rsa3072 = 2
    """
    Represents the RSA key type with a 3072-bit modulus.
    """
    Rsa4096 = 3
    """
    Represents the RSA key type with a 4096-bit modulus.
    """
    Aes128 = 4
    """
    Represents the AES key type with a 128-bit key length.
    """
    Aes256 = 5
    """
    Represents the AES key type with a 256-bit key length.
    """
    Bjj = 6
    """
    Represents the Baby JubJub key type, elliptic curve defined over the large prime subgroup of BN128.
    """
    UNRECOGNIZED = -1

    def __int__(self):
        return self.value

    @staticmethod
    def from_proto(alg: proto.KeyType.ValueType | None) -> KeyType:
        if alg == proto.KeyType.EcP256k:
            return KeyType.EcP256k
        elif alg == proto.KeyType.Rsa2048:
            return KeyType.Rsa2048
        elif alg == proto.KeyType.Rsa3072:
            return KeyType.Rsa3072
        elif alg == proto.KeyType.Rsa4096:
            return KeyType.Rsa4096
        elif alg == proto.KeyType.Aes128:
            return KeyType.Aes128
        elif alg == proto.KeyType.Aes256:
            return KeyType.Aes256
        elif alg == proto.KeyType.Bjj:
            return KeyType.Bjj
        else:
            return KeyType.UNRECOGNIZED

    def to_proto(self) -> proto.LocalKey:
        if self == KeyType.EcP256k:
            return proto.KeyType.EcP256k
        elif self == KeyType.Rsa2048:
            return proto.KeyType.Rsa2048
        elif self == KeyType.Rsa3072:
            return proto.KeyType.Rsa3072
        elif self == KeyType.Rsa4096:
            return proto.KeyType.Rsa4096
        elif self == KeyType.Aes128:
            return proto.KeyType.Aes128
        elif self == KeyType.Aes256:
            return proto.KeyType.Aes256
        elif self == KeyType.Bjj:
            return proto.KeyType.Bjj
        else:
            return proto.KeyType.EcP256k
