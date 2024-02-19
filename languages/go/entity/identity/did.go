package identity

// Did represents a DID.
type Did struct {
	Did     string
	DidType DidType
}

// NewDid returns a new instance of Did for the given parameters.
func NewDid(did string, didType DidType) Did {
	return Did{
		Did: did,
		DidType: didType,
	}
}
