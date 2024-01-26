from __future__ import annotations

from bloock.entity.key.managed_certificate import ManagedCertificate
from bloock.entity.key.managed_key import ManagedKey


class Managed:
    managed_key = None
    managed_certificate = None

    def __init__(self, key: ManagedKey | ManagedCertificate) -> None:
        if isinstance(key, ManagedKey):
            self.managed_key = key
        elif isinstance(key, ManagedCertificate):
            self.managed_certificate = key
        else:
            raise Exception(
                "Invalid key provided. Must be of type ManagedKey")
