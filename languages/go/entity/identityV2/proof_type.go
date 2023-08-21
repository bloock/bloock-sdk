package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type ProofType int32

const (
	IntegrityProofType ProofType = iota
	SparseMtProofType  ProofType = iota
)

var (
	ProofTypeFromProto = map[proto.ProofType]ProofType{
		proto.ProofType_IntegrityProofType: IntegrityProofType,
		proto.ProofType_SparseMtProofType:  SparseMtProofType,
	}

	KeyTypeToProto = map[ProofType]proto.ProofType{
		IntegrityProofType: proto.ProofType_IntegrityProofType,
		SparseMtProofType:  proto.ProofType_SparseMtProofType,
	}
)
