from __future__ import annotations


class ImportCertificateParams:
    password = None

    def __init__(self, password=None) -> None:
        self.password = password
