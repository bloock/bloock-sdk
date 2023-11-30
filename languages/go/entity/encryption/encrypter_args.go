package encryption

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
)

type EncrypterArgs struct {
	LocalKey           *key.LocalKey
	ManagedKey         *key.ManagedKey
	ManagedCertificate *key.ManagedCertificate
	LocalCertificate   *key.LocalCertificate
}
