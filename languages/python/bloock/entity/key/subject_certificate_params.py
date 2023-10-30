from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto


class SubjectCertificateParams:
    def __init__(
            self,
            common_name: str,
            organization: str = None,
            organization_unit: str = None,
            location: str = None,
            state: str = None,
            country: str = None,
    ) -> None:
        self.common_name = common_name
        self.organization = organization
        self.organization_unit = organization_unit
        self.location = location
        self.state = state
        self.country = country

    @staticmethod
    def from_proto(key: proto.CertificateSubject) -> SubjectCertificateParams:
        return SubjectCertificateParams(
            common_name=key.common_name,
            organization=key.organization,
            organization_unit=key.organizational_unit,
            location=key.location,
            state=key.state,
            country=key.country,
        )

    def to_proto(self) -> proto.CertificateSubject:
        return proto.CertificateSubject(
            common_name=self.common_name,
            organization=self.organization if self.organization is not None else None,
            organizational_unit=self.organization_unit if self.organization_unit is not None else None,
            location=self.location if self.location is not None else None,
            state=self.state if self.state is not None else None,
            country=self.country if self.country is not None else None,
        )
