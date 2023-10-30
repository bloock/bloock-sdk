from __future__ import annotations

import bloock._bridge.proto.keys_entities_pb2 as proto


class LocalCertificate:
    def __init__(
            self,
            pkcs12: bytes,
            password: str,
    ) -> None:
        self.pkcs12 = pkcs12
        self.password = password

    @staticmethod
    def from_proto(certificate: proto.LocalCertificate) -> LocalCertificate:
        return LocalCertificate(
            pkcs12=certificate.pkcs12,
            password=certificate.password,
        )

    def to_proto(self) -> proto.LocalCertificate:
        return proto.LocalCertificate(
            pkcs12=self.pkcs12,
            password=self.password,
        )
