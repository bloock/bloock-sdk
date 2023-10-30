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
			CommonName:       s.GetSubject().GetCommonName(),
			Organization:     s.GetSubject().Organization,
			OrganizationUnit: s.GetSubject().OrganizationalUnit,
			Location:         s.GetSubject().Location,
			State:            s.GetSubject().State,
			Country:          s.GetSubject().Country,
		},
		ExpirationMonths: s.GetExpiration(),
	}
}

func (s ManagedCertificateParams) ToProto() *proto.ManagedCertificateParams {
	return &proto.ManagedCertificateParams{
		KeyType: KeyTypeToProto[s.KeyType],
		Subject: &proto.CertificateSubject{
			CommonName:         s.Subject.CommonName,
			OrganizationalUnit: s.Subject.OrganizationUnit,
			Organization:       s.Subject.Organization,
			Location:           s.Subject.Location,
			State:              s.Subject.State,
			Country:            s.Subject.Country,
		},
		Expiration: s.ExpirationMonths,
	}
}

type ImportCertificateParams struct {
	Password string
}

func NewImportCertificateParams() ImportCertificateParams {
	return ImportCertificateParams{}
}
