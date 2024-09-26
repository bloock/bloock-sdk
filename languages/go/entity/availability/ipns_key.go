package availability

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// IpnsKey represents an object with a key uuid identifier.
type IpnsKey struct {
	KeyID string
}

// NewIpnsKey creates an IpnsKey instance with a key uuid identifier.
func NewIpnsKey(keyID string) IpnsKey {
	return IpnsKey{
		KeyID: keyID,
	}
}

func (s IpnsKey) ToProto() *proto.IpnsKey {
	return &proto.IpnsKey{
		KeyId: s.KeyID,
	}
}

func NewIpnsKeyFromProto(ipnsKey *proto.IpnsKey) *IpnsKey {
	if ipnsKey == nil {
		return nil
	} else {
		return &IpnsKey{
			KeyID: ipnsKey.KeyId,
		}
	}
}
