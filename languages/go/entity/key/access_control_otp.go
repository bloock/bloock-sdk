package key

type TotpAccessControl struct {
	Secret        string
	SecretQr      string
	RecoveryCodes []string
}

func New(secret, secretQr string, recoveryCodes []string) TotpAccessControl {
	return TotpAccessControl{
		Secret:        secret,
		SecretQr:      secretQr,
		RecoveryCodes: recoveryCodes,
	}
}
