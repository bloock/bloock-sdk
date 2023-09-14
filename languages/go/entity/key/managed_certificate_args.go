package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type ManagedCertificateParams struct {
	KeyType          KeyType
	Subject          SubjectCertificateParams
	ExpirationMonths int32
}

func NewManagedCertificateParamsFromProto(s *proto.ManagedCertificateParams) ManagedCertificateParams {
	if s == nil {
		return ManagedCertificateParams{}
	}
	return ManagedCertificateParams{
		KeyType: KeyType(s.GetKeyType()),
		Subject: SubjectCertificateParams{
			CN: s.GetCn(),
			O:  s.GetO(),
			OU: s.GetOu(),
			C:  s.GetC(),
		},
		ExpirationMonths: s.GetExpiration(),
	}
}

func (s ManagedCertificateParams) ToProto() *proto.ManagedCertificateParams {
	return &proto.ManagedCertificateParams{
		KeyType:    KeyTypeToProto[s.KeyType],
		Cn:         s.Subject.CN,
		O:          s.Subject.O,
		Ou:         s.Subject.OU,
		C:          s.Subject.C,
		Expiration: s.ExpirationMonths,
	}
}

type ImportCertificateParams struct {
	Password string
}

func NewImportCertificateParams() ImportCertificateParams {
	return ImportCertificateParams{}
}
