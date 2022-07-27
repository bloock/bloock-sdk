package types

type Record struct {
	hash string
}

func (m *Record) GetHash() string {
	return m.hash
}
