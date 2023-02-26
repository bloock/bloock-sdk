package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CredentialOffer struct {
	json string
}

func NewCredentialOfferFromProto(s *proto.CredentialOffer) CredentialOffer {
	if s == nil {
		return CredentialOffer{}
	}
	return CredentialOffer{
		json: s.Json,
	}
}

func (c CredentialOffer) ToProto() *proto.CredentialOffer {
	return &proto.CredentialOffer{
		Json: c.json,
	}
}

func NewCredentialOfferFromJson(json string) CredentialOffer {
	return CredentialOffer{
		json: json,
	}
}

func (c CredentialOffer) ToJson() string {
	return c.json
}
