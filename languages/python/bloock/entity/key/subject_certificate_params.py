from __future__ import annotations


class SubjectCertificateParams:
    def __init__(
            self,
            cn: str,
            c: str,
            ou: str,
            o: str,
    ) -> None:
        self.cn = cn
        self.c = c
        self.ou = ou
        self.o = o
