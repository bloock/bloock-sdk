package types

type RecordReceipt struct {
	Hash string
}

func NewRecordReceipt(hash string) RecordReceipt {
	return RecordReceipt{
		Hash: hash,
	}
}
