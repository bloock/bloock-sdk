package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type LocalCertificate struct {
	Pkcs12   []byte
	Password string
}

func NewLocalCertificateFromProto(s *proto.LocalCertificate) LocalCertificate {
	if s == nil {
		return LocalCertificate{}
	}
	return LocalCertificate{
		Pkcs12:   s.Pkcs12,
		Password: s.Password,
	}
}

func (s LocalCertificate) ToProto() *proto.LocalCertificate {
	return &proto.LocalCertificate{
		Pkcs12:   s.Pkcs12,
		Password: s.Password,
	}
}
