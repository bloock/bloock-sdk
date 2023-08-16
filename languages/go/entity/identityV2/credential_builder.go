package identityV2

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type CredentialBuilder struct {
	schemaId       string
	schemaType     string
	issuerDid      string
	holderDid      string
	expiration     int64
	version        int32
	signer         *proto.Signer
	apiManagedHost string
	proof          []proto.ProofType
	configData     *proto.ConfigData

	booleanAttribute  []BooleanAttribute
	dateAttribute     []DateAttribute
	datetimeAttribute []DatetimeAttribute
	stringAttribute   []StringAttribute
	numberAttribute   []NumberAttribute
}

func NewCredentialBuilder(schemaId, schemaType, issuerDid, holderDid string, expiration int64, version int32, apiManagedHost string, configData *proto.ConfigData) CredentialBuilder {
	return CredentialBuilder{
		schemaId:          schemaId,
		schemaType:        schemaType,
		issuerDid:         issuerDid,
		holderDid:         holderDid,
		expiration:        expiration,
		version:           version,
		apiManagedHost:    apiManagedHost,
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

func (c CredentialBuilder) WithSigner(signer authenticity.Signer) CredentialBuilder {
	c.signer = signer.ToProto()
	return c
}

func (c CredentialBuilder) WithProofType(proofs []ProofType) CredentialBuilder {
	proofTypes := make([]proto.ProofType, 0)
	for _, p := range proofs {
		proofTypes = append(proofTypes, KeyTypeToProto[p])
	}
	c.proof = proofTypes
	return c
}

func (c CredentialBuilder) Build() (CredentialReceipt, error) {
	bridge := bridge.NewBloockBridge()

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

	stringAttributes := make([]*proto.StringAttributeV2, len(c.stringAttribute))
	for i, b := range c.stringAttribute {
		stringAttributes[i] = b.ToProto()
	}

	numberAttributes := make([]*proto.NumberAttributeV2, len(c.numberAttribute))
	for i, b := range c.numberAttribute {
		numberAttributes[i] = b.ToProto()
	}

	req := proto.CreateCredentialRequestV2{
		SchemaId:           c.schemaId,
		SchemaType:         c.schemaType,
		IssuerDid:          c.issuerDid,
		HolderDid:          c.holderDid,
		Expiration:         c.expiration,
		Version:            &c.version,
		Signer:             c.signer,
		ApiManagedHost:     c.apiManagedHost,
		ConfigData:         c.configData,
		BooleanAttributes:  booleanAttributes,
		DateAttributes:     dateAttributes,
		DatetimeAttributes: datetimeAttributes,
		StringAttributes:   stringAttributes,
		NumberAttributes:   numberAttributes,
		ProofType:          c.proof,
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
