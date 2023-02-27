package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CredentialVerification struct {
	Timestamp  int64
	Issuer     string
	Revocation int64
}

func NewCredentialVerificationFromProto(s *proto.CredentialVerification) CredentialVerification {
	if s == nil {
		return CredentialVerification{}
	}
	return CredentialVerification{
		Timestamp:  s.Timestamp,
		Issuer:     s.Issuer,
		Revocation: s.Revocation,
	}
}

func (c CredentialVerification) ToProto() *proto.CredentialVerification {
	return &proto.CredentialVerification{
		Timestamp:  c.Timestamp,
		Issuer:     c.Issuer,
		Revocation: c.Revocation,
	}
}
