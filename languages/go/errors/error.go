package errors

import "fmt"

// BloockError struct
type BloockError struct {
	// Kind
	Kind string `json:"kind"`
	// Formatted
	Formatted string `json:"formatted"`
}

func (e *BloockError) Error() string {
	return fmt.Sprintf("Error: %s\n%s", e.Kind, e.Formatted)
}
