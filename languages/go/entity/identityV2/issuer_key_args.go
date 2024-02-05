package identityV2

import "github.com/bloock/bloock-sdk-go/v2/entity/key"

// IssuerKeyArgs represents arguments for configuring an issuer key.
type IssuerKeyArgs struct {
	LocalKey   *key.LocalKey
	ManagedKey *key.ManagedKey
}
