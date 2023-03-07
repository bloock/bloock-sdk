package encryption

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
)

type DecrypterArgs struct {
	Key        string
	LocalKey   *key.LocalKey
	ManagedKey *key.ManagedKey
}
