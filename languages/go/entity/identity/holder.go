package identity

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
)

// Holder represents a Holder identity.
type Holder struct {
	Did Did
	Key key.Key
}

// NewHolder returns a new instance of Holder identity for the given parameters.
func NewHolder(did string, didMethod DidMethod, key key.Key) Holder {
	return Holder{
		Did: NewDid(did, didMethod),
		Key: key,
	}
}
