package identityV2

import (
	"context"
	"errors"
	"time"

	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type CredentialBuilder struct {
	schemaId       string
	issuerDid      string
	holderDid      string
	expiration     int64
	version        int32
	signer         *proto.Signer
	apiManagedHost string
	configData     *proto.ConfigData

	stringAttribute   []StringAttribute
	integerAttribute  []IntegerAttribute
	decimalAttribute  []DecimalAttribute
	booleanAttribute  []BooleanAttribute
	dateAttribute     []DateAttribute
	datetimeAttribute []DatetimeAttribute
}

func NewCredentialBuilder(schemaId, issuerDid, holderDid string, expiration int64, version int32, apiManagedHost string, configData *proto.ConfigData) CredentialBuilder {
	return CredentialBuilder{
		schemaId:          schemaId,
		issuerDid:         issuerDid,
		holderDid:         holderDid,
		expiration:        expiration,
		version:           version,
		apiManagedHost:    apiManagedHost,
		configData:        configData,
		stringAttribute:   []StringAttribute{},
		integerAttribute:  []IntegerAttribute{},
		decimalAttribute:  []DecimalAttribute{},
		booleanAttribute:  []BooleanAttribute{},
		dateAttribute:     []DateAttribute{},
		datetimeAttribute: []DatetimeAttribute{},
	}
}

func (c CredentialBuilder) WithStringAttribute(key string, value string) CredentialBuilder {
	c.stringAttribute = append(c.stringAttribute, NewStringAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithIntegerAttribute(key string, value int64) CredentialBuilder {
	c.integerAttribute = append(c.integerAttribute, NewIntegerAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithDecimalAttribute(key string, value float64) CredentialBuilder {
	c.decimalAttribute = append(c.decimalAttribute, NewDecimalAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithBooleanAttribute(key string, value bool) CredentialBuilder {
	c.booleanAttribute = append(c.booleanAttribute, NewBooleanAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithDateAttribute(key string, value time.Time) CredentialBuilder {
	c.dateAttribute = append(c.dateAttribute, NewDateAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithDatetimeAttribute(key string, value time.Time) CredentialBuilder {
	c.datetimeAttribute = append(c.datetimeAttribute, NewDatetimeAttribute(key, value))
	return c
}

func (c CredentialBuilder) WithSigner(signer authenticity.Signer) CredentialBuilder {
	c.signer = signer.ToProto()
	return c
}

func (c CredentialBuilder) Build() (CredentialReceipt, error) {
	bridge := bridge.NewBloockBridge()

	stringAttributes := make([]*proto.StringAttributeV2, len(c.stringAttribute))
	for i, b := range c.stringAttribute {
		stringAttributes[i] = b.ToProto()
	}

	integerAttributes := make([]*proto.IntegerAttributeV2, len(c.integerAttribute))
	for i, b := range c.integerAttribute {
		integerAttributes[i] = b.ToProto()
	}

	decimalAttributes := make([]*proto.DecimalAttributeV2, len(c.decimalAttribute))
	for i, b := range c.decimalAttribute {
		decimalAttributes[i] = b.ToProto()
	}

	booleanAttributes := make([]*proto.BooleanAttributeV2, len(c.booleanAttribute))
	for i, b := range c.booleanAttribute {
		booleanAttributes[i] = b.ToProto()
	}

	dateAttributes := make([]*proto.DateAttributeV2, len(c.dateAttribute))
	for i, b := range c.dateAttribute {
		dateAttributes[i] = b.ToProto()
	}

	datetimeAttributes := make([]*proto.DateTimeAttributeV2, len(c.datetimeAttribute))
	for i, b := range c.datetimeAttribute {
		datetimeAttributes[i] = b.ToProto()
	}

	req := proto.CreateCredentialRequestV2{
		SchemaId:           c.schemaId,
		IssuerDid:          c.issuerDid,
		HolderDid:          c.holderDid,
		Expiration:         c.expiration,
		Version:            &c.version,
		Signer:             c.signer,
		ApiManagedHost:     c.apiManagedHost,
		ConfigData:         c.configData,
		StringAttributes:   stringAttributes,
		IntegerAttributes:  integerAttributes,
		DecimalAttributes:  decimalAttributes,
		BooleanAttributes:  booleanAttributes,
		DateAttributes:     dateAttributes,
		DatetimeAttributes: datetimeAttributes,
	}

	res, err := bridge.IdentityV2().CreateCredential(context.Background(), &req)
	if err != nil {
		return CredentialReceipt{}, err
	}

	if res.Error != nil {
		return CredentialReceipt{}, errors.New(res.Error.Message)
	}

	return NewCredentialReceiptFromProto(res.GetCredentialReceipt()), nil
}
