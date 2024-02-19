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
func NewHolder(did string, didType DidType, key key.Key) Holder {
	return Holder{
		Did: NewDid(did, didType),
		Key: key,
	}
}