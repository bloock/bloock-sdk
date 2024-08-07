from __future__ import annotations

import bloock._bridge.proto.bloock_keys_entities_pb2 as proto
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.subject_certificate_params import SubjectCertificateParams


class LocalCertificateParams:
    """
    Represents the parameters for generating a local certificate.
    """
    def __init__(
            self,
            key_type: KeyType,
            subject: SubjectCertificateParams,
            password: str,
            expiration: int = 0,
    ) -> None:
        """
        Constructs an LocalCertificateParams object with the specified parameters.
        :type expiration: object
        :type password: object
        :type subject: object
        :type key_type: object
        :rtype: object
        """
        self.key_type = key_type
        self.subject = subject
        self.password= password
        self.expiration = expiration

    @staticmethod
    def from_proto(certificate: proto.LocalCertificateParams) -> LocalCertificateParams:
        return LocalCertificateParams(
            key_type=KeyType.from_proto(certificate.key_type),
            subject=SubjectCertificateParams.from_proto(certificate.subject),
            password=certificate.password,
            expiration = certificate.expiration
        )

    def to_proto(self) -> proto.LocalCertificateParams:
        return proto.LocalCertificateParams(
            key_type=self.key_type.to_proto(),
            subject=self.subject.to_proto(),
            password=self.password,
            expiration = self.expiration
        )
