from typing import List

class TotpAccessControlReceipt:
    """
    Represents a receipt for a Time-based One-Time Password (TOTP) access control.
    """
    def __init__(self, secret: str, secret_qr: str, recovery_codes: List[str]) -> None:
        """
        Creates a new TotpAccessControlReceipt with the provided secret, secret QR code, and recovery codes.
        :type recovery_codes: object
        :type secret_qr: object
        :type secret: object
        :rtype: object
        """
        self.secret = secret
        self.secret_qr = secret_qr
        self.recovery_codes = recovery_codes