package identity

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type CredentialBuilder struct {
	schemaId   string
	holderKey  string
	configData *proto.ConfigData

	booleanAttribute  []BooleanAttribute
	dateAttribute     []DateAttribute
	datetimeAttribute []DatetimeAttribute
	stringAttribute   []StringAttribute
	numberAttribute   []NumberAttribute
}

func NewCredentialBuilder(schemaId string, holderKey string, configData *proto.ConfigData) CredentialBuilder {
	return CredentialBuilder{
		schemaId:          schemaId,
		holderKey:         holderKey,
		configData:        configData,
		booleanAttribute:  []BooleanAttribute{},
		dateAttribute:     []DateAttribute{},
		datetimeAttribute: []DatetimeAttribute{},
		stringAttribute:   []StringAttribute{},
		numberAttribute:   []NumberAttribute{},
	}
}

func (c CredentialBuilder) WithBooleanAttribute(key string, value bool) CredentialBuilder {
	c.booleanAttribute = append(c.booleanAttribute, NewBooleanAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithDateAttribute(key string, value int64) CredentialBuilder {
	c.dateAttribute = append(c.dateAttribute, NewDateAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithDatetimeAttribute(key string, value int64) CredentialBuilder {
	c.datetimeAttribute = append(c.datetimeAttribute, NewDatetimeAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithStringAttribute(key string, value string) CredentialBuilder {
	c.stringAttribute = append(c.stringAttribute, NewStringAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithNumberAttribute(key string, value int64) CredentialBuilder {
	c.numberAttribute = append(c.numberAttribute, NewNumberAttribute(key, value))
	return c
}

func (c CredentialBuilder) Build() (CredentialReceipt, error) {
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

	stringAttributes := make([]*proto.StringAttribute, len(c.stringAttribute))
	for i, b := range c.stringAttribute {
		stringAttributes[i] = b.ToProto()
	}

	numberAttributes := make([]*proto.NumberAttribute, len(c.numberAttribute))
	for i, b := range c.numberAttribute {
		numberAttributes[i] = b.ToProto()
	}

	req := proto.CreateCredentialRequest{
		SchemaId:           c.schemaId,
		HolderKey:          c.holderKey,
		ConfigData:         c.configData,
		BooleanAttributes:  booleanAttributes,
		DateAttributes:     dateAttributes,
		DatetimeAttributes: datetimeAttributes,
		StringAttributes:   stringAttributes,
		NumberAttributes:   numberAttributes,
	}

	res, err := bridge.Identity().CreateCredential(context.Background(), &req)
	if err != nil {
		return CredentialReceipt{}, err
	}

	if res.Error != nil {
		return CredentialReceipt{}, errors.New(res.Error.Message)
	}

	return NewCredentialReceiptFromProto(res.GetCredentialReceipt()), nil
}
