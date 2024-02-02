package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// ManagedCertificateParams represents parameters for creating a managed certificate.
type ManagedCertificateParams struct {
	// KeyType is the type of the key.
	KeyType          KeyType
	// Subject represents the subject details of the certificate.
	Subject          SubjectCertificateParams
	// ExpirationMonths is the number of months until the certificate expiration.
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

// ImportCertificateParams represents parameters for importing a certificate.
type ImportCertificateParams struct {
	Password string
}

// NewImportCertificateParams creates an ImportCertificateParams instance with default values.
func NewImportCertificateParams() ImportCertificateParams {
	return ImportCertificateParams{}
}
