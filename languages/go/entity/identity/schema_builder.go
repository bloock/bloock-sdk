package identity

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type SchemaBuilder struct {
	displayName   string
	technicalName string
	configData    *proto.ConfigData

	booleanAttributeDescriptor  []BooleanAttributeDescriptor
	dateAttributeDescriptor     []DateAttributeDescriptor
	datetimeAttributeDescriptor []DatetimeAttributeDescriptor
	stringAttributeDescriptor   []StringAttributeDescriptor
	numberAttributeDescriptor   []NumberAttributeDescriptor
}

func NewSchemaBuilder(displayName string, technicalName string, configData *proto.ConfigData) SchemaBuilder {
	return SchemaBuilder{
		displayName:                 displayName,
		technicalName:               technicalName,
		configData:                  configData,
		booleanAttributeDescriptor:  []BooleanAttributeDescriptor{},
		dateAttributeDescriptor:     []DateAttributeDescriptor{},
		datetimeAttributeDescriptor: []DatetimeAttributeDescriptor{},
		stringAttributeDescriptor:   []StringAttributeDescriptor{},
		numberAttributeDescriptor:   []NumberAttributeDescriptor{},
	}
}

func (c SchemaBuilder) AddBooleanAttribute(name string, technicalName string, description string) SchemaBuilder {
	c.booleanAttributeDescriptor = append(c.booleanAttributeDescriptor, NewBooleanAttributeDescriptor(name, technicalName, description))
	return c
}

func (c SchemaBuilder) AddDateAttribute(name string, technicalName string, description string) SchemaBuilder {
	c.dateAttributeDescriptor = append(c.dateAttributeDescriptor, NewDateAttributeDescriptor(name, technicalName, description))
	return c
}

func (c SchemaBuilder) AddDatetimeAttribute(name string, technicalName string, description string) SchemaBuilder {
	c.datetimeAttributeDescriptor = append(c.datetimeAttributeDescriptor, NewDatetimeAttributeDescriptor(name, technicalName, description))
	return c
}

func (c SchemaBuilder) AddStringAttribute(name string, technicalName string, description string) SchemaBuilder {
	c.stringAttributeDescriptor = append(c.stringAttributeDescriptor, NewStringAttributeDescriptor(name, technicalName, description))
	return c
}

func (c SchemaBuilder) AddNumberAttribute(name string, technicalName string, description string) SchemaBuilder {
	c.numberAttributeDescriptor = append(c.numberAttributeDescriptor, NewNumberAttributeDescriptor(name, technicalName, description))
	return c
}

func (c SchemaBuilder) Build() (Schema, error) {
	bridge := bridge.NewBloockBridge()

	booleanAttributesDescriptor := make([]*proto.BooleanAttributeDefinition, len(c.booleanAttributeDescriptor))
	for i, b := range c.booleanAttributeDescriptor {
		booleanAttributesDescriptor[i] = b.ToProto()
	}

	dateAttributesDescriptor := make([]*proto.DateAttributeDefinition, len(c.dateAttributeDescriptor))
	for i, b := range c.dateAttributeDescriptor {
		dateAttributesDescriptor[i] = b.ToProto()
	}

	datetimeAttributesDescriptor := make([]*proto.DateTimeAttributeDefinition, len(c.datetimeAttributeDescriptor))
	for i, b := range c.datetimeAttributeDescriptor {
		datetimeAttributesDescriptor[i] = b.ToProto()
	}

	stringAttributesDescriptor := make([]*proto.StringAttributeDefinition, len(c.stringAttributeDescriptor))
	for i, b := range c.stringAttributeDescriptor {
		stringAttributesDescriptor[i] = b.ToProto()
	}

	numberAttributesDescriptor := make([]*proto.NumberAttributeDefinition, len(c.numberAttributeDescriptor))
	for i, b := range c.numberAttributeDescriptor {
		numberAttributesDescriptor[i] = b.ToProto()
	}

	req := proto.BuildSchemaRequest{
		DisplayName:        c.displayName,
		TechnicalName:      c.technicalName,
		ConfigData:         c.configData,
		BooleanAttributes:  booleanAttributesDescriptor,
		DateAttributes:     dateAttributesDescriptor,
		DatetimeAttributes: datetimeAttributesDescriptor,
		StringAttributes:   stringAttributesDescriptor,
		NumberAttributes:   numberAttributesDescriptor,
	}

	res, err := bridge.Identity().BuildSchema(context.Background(), &req)
	if err != nil {
		return Schema{}, err
	}

	if res.Error != nil {
		return Schema{}, errors.New(res.Error.Message)
	}

	return NewSchemaFromProto(res.GetSchema()), nil
}
