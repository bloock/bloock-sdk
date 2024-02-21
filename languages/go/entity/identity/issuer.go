package identity

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
)

// Issuer represents an Issuer identity.
type Issuer struct {
	Did Did
	Key key.Key
}

// NewIssuer returns a new instance of Issuer identity for the given parameters.
func NewIssuer(did string, didMethod DidMethod, key key.Key) Issuer {
	return Issuer{
		Did: NewDid(did, didMethod),
		Key: key,
	}
}
