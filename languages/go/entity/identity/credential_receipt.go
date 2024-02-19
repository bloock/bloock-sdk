package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// CredentialReceipt represents a receipt for a credential, including the credential itself, its ID, and type.
type CredentialReceipt struct {
	Credential     Credential
	CredentialId   string
	CredentialType string
}

func NewCredentialReceiptFromProto(s *proto.CredentialReceipt) CredentialReceipt {
	if s == nil {
		return CredentialReceipt{}
	}

	return CredentialReceipt{CredentialId: s.CredentialId, CredentialType: s.CredentialType, Credential: NewCredentialFromProto(s.Credential)}
}

func (c CredentialReceipt) ToProto() *proto.CredentialReceipt {
	return &proto.CredentialReceipt{
		Credential:     c.Credential.ToProto(),
		CredentialId:   c.CredentialId,
		CredentialType: c.CredentialType,
	}
}
