package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CredentialOfferBody struct {
	Url         string
	Credentials []CredentialOfferCredential
}

func NewCredentialOfferBodyFromProto(s *proto.CredentialOfferBody) CredentialOfferBody {
	if s == nil {
		return CredentialOfferBody{}
	}

	var credentials []CredentialOfferCredential
	for _, c := range s.Credentials {
		credentials = append(credentials, NewCredentialOfferCredentialsFromProto(c))
	}

	return CredentialOfferBody{
		Url:         s.Url,
		Credentials: credentials,
	}
}

func (c CredentialOfferBody) ToProto() *proto.CredentialOfferBody {
	var credentials []*proto.CredentialOfferBodyCredentials
	for _, a := range c.Credentials {
		credentials = append(credentials, a.ToProto())
	}

	return &proto.CredentialOfferBody{
		Url:         c.Url,
		Credentials: credentials,
	}
}
