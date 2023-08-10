package identityV2

import "github.com/bloock/bloock-sdk-go/v2/entity/key"

type IssuerKeyArgs struct {
	LocalKey   *key.LocalKey
	ManagedKey *key.ManagedKey
}
