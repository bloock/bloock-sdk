package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// CredentialStatus represents the status information for a credential, including its ID, revocation nonce, and type.
type CredentialStatus struct {
	Id              string
	RevocationNonce int64
	Type            string
}

func NewCredentialStatusFromProto(s *proto.CredentialStatus) CredentialStatus {
	if s == nil {
		return CredentialStatus{}
	}
	return CredentialStatus{
		Id:              s.Id,
		RevocationNonce: s.RevocationNonce,
		Type:            s.Type,
	}
}

func (c CredentialStatus) ToProto() *proto.CredentialStatus {
	return &proto.CredentialStatus{
		Id:              c.Id,
		RevocationNonce: c.RevocationNonce,
		Type:            c.Type,
	}
}
