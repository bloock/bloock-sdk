package key

type TotpAccessControlReceipt struct {
	Secret        string
	SecretQr      string
	RecoveryCodes []string
}

func New(secret, secretQr string, recoveryCodes []string) TotpAccessControlReceipt {
	return TotpAccessControlReceipt{
		Secret:        secret,
		SecretQr:      secretQr,
		RecoveryCodes: recoveryCodes,
	}
}
