package identityV2

// VerificationParams represents parameters for verification.
type VerificationParams struct {
	Timeout int64
}

// NewVerificationParams creates a new VerificationParams instance with default values.
func NewVerificationParams() VerificationParams {
	return VerificationParams{}
}