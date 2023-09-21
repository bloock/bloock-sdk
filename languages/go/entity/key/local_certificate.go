package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type LocalCertificate struct {
	Pkcs11 []byte
}

func NewLocalCertificateFromProto(s *proto.LocalCertificate) LocalCertificate {
	if s == nil {
		return LocalCertificate{}
	}
	return LocalCertificate{
		Pkcs11: s.Pkcs12,
	}
}

func (s LocalCertificate) ToProto() *proto.LocalCertificate {
	return &proto.LocalCertificate{
		Pkcs12: s.Pkcs11,
	}
}
