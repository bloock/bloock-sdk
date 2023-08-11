package identityV2

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type SchemaBuilder struct {
	displayName string
	schemaType  string
	version     string
	description string
	issuerDid   string
	configData  *proto.ConfigData

	booleanAttributeDescriptor  []BooleanAttributeDescriptor
	dateAttributeDescriptor     []DateAttributeDescriptor
	datetimeAttributeDescriptor []DatetimeAttributeDescriptor
	stringAttributeDescriptor   []StringAttributeDescriptor
	numberAttributeDescriptor   []NumberAttributeDescriptor
}

func NewSchemaBuilder(displayName string, schemaType, version, description, issuerDid string, configData *proto.ConfigData) SchemaBuilder {
	return SchemaBuilder{
		displayName:                 displayName,
		schemaType:                  schemaType,
		version:                     version,
		description:                 description,
		issuerDid:                   issuerDid,
		configData:                  configData,
		booleanAttributeDescriptor:  []BooleanAttributeDescriptor{},
		dateAttributeDescriptor:     []DateAttributeDescriptor{},
		datetimeAttributeDescriptor: []DatetimeAttributeDescriptor{},
		stringAttributeDescriptor:   []StringAttributeDescriptor{},
		numberAttributeDescriptor:   []NumberAttributeDescriptor{},
	}
}

func (c SchemaBuilder) AddBooleanAttribute(name string, id string, description string, required bool) SchemaBuilder {
	c.booleanAttributeDescriptor = append(c.booleanAttributeDescriptor, NewBooleanAttributeDescriptor(name, id, description, required))
	return c
}

func (c SchemaBuilder) AddDateAttribute(name string, id string, description string, required bool) SchemaBuilder {
	c.dateAttributeDescriptor = append(c.dateAttributeDescriptor, NewDateAttributeDescriptor(name, id, description, required))
	return c
}

func (c SchemaBuilder) AddDatetimeAttribute(name string, id string, description string, required bool) SchemaBuilder {
	c.datetimeAttributeDescriptor = append(c.datetimeAttributeDescriptor, NewDatetimeAttributeDescriptor(name, id, description, required))
	return c
}

func (c SchemaBuilder) AddStringAttribute(name string, id string, description string, required bool) SchemaBuilder {
	c.stringAttributeDescriptor = append(c.stringAttributeDescriptor, NewStringAttributeDescriptor(name, id, description, required))
	return c
}

func (c SchemaBuilder) AddNumberAttribute(name string, id string, description string, required bool) SchemaBuilder {
	c.numberAttributeDescriptor = append(c.numberAttributeDescriptor, NewNumberAttributeDescriptor(name, id, description, required))
	return c
}

func (c SchemaBuilder) Build() (Schema, error) {
	bridge := bridge.NewBloockBridge()

	booleanAttributesDescriptor := make([]*proto.BooleanAttributeDefinitionV2, len(c.booleanAttributeDescriptor))
	for i, b := range c.booleanAttributeDescriptor {
		booleanAttributesDescriptor[i] = b.ToProto()
	}

	dateAttributesDescriptor := make([]*proto.DateAttributeDefinitionV2, len(c.dateAttributeDescriptor))
	for i, b := range c.dateAttributeDescriptor {
		dateAttributesDescriptor[i] = b.ToProto()
	}

	datetimeAttributesDescriptor := make([]*proto.DateTimeAttributeDefinitionV2, len(c.datetimeAttributeDescriptor))
	for i, b := range c.datetimeAttributeDescriptor {
		datetimeAttributesDescriptor[i] = b.ToProto()
	}

	stringAttributesDescriptor := make([]*proto.StringAttributeDefinitionV2, len(c.stringAttributeDescriptor))
	for i, b := range c.stringAttributeDescriptor {
		stringAttributesDescriptor[i] = b.ToProto()
	}

	numberAttributesDescriptor := make([]*proto.NumberAttributeDefinitionV2, len(c.numberAttributeDescriptor))
	for i, b := range c.numberAttributeDescriptor {
		numberAttributesDescriptor[i] = b.ToProto()
	}

	req := proto.BuildSchemaRequestV2{
		DisplayName:        c.displayName,
		SchemaType:         c.schemaType,
		Version:            c.version,
		Description:        c.description,
		IssuerDid:          c.issuerDid,
		ConfigData:         c.configData,
		BooleanAttributes:  booleanAttributesDescriptor,
		DateAttributes:     dateAttributesDescriptor,
		DatetimeAttributes: datetimeAttributesDescriptor,
		StringAttributes:   stringAttributesDescriptor,
		NumberAttributes:   numberAttributesDescriptor,
	}

	res, err := bridge.IdentityV2().BuildSchema(context.Background(), &req)
	if err != nil {
		return Schema{}, err
	}

	if res.Error != nil {
		return Schema{}, errors.New(res.Error.Message)
	}

	return NewSchemaFromProto(res.GetSchema()), nil
}
