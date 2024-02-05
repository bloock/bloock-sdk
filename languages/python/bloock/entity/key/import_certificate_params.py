from __future__ import annotations


class ImportCertificateParams:
    """
    Represents the parameters for importing a certificate.
    """
    password = None

    def __init__(self, password=None) -> None:
        """
        Constructs a new ImportCertificateParams object with the specified password.
        :type password: object
        :rtype: object
        """
        self.password = password
