package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
)

type SignerArgs struct {
	LocalKey   *key.LocalKey
	ManagedKey *key.ManagedKey
	PrivateKey string
	CommonName *string
}
