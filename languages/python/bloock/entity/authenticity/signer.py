import bloock._bridge.proto.authenticity_entities_pb2 as proto
from bloock.entity.key.local_certificate import LocalCertificate
from bloock.entity.key.local_key import LocalKey
from bloock.entity.key.managed_certificate import ManagedCertificate
from bloock.entity.key.managed_key import ManagedKey
from bloock.entity.key.access_control import AccessControl
from bloock.entity.authenticity.hash_alg import HashAlg


class Signer:
    """
    Represents a signer with various key types and additional configurations.
    """
    local_key = None
    managed_key = None
    managed_certificate = None
    local_certificate = None

    hash_alg = None
    access_control = None

    def __init__(self, key, hash_alg = None, access_control = None) -> None:
        """
        Creates a Signer instance with a local key, managed key, local certificate or managed certificate.
        :type access_control: object
        :type hash_alg: object
        :type key: object
        :rtype: object
        """
        if isinstance(key, LocalKey):
            self.local_key = key
        elif isinstance(key, ManagedKey):
            self.managed_key = key
        elif isinstance(key, ManagedCertificate):
            self.managed_certificate = key
        elif isinstance(key, LocalCertificate):
            self.local_certificate = key
        else:
            raise Exception(
                "Invalid key provided. Must be of type LocalKey or ManagedKey")
        
        if isinstance(hash_alg, HashAlg):
            self.hash_alg = hash_alg
        if isinstance(access_control, AccessControl):
            self.access_control = access_control

    def to_proto(self) -> proto.Signer:
        local_key = None
        if self.local_key is not None:
            local_key = self.local_key.to_proto()

        managed_key = None
        if self.managed_key is not None:
            managed_key = self.managed_key.to_proto()

        managed_certificate = None
        if self.managed_certificate is not None:
            managed_certificate = self.managed_certificate.to_proto()

        local_certificate = None
        if self.local_certificate is not None:
            local_certificate = self.local_certificate.to_proto()

        hash_alg = None
        if self.hash_alg is not None:
            hash_alg = self.hash_alg.to_proto()

        access_control = None
        if self.access_control is not None:
            access_control = self.access_control.to_proto()

        return proto.Signer(
            local_key=local_key,
            managed_key=managed_key,
            managed_certificate=managed_certificate,
            local_certificate=local_certificate,
            hash_alg=hash_alg,
            access_control=access_control,
        )
