package identity

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type CredentialOffer struct {
	Thid string
	Body CredentialOfferBody
	From string
	To   string
}

func NewCredentialOfferFromProto(s *proto.CredentialOffer) CredentialOffer {
	if s == nil {
		return CredentialOffer{}
	}
	return CredentialOffer{
		Thid: s.Thid,
		Body: NewCredentialOfferBodyFromProto(s.Body),
		From: s.XFrom,
		To:   s.XTo,
	}
}

func (c CredentialOffer) ToProto() *proto.CredentialOffer {
	return &proto.CredentialOffer{
		Thid:  c.Thid,
		Body:  c.Body.ToProto(),
		XFrom: c.From,
		XTo:   c.To,
	}
}

func NewCredentialOfferFromJson(json string) (CredentialOffer, error) {
	bridge := bridge.NewBloockBridge()
	res, err := bridge.Identity().CredentialOfferFromJson(context.Background(), &proto.CredentialOfferFromJsonRequest{
		ConfigData: config.NewConfigDataDefault(),
		Json:       json,
	})

	if err != nil {
		return CredentialOffer{}, err
	}

	if res.Error != nil {
		return CredentialOffer{}, errors.New(res.Error.Message)
	}

	return NewCredentialOfferFromProto(res.GetCredentialOffer()), nil
}

func (c CredentialOffer) ToJson() (string, error) {
	bridge := bridge.NewBloockBridge()
	res, err := bridge.Identity().CredentialOfferToJson(context.Background(), &proto.CredentialOfferToJsonRequest{
		ConfigData:      config.NewConfigDataDefault(),
		CredentialOffer: c.ToProto(),
	})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.GetJson(), nil
}
