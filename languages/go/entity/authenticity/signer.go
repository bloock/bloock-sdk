package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type Signer struct {
	Args SignerArgs
}

func NewSigner(args SignerArgs) Signer {
	return Signer{
		Args: args,
	}
}

func (s Signer) ToProto() *proto.Signer {
	var localKey *proto.LocalKey
	if s.Args.LocalKey != nil {
		localKey = s.Args.LocalKey.ToProto()
	}

	var managedKey *proto.ManagedKey
	if s.Args.ManagedKey != nil {
		managedKey = s.Args.ManagedKey.ToProto()
	}

	var managedCertificate *proto.ManagedCertificate
	if s.Args.ManagedCertificate != nil {
		managedCertificate = s.Args.ManagedCertificate.ToProto()
	}

	var localCertificate *proto.LocalCertificate
	if s.Args.LocalCertificate != nil {
		localCertificate = s.Args.LocalCertificate.ToProto()
	}

	return &proto.Signer{
		LocalKey:           localKey,
		ManagedKey:         managedKey,
		ManagedCertificate: managedCertificate,
		LocalCertificate:   localCertificate,
		CommonName:         s.Args.CommonName,
	}
}
