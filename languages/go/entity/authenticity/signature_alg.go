package authenticity

type SignatureAlg int32

const (
	ECDSA                      SignatureAlg = iota
	ENS                        SignatureAlg = iota
	BJJ                        SignatureAlg = iota
	UNRECOGNIZED_SIGNATURE_ALG SignatureAlg = -1
)

var (
	SignatureAlgFromProto = map[string]SignatureAlg{
		"ES256K": ECDSA,
		"ENS":    ENS,
		"BJJ": BJJ,
	}
)
