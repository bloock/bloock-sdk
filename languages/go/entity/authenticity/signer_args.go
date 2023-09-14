package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
)

type SignerArgs struct {
	LocalKey           *key.LocalKey
	ManagedKey         *key.ManagedKey
	ManagedCertificate *key.ManagedCertificate
	PrivateKey         string
	CommonName         *string
}
