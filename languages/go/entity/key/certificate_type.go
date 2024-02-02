package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// CertificateType represents the type of certificate.
type CertificateType int32

const (
	// PEM is a certificate type.
	PEM CertificateType = iota
	// PFX is a certificate type.
	PFX CertificateType = iota
)

var (
	CertificateTypeFromProto = map[proto.CertificateType]CertificateType{
		proto.CertificateType_PEM: PEM,
		proto.CertificateType_PFX: PFX,
	}

	CertificateTypeToProto = map[CertificateType]proto.CertificateType{
		PEM: proto.CertificateType_PEM,
		PFX: proto.CertificateType_PFX,
	}
)
