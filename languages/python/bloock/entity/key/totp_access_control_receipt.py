from typing import List

class TotpAccessControlReceipt:
    def __init__(self, secret: str, secret_qr: str, recovery_codes: List[str]) -> None:
        self.secret = secret
        self.secret_qr = secret_qr
        self.recovery_codes = recovery_codes