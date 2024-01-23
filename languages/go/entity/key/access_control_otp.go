package key

type OtpAccessControl struct {
	Secret        string
	SecretQr      string
	RecoveryCodes []string
}

func New(secret, secretQr string, recoveryCodes []string) OtpAccessControl {
	return OtpAccessControl{
		Secret:        secret,
		SecretQr:      secretQr,
		RecoveryCodes: recoveryCodes,
	}
}
