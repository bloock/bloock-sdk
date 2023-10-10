from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto
from bloock.entity.key.key_type import KeyType
from bloock.entity.key.subject_certificate_params import SubjectCertificateParams


class LocalCertificateArgs:
    def __init__(
            self,
            key_type: KeyType,
            subject: SubjectCertificateParams,
            password: str,
    ) -> None:
        self.key_type = key_type
        self.subject = subject
        self.password= password

    @staticmethod
    def from_proto(certificate: proto.LocalCertificateParams) -> LocalCertificateArgs:
        return LocalCertificateArgs(
            key_type=KeyType.from_proto(certificate.key_type),
            subject=SubjectCertificateParams.from_proto(certificate.subject),
            password=certificate.password
        )

    def to_proto(self) -> proto.LocalCertificateParams:
        return proto.LocalCertificateParams(
            key_type=self.key_type.to_proto(),
            subject=self.subject.to_proto(),
            password=self.password
        )