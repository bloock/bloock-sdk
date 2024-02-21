package identity

// Did represents a DID.
type Did struct {
	Did       string
	DidMethod DidMethod
}

// NewDid returns a new instance of Did for the given parameters.
func NewDid(did string, didMethod DidMethod) Did {
	return Did{
		Did:       did,
		DidMethod: didMethod,
	}
}
