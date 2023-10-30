package key

type SubjectCertificateParams struct {
	CommonName       string
	Organization     *string
	OrganizationUnit *string
	Location         *string
	State            *string
	Country          *string
}
