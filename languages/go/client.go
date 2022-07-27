package bloock

import (
	"github.com/bloock/go-bloock/internal/ffi"
	"github.com/bloock/go-bloock/types"
)

type BloockClient struct {
	ffiClient ffi.ClientFfi
}

func NewClient(apiKey string) BloockClient {
	return BloockClient{
		ffiClient: ffi.NewClientFfi(apiKey),
	}
}

func (b *BloockClient) SetApiHost(host string) {
	b.ffiClient.SetApiHost(host)
}

func (b *BloockClient) SetNetworkConfiguration(network types.Network, configuration types.NetworkConfiguration) {
	b.ffiClient.SetNetworkConfiguration(network, configuration)
}

func (b *BloockClient) SendRecords(records []*Record) ([]types.RecordReceipt, error) {
	recordsFfi := make([]*ffi.RecordFfi, 0)
	for _, r := range records {
		recordsFfi = append(recordsFfi, r.ffi)
	}
	return b.ffiClient.SendRecords(recordsFfi)
}

// func (b *BloockClient) GetRecords(records []*Record) ([]types.RecordReceipt, error) {
// 	recordsFfi := make([]*ffi.RecordFfi, 0)
// 	for _, r := range records {
// 		recordsFfi = append(recordsFfi, r.ffi)
// 	}
// 	return b.ffiClient.GetRecords(recordsFfi)
// }

func (b *BloockClient) GetAnchor(anchor int64) (types.Anchor, error) {
	return b.ffiClient.GetAnchor(anchor)
}

func (b *BloockClient) WaitAnchor(anchor int64, timeout int64) (types.Anchor, error) {
	return b.ffiClient.WaitAnchor(anchor, timeout)
}

// func (b *BloockClient) GetProof(records []*Record) (types.Proof, error) {
// 	recordsFfi := make([]*ffi.RecordFfi, 0)
// 	for _, r := range records {
// 		recordsFfi = append(recordsFfi, r.ffi)
// 	}
// 	return b.ffiClient.GetProof(recordsFfi)
// }

// func (b *BloockClient) VerifyProof(proof types.Proof) (*Record, error) {
// 	res, err := b.ffiClient.VerifyProof(proof)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return newRecord(res), nil
// }

// func (b *BloockClient) VerifyRecords(records []*Record) (int64, error) {
// 	recordsFfi := make([]*ffi.RecordFfi, 0)
// 	for _, r := range records {
// 		recordsFfi = append(recordsFfi, r.ffi)
// 	}
// 	return b.ffiClient.VerifyRecords(recordsFfi)
// }
