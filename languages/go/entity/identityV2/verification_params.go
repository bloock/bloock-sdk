package identityV2

type VerificationParams struct {
	Timeout int64
}

func NewVerificationParams() VerificationParams {
	return VerificationParams{}
}