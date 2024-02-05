package key

// TotpAccessControlReceipt represents a receipt for a Time-based One-Time Password (TOTP) access control.
type TotpAccessControlReceipt struct {
	Secret        string
	SecretQr      string
	RecoveryCodes []string
}

// New creates a new TotpAccessControlReceipt with the provided secret, secret QR code, and recovery codes.
func New(secret, secretQr string, recoveryCodes []string) TotpAccessControlReceipt {
	return TotpAccessControlReceipt{
		Secret:        secret,
		SecretQr:      secretQr,
		RecoveryCodes: recoveryCodes,
	}
}
