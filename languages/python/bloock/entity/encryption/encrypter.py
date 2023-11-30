import bloock._bridge.proto.encryption_entities_pb2 as proto
from bloock.entity.key.local_certificate import LocalCertificate
from bloock.entity.key.local_key import LocalKey
from bloock.entity.key.managed_certificate import ManagedCertificate
from bloock.entity.key.managed_key import ManagedKey


class Encrypter:
    local_key = None
    managed_key = None
    managed_certificate = None
    local_certificate = None

    def __init__(self, key, common_name=None) -> None:
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

    def to_proto(self) -> proto.Encrypter:
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

        return proto.Encrypter(
            local_key=local_key,
            managed_key=managed_key,
            managed_certificate=managed_certificate,
            local_certificate=local_certificate,
        )
