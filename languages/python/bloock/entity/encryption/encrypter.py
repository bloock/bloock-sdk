import bloock._bridge.proto.encryption_entities_pb2 as proto
from bloock.entity.key.local_certificate import LocalCertificate
from bloock.entity.key.local_key import LocalKey
from bloock.entity.key.managed_certificate import ManagedCertificate
from bloock.entity.key.managed_key import ManagedKey
from bloock.entity.key.access_control import AccessControl


class Encrypter:
    local_key = None
    managed_key = None
    managed_certificate = None
    local_certificate = None
    access_control = None

    def __init__(self, key, access_control = None) -> None:
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
        if isinstance(access_control, AccessControl):
            self.access_control = access_control

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

        access_control = None
        if self.access_control is not None:
            access_control = self.access_control.to_proto()

        return proto.Encrypter(
            local_key=local_key,
            managed_key=managed_key,
            managed_certificate=managed_certificate,
            local_certificate=local_certificate,
            access_control=access_control,
        )
