from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.subject_certificate_params import SubjectCertificateParams


class ManagedCertificateParams:
    """
    Represents parameters for creating a managed certificate.
    """
    def __init__(
            self,
            key_type: KeyType,
            subject: SubjectCertificateParams,
            expiration: int = 0,
    ) -> None:
        """
        Constructs a ManagedCertificateParams object with the specified parameters.
        :type expiration: object
        :type subject: object
        :type key_type: object
        :rtype: object
        """
        self.key_type = key_type
        """
        Is the type of the key.
        """
        self.subject = subject
        """
        Represents the subject details of the certificate.
        """
        self.expiration = expiration
        """
        Is the number of months until the certificate expiration.
        """

    @staticmethod
    def from_proto(key: proto.ManagedCertificateParams) -> ManagedCertificateParams:
        return ManagedCertificateParams(
            key_type=KeyType.from_proto(key.key_type),
            subject=SubjectCertificateParams.fromProto(
                key.cn, key.c, key.ou, key.o),
            expiration=key.expiration
        )

    def to_proto(self) -> proto.ManagedCertificateParams:
        return proto.ManagedCertificateParams(
            key_type=self.key_type.to_proto(),
            subject=self.subject.to_proto(),
            expiration=self.expiration
        )
