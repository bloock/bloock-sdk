import bloock._bridge.proto.bloock_availability_entities_pb2 as proto
from bloock.entity.key.managed_certificate import ManagedCertificate
from bloock.entity.key.managed_key import ManagedKey


class IpnsKey:
    """
    Represents a IpnsKey with various key types.
    """
    managed_key = None
    managed_certificate = None

    def __init__(self, key) -> None:
        """
        Creates a IpnsKey instance with a managed key managed certificate.
        :type key: object
        :rtype: object
        """
        if isinstance(key, ManagedKey):
            self.managed_key = key
        elif isinstance(key, ManagedCertificate):
            self.managed_certificate = key
        else:
            raise Exception(
                "Invalid key provided. Must be of type ManagedKey or ManagedCertificate")

    def to_proto(self) -> proto.IpnsKey:

        managed_key = None
        if self.managed_key is not None:
            managed_key = self.managed_key.to_proto()

        managed_certificate = None
        if self.managed_certificate is not None:
            managed_certificate = self.managed_certificate.to_proto()

        return proto.IpnsKey(
            managed_key=managed_key,
            managed_certificate=managed_certificate,
        )