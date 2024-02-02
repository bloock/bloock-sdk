package key

// SubjectCertificateParams represents parameters for generating a subject certificate.
type SubjectCertificateParams struct {
	// CommonName is the common name (CN) for the certificate. Required.
	CommonName       string
	// Organization is the organization (O) for the certificate. (Optional)
	Organization     *string
	// OrganizationUnit is the organizational unit (OU) for the certificate. (Optional)
	OrganizationUnit *string
	// Location is the location (L) for the certificate. (Optional)
	Location         *string
	// State is the state or province (ST) for the certificate. (Optional)
	State            *string
	// Country is the country (C) for the certificate. (Optional)
	Country          *string
}
