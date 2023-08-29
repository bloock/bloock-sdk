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

	stringAttributeDescriptor      []StringAttributeDescriptor
	integerAttributeDescriptor     []IntegerAttributeDescriptor
	decimalAttributeDescriptor     []DecimalAttributeDescriptor
	booleanAttributeDescriptor     []BooleanAttributeDescriptor
	dateAttributeDescriptor        []DateAttributeDescriptor
	datetimeAttributeDescriptor    []DatetimeAttributeDescriptor
	stringEnumAttributeDescriptor  []StringEnumAttributeDescriptor
	integerEnumAttributeDescriptor []IntegerEnumAttributeDescriptor
	decimalEnumAttributeDescriptor []DecimalEnumAttributeDescriptor
}

func NewSchemaBuilder(displayName string, schemaType, version, description, issuerDid string, configData *proto.ConfigData) SchemaBuilder {
	return SchemaBuilder{
		displayName:                    displayName,
		schemaType:                     schemaType,
		version:                        version,
		description:                    description,
		issuerDid:                      issuerDid,
		configData:                     configData,
		stringAttributeDescriptor:      []StringAttributeDescriptor{},
		integerAttributeDescriptor:     []IntegerAttributeDescriptor{},
		decimalAttributeDescriptor:     []DecimalAttributeDescriptor{},
		booleanAttributeDescriptor:     []BooleanAttributeDescriptor{},
		dateAttributeDescriptor:        []DateAttributeDescriptor{},
		datetimeAttributeDescriptor:    []DatetimeAttributeDescriptor{},
		stringEnumAttributeDescriptor:  []StringEnumAttributeDescriptor{},
		integerEnumAttributeDescriptor: []IntegerEnumAttributeDescriptor{},
		decimalEnumAttributeDescriptor: []DecimalEnumAttributeDescriptor{},
	}
}

func (c SchemaBuilder) AddStringAttribute(name string, id string, description string, required bool) SchemaBuilder {
	c.stringAttributeDescriptor = append(c.stringAttributeDescriptor, NewStringAttributeDescriptor(name, id, description, required))
	return c
}

func (c SchemaBuilder) AddIntegerAttribute(name string, id string, description string, required bool) SchemaBuilder {
	c.integerAttributeDescriptor = append(c.integerAttributeDescriptor, NewIntegerAttributeDescriptor(name, id, description, required))
	return c
}

func (c SchemaBuilder) AddDecimalAttribute(name string, id string, description string, required bool) SchemaBuilder {
	c.decimalAttributeDescriptor = append(c.decimalAttributeDescriptor, NewDecimalAttributeDescriptor(name, id, description, required))
	return c
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

func (c SchemaBuilder) AddStringEnumAttribute(name string, id string, description string, required bool, enum []string) SchemaBuilder {
	c.stringEnumAttributeDescriptor = append(c.stringEnumAttributeDescriptor, NewStringEnumAttributeDescriptor(name, id, description, required, enum))
	return c
}

func (c SchemaBuilder) AddIntegerEnumAttribute(name string, id string, description string, required bool, enum []int64) SchemaBuilder {
	c.integerEnumAttributeDescriptor = append(c.integerEnumAttributeDescriptor, NewIntegerEnumAttributeDescriptor(name, id, description, required, enum))
	return c
}

func (c SchemaBuilder) AddDecimalEnumAttribute(name string, id string, description string, required bool, enum []float64) SchemaBuilder {
	c.decimalEnumAttributeDescriptor = append(c.decimalEnumAttributeDescriptor, NewDecimalEnumAttributeDescriptor(name, id, description, required, enum))
	return c
}

func (c SchemaBuilder) Build() (Schema, error) {
	bridge := bridge.NewBloockBridge()

	stringAttributesDescriptor := make([]*proto.StringAttributeDefinitionV2, len(c.stringAttributeDescriptor))
	for i, b := range c.stringAttributeDescriptor {
		stringAttributesDescriptor[i] = b.ToProto()
	}

	integerAttributesDescriptor := make([]*proto.IntegerAttributeDefinitionV2, len(c.integerAttributeDescriptor))
	for i, b := range c.integerAttributeDescriptor {
		integerAttributesDescriptor[i] = b.ToProto()
	}

	decimalAttributesDescriptor := make([]*proto.DecimalAttributeDefinitionV2, len(c.decimalAttributeDescriptor))
	for i, b := range c.decimalAttributeDescriptor {
		decimalAttributesDescriptor[i] = b.ToProto()
	}

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

	stringEnumAttributesDescriptor := make([]*proto.StringEnumAttributeDefinitionV2, len(c.stringEnumAttributeDescriptor))
	for i, b := range c.stringEnumAttributeDescriptor {
		stringEnumAttributesDescriptor[i] = b.ToProto()
	}

	integerEnumAttributesDescriptor := make([]*proto.IntegerEnumAttributeDefinitionV2, len(c.integerEnumAttributeDescriptor))
	for i, b := range c.integerEnumAttributeDescriptor {
		integerEnumAttributesDescriptor[i] = b.ToProto()
	}

	decimalEnumAttributesDescriptor := make([]*proto.DecimalEnumAttributeDefinitionV2, len(c.decimalEnumAttributeDescriptor))
	for i, b := range c.decimalEnumAttributeDescriptor {
		decimalEnumAttributesDescriptor[i] = b.ToProto()
	}

	req := proto.BuildSchemaRequestV2{
		DisplayName:           c.displayName,
		SchemaType:            c.schemaType,
		Version:               c.version,
		Description:           c.description,
		IssuerDid:             c.issuerDid,
		ConfigData:            c.configData,
		StringAttributes:      stringAttributesDescriptor,
		IntegerAttributes:     integerAttributesDescriptor,
		DecimalAttributes:     decimalAttributesDescriptor,
		BooleanAttributes:     booleanAttributesDescriptor,
		DateAttributes:        dateAttributesDescriptor,
		DatetimeAttributes:    datetimeAttributesDescriptor,
		StringEnumAttributes:  stringEnumAttributesDescriptor,
		IntegerEnumAttributes: integerEnumAttributesDescriptor,
		DecimalEnumAttributes: decimalEnumAttributesDescriptor,
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
