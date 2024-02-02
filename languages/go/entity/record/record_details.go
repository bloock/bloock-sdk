package record

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/entity/integrity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// IntegrityDetails represents details related to the integrity of a record, including hash and proof.
type IntegrityDetails struct {
	Hash  string
	Proof *integrity.Proof
}

func NewIntegrityDetailsFromProto(r *proto.IntegrityDetails) *IntegrityDetails {
	if r == nil {
		return nil
	}

	integrityDetails := IntegrityDetails{
		Hash:  r.Hash,
		Proof: nil,
	}

	if r.Proof != nil {
		proof := integrity.NewProofFromProto(r.Proof)
		integrityDetails.Proof = &proof
	}

	return &integrityDetails
}

func (r *IntegrityDetails) ToProto() *proto.IntegrityDetails {
	return &proto.IntegrityDetails{
		Hash:  r.Hash,
		Proof: r.Proof.ToProto(),
	}
}

// AuthenticityDetails represents details related to the authenticity of a record, including signatures.
type AuthenticityDetails struct {
	Signatures []authenticity.Signature
}

func NewAuthenticityDetailsFromProto(r *proto.AuthenticityDetails) *AuthenticityDetails {
	if r == nil {
		return nil
	}

	signatures := make([]authenticity.Signature, len(r.Signatures))
	for i, signature := range r.Signatures {
		signatures[i] = authenticity.NewSignatureFromProto(signature)
	}

	return &AuthenticityDetails{
		Signatures: signatures,
	}
}

func (r *AuthenticityDetails) ToProto() *proto.AuthenticityDetails {
	signatures := make([]*proto.Signature, len(r.Signatures))
	for i, signature := range r.Signatures {
		signatures[i] = signature.ToProto()
	}

	return &proto.AuthenticityDetails{
		Signatures: signatures,
	}
}

// EncryptionDetails represents details related to the encryption of a record, including algorithm, key, and subject.
type EncryptionDetails struct {
	Alg     *string
	Key     *string
	Subject *string
}

func NewEncryptionDetailsFromProto(r *proto.EncryptionDetails) *EncryptionDetails {
	if r == nil {
		return nil
	}

	return &EncryptionDetails{
		Alg:     r.Alg,
		Key:     r.Key,
		Subject: r.Subject,
	}
}

func (r *EncryptionDetails) ToProto() *proto.EncryptionDetails {
	return &proto.EncryptionDetails{
		Alg:     r.Alg,
		Key:     r.Key,
		Subject: r.Subject,
	}
}

// AvailabilityDetails represents details related to the availability of a record, including content type and size.
type AvailabilityDetails struct {
	ContentType *string
	Size        int64
}

func NewAvailabilityDetailsFromProto(r *proto.AvailabilityDetails) *AvailabilityDetails {
	if r == nil {
		return nil
	}

	return &AvailabilityDetails{
		ContentType: r.Type,
		Size:        r.Size,
	}
}

func (r *AvailabilityDetails) ToProto() *proto.AvailabilityDetails {
	return &proto.AvailabilityDetails{
		Type: r.ContentType,
		Size: r.Size,
	}
}

// RecordDetails represents all details related to a record, including integrity, authenticity, encryption, and availability details.
type RecordDetails struct {
	IntegrityDetails    *IntegrityDetails
	AuthenticityDetails *AuthenticityDetails
	EncryptionDetails   *EncryptionDetails
	AvailabilityDetails *AvailabilityDetails
}

func NewRecordDetailsFromProto(r *proto.RecordDetails, configData *proto.ConfigData) RecordDetails {
	if r == nil {
		return RecordDetails{}
	}

	return RecordDetails{
		IntegrityDetails:    NewIntegrityDetailsFromProto(r.Integrity),
		AuthenticityDetails: NewAuthenticityDetailsFromProto(r.Authenticity),
		EncryptionDetails:   NewEncryptionDetailsFromProto(r.Encryption),
		AvailabilityDetails: NewAvailabilityDetailsFromProto(r.Availability),
	}
}

func (r *RecordDetails) ToProto() *proto.RecordDetails {
	return &proto.RecordDetails{
		Integrity:    r.IntegrityDetails.ToProto(),
		Authenticity: r.AuthenticityDetails.ToProto(),
		Encryption:   r.EncryptionDetails.ToProto(),
		Availability: r.AvailabilityDetails.ToProto(),
	}
}
