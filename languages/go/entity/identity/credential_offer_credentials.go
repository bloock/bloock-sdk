package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CredentialOfferCredential struct {
	Id          string
	Description string
}

func NewCredentialOfferCredentialsFromProto(s *proto.CredentialOfferBodyCredentials) CredentialOfferCredential {
	if s == nil {
		return CredentialOfferCredential{}
	}
	return CredentialOfferCredential{
		Id:          s.Id,
		Description: s.Description,
	}
}

func (c CredentialOfferCredential) ToProto() *proto.CredentialOfferBodyCredentials {
	return &proto.CredentialOfferBodyCredentials{
		Id:          c.Id,
		Description: c.Description,
	}
}
