package authenticity

// SignatureAlg represents different signature algorithms.
type SignatureAlg int32

// Constants representing specific signature algorithms.
const (
	// ECDSA represents the ECDSA signature algorithm with the "ES256K" name.
	ECDSA                      SignatureAlg = iota
	// ENS represents the ENS (Ethereum Name Service) signature algorithm.
	ENS                        SignatureAlg = iota
	// BJJ represents the BJJ signature algorithm with the "BJJ" name.
	BJJ                        SignatureAlg = iota
	// UNRECOGNIZED_SIGNATURE_ALG represents an unrecognized signature algorithm.
	UNRECOGNIZED_SIGNATURE_ALG SignatureAlg = -1
)

var (
	SignatureAlgFromProto = map[string]SignatureAlg{
		"ES256K": ECDSA,
		"ENS":    ENS,
		"BJJ":    BJJ,
	}
)
