package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CertificateType int32

const (
	PEM CertificateType = iota
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
