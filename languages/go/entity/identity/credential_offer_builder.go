package identity

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type CredentialOfferBuilder struct {
	schemaId   string
	holderKey  string
	configData *proto.ConfigData

	booleanAttribute     []BooleanAttribute
	dateAttribute        []DateAttribute
	datetimeAttribute    []DatetimeAttribute
	multichoiceAttribute []MultichoiceAttribute
	numberAttribute      []NumberAttribute
}

func NewCredentialOfferBuilder(schemaId string, holderKey string, configData *proto.ConfigData) CredentialOfferBuilder {
	return CredentialOfferBuilder{
		schemaId:             schemaId,
		holderKey:            holderKey,
		configData:           configData,
		booleanAttribute:     []BooleanAttribute{},
		dateAttribute:        []DateAttribute{},
		datetimeAttribute:    []DatetimeAttribute{},
		multichoiceAttribute: []MultichoiceAttribute{},
		numberAttribute:      []NumberAttribute{},
	}
}

func (c CredentialOfferBuilder) WithBooleanAttribute(key string, value bool) CredentialOfferBuilder {
	c.booleanAttribute = append(c.booleanAttribute, NewBooleanAttribute(key, value))
	return c
}

func (c CredentialOfferBuilder) WithDateAttribute(key string, value int64) CredentialOfferBuilder {
	c.dateAttribute = append(c.dateAttribute, NewDateAttribute(key, value))
	return c
}

func (c CredentialOfferBuilder) WithDatetimeAttribute(key string, value int64) CredentialOfferBuilder {
	c.datetimeAttribute = append(c.datetimeAttribute, NewDatetimeAttribute(key, value))
	return c
}

func (c CredentialOfferBuilder) WithMultichoiceAttribute(key string, value string) CredentialOfferBuilder {
	c.multichoiceAttribute = append(c.multichoiceAttribute, NewMultichoiceAttribute(key, value))
	return c
}

func (c CredentialOfferBuilder) WithNumberAttribute(key string, value int64) CredentialOfferBuilder {
	c.numberAttribute = append(c.numberAttribute, NewNumberAttribute(key, value))
	return c
}

func (c CredentialOfferBuilder) Build() (CredentialOffer, error) {
	bridge := bridge.NewBloockBridge()

	booleanAttributes := make([]*proto.BooleanAttribute, len(c.booleanAttribute))
	for i, b := range c.booleanAttribute {
		booleanAttributes[i] = b.ToProto()
	}

	dateAttributes := make([]*proto.DateAttribute, len(c.dateAttribute))
	for i, b := range c.dateAttribute {
		dateAttributes[i] = b.ToProto()
	}

	datetimeAttributes := make([]*proto.DateTimeAttribute, len(c.datetimeAttribute))
	for i, b := range c.datetimeAttribute {
		datetimeAttributes[i] = b.ToProto()
	}

	multichoiceAttributes := make([]*proto.MultiChoiceAttribute, len(c.multichoiceAttribute))
	for i, b := range c.multichoiceAttribute {
		multichoiceAttributes[i] = b.ToProto()
	}

	numberAttributes := make([]*proto.NumberAttribute, len(c.numberAttribute))
	for i, b := range c.numberAttribute {
		numberAttributes[i] = b.ToProto()
	}

	req := proto.CreateCredentialOfferRequest{
		SchemaId:              c.schemaId,
		HolderKey:             c.holderKey,
		ConfigData:            c.configData,
		BooleanAttributes:     booleanAttributes,
		DateAttributes:        dateAttributes,
		DatetimeAttributes:    datetimeAttributes,
		MultichoiceAttributes: multichoiceAttributes,
		NumberAttributes:      numberAttributes,
	}

	res, err := bridge.Identity().CreateCredentialOffer(context.Background(), &req)
	if err != nil {
		return CredentialOffer{}, err
	}

	if res.Error != nil {
		return CredentialOffer{}, errors.New(res.Error.Message)
	}

	return NewCredentialOfferFromProto(res.GetCredentialOffer()), nil
}
