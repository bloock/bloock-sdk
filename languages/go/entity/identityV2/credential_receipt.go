package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CredentialReceipt struct {
	Credential   Credential
	CredentialId string
	AnchorID     int64
}

func NewCredentialReceiptFromProto(s *proto.CredentialReceiptV2) CredentialReceipt {
	if s == nil {
		return CredentialReceipt{}
	}
	receipt := CredentialReceipt{CredentialId: s.CredentialId, Credential: NewCredentialFromProto(s.Credential)}
	if s.AnchorId != nil {
		receipt.AnchorID = *s.AnchorId
	}
	return receipt
}

func (c CredentialReceipt) ToProto() *proto.CredentialReceiptV2 {
	return &proto.CredentialReceiptV2{
		Credential:   c.Credential.ToProto(),
		CredentialId: c.CredentialId,
		AnchorId:     &c.AnchorID,
	}
}
