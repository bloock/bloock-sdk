from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto


class SubjectCertificateParams:
    """
    Represents parameters for generating a subject certificate.
    """
    def __init__(
            self,
            common_name: str,
            organization: str = None,
            organization_unit: str = None,
            location: str = None,
            state: str = None,
            country: str = None,
    ) -> None:
        """
        Constructs a SubjectCertificateParams object with the specified parameters.
        :type country: object
        :type state: object
        :type location: object
        :type organization_unit: object
        :type organization: object
        :type common_name: object
        :rtype: object
        """
        self.common_name = common_name
        """
        Is the common name (CN) for the certificate. Required.
        """
        self.organization = organization
        """
        Is the organization (O) for the certificate. (Optional)
        """
        self.organization_unit = organization_unit
        """
        Is the organizational unit (OU) for the certificate. (Optional)
        """
        self.location = location
        """
        Is the location (L) for the certificate. (Optional)
        """
        self.state = state
        """
        Is the state or province (ST) for the certificate. (Optional)
        """
        self.country = country
        """
        Is the country (C) for the certificate. (Optional)
        """

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
