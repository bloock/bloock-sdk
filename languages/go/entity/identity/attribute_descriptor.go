package identity

// AttributeDescriptor represents a descriptor for an attribute.
type AttributeDescriptor struct {
	// DisplayName is the human-readable display name of the attribute.
	DisplayName string
	// Id is the identifier for the attribute.
	Id string
	// Description is a description providing additional information about the attribute.
	Description string
	// Required specifies whether the attribute is required.
	Required bool
}
