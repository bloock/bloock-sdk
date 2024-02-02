package key

// Managed represents a managed entity that can be either a ManagedKey or a ManagedCertificate.
type Managed struct {
	ManagedKey         *ManagedKey
	ManagedCertificate *ManagedCertificate
}