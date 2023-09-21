package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type LocalCertificateParams struct {
	KeyType  KeyType
	Password string
	Subject  SubjectCertificateParams
}

func NewLocalCertificateParamsFromProto(s *proto.LocalCertificateParams) LocalCertificateParams {
	if s == nil {
		return LocalCertificateParams{}
	}
	return LocalCertificateParams{
		KeyType: KeyType(s.GetKeyType()),
		Subject: SubjectCertificateParams{
			CommonName:       s.GetSubject().GetCommonName(),
			Organization:     s.GetSubject().Organization,
			OrganizationUnit: s.GetSubject().OrganizationalUnit,
			Location:         s.GetSubject().Location,
			State:            s.GetSubject().State,
			Country:          s.GetSubject().Country,
		},
	}
}

func (s LocalCertificateParams) ToProto() *proto.LocalCertificateParams {
	return &proto.LocalCertificateParams{
		KeyType:  KeyTypeToProto[s.KeyType],
		Password: s.Password,
		Subject: &proto.CertificateSubject{
			CommonName:         s.Subject.CommonName,
			OrganizationalUnit: s.Subject.OrganizationUnit,
			Organization:       s.Subject.Organization,
			Location:           s.Subject.Location,
			State:              s.Subject.State,
			Country:            s.Subject.Country,
		},
	}
}
