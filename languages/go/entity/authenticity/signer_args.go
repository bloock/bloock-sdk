package authenticity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type SignerArgs struct {
	PrivateKey string
	CommonName *string
}

func (s SignerArgs) ToProto() *proto.SignerArgs {
	return &proto.SignerArgs{
		PrivateKey: &s.PrivateKey,
		CommonName: s.CommonName,
	}
}
