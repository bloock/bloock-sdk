package identity

import (
	"context"
	"errors"
	"time"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// CredentialCoreBuilder helps construct credentials by specifying various attributes.
type CredentialCoreBuilder struct {
	schemaId   string
	issuerDid  string
	holderDid  string
	expiration int64
	version    int32
	key        *proto.Key
	configData *proto.ConfigData

	stringAttribute   []StringAttribute
	integerAttribute  []IntegerAttribute
	decimalAttribute  []DecimalAttribute
	booleanAttribute  []BooleanAttribute
	dateAttribute     []DateAttribute
	datetimeAttribute []DatetimeAttribute
}

// NewCredentialCoreBuilder creates a new CredentialCoreBuilder instance with the specified parameters.
func NewCredentialCoreBuilder(issuer Issuer, schemaId, holderDid string, expiration int64, version int32, configData *proto.ConfigData) CredentialCoreBuilder {
	return CredentialCoreBuilder{
		schemaId:          schemaId,
		issuerDid:         issuer.Did.Did,
		holderDid:         holderDid,
		expiration:        expiration,
		version:           version,
		configData:        configData,
		key:               issuer.Key.ToProto(),
		stringAttribute:   []StringAttribute{},
		integerAttribute:  []IntegerAttribute{},
		decimalAttribute:  []DecimalAttribute{},
		booleanAttribute:  []BooleanAttribute{},
		dateAttribute:     []DateAttribute{},
		datetimeAttribute: []DatetimeAttribute{},
	}
}

// WithStringAttribute adds a string attribute to the CredentialCoreBuilder.
func (c CredentialCoreBuilder) WithStringAttribute(key string, value string) CredentialCoreBuilder {
	c.stringAttribute = append(c.stringAttribute, NewStringAttribute(key, value))
	return c
}

// WithIntegerAttribute adds an integer attribute to the CredentialCoreBuilder.
func (c CredentialCoreBuilder) WithIntegerAttribute(key string, value int64) CredentialCoreBuilder {
	c.integerAttribute = append(c.integerAttribute, NewIntegerAttribute(key, value))
	return c
}

// WithDecimalAttribute adds a decimal attribute to the CredentialCoreBuilder.
func (c CredentialCoreBuilder) WithDecimalAttribute(key string, value float64) CredentialCoreBuilder {
	c.decimalAttribute = append(c.decimalAttribute, NewDecimalAttribute(key, value))
	return c
}

// WithBooleanAttribute adds a boolean attribute to the CredentialCoreBuilder.
func (c CredentialCoreBuilder) WithBooleanAttribute(key string, value bool) CredentialCoreBuilder {
	c.booleanAttribute = append(c.booleanAttribute, NewBooleanAttribute(key, value))
	return c
}

// WithDateAttribute adds a date attribute to the CredentialCoreBuilder.
func (c CredentialCoreBuilder) WithDateAttribute(key string, value time.Time) CredentialCoreBuilder {
	c.dateAttribute = append(c.dateAttribute, NewDateAttribute(key, value))
	return c
}

// WithDatetimeAttribute adds a datetime attribute to the CredentialCoreBuilder.
func (c CredentialCoreBuilder) WithDatetimeAttribute(key string, value time.Time) CredentialCoreBuilder {
	c.datetimeAttribute = append(c.datetimeAttribute, NewDatetimeAttribute(key, value))
	return c
}

// Build creates and returns a Credential using the specified attributes.
func (c CredentialCoreBuilder) Build() (CredentialReceipt, error) {
	bridge := bridge.NewBloockBridge()

	stringAttributes := make([]*proto.StringAttribute, len(c.stringAttribute))
	for i, b := range c.stringAttribute {
		stringAttributes[i] = b.ToProto()
	}

	integerAttributes := make([]*proto.IntegerAttribute, len(c.integerAttribute))
	for i, b := range c.integerAttribute {
		integerAttributes[i] = b.ToProto()
	}

	decimalAttributes := make([]*proto.DecimalAttribute, len(c.decimalAttribute))
	for i, b := range c.decimalAttribute {
		decimalAttributes[i] = b.ToProto()
	}

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

	req := proto.CreateCoreCredentialRequest{
		SchemaId:           c.schemaId,
		IssuerDid:          c.issuerDid,
		HolderDid:          c.holderDid,
		Expiration:         c.expiration,
		Version:            &c.version,
		Key:                c.key,
		ConfigData:         c.configData,
		StringAttributes:   stringAttributes,
		IntegerAttributes:  integerAttributes,
		DecimalAttributes:  decimalAttributes,
		BooleanAttributes:  booleanAttributes,
		DateAttributes:     dateAttributes,
		DatetimeAttributes: datetimeAttributes,
	}

	res, err := bridge.IdentityCore().CreateCoreCredential(context.Background(), &req)
	if err != nil {
		return CredentialReceipt{}, err
	}

	if res.Error != nil {
		return CredentialReceipt{}, errors.New(res.Error.Message)
	}

	return NewCredentialReceiptFromProto(res.GetCredentialReceipt()), nil
}
