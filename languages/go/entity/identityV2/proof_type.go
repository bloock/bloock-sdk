package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type ProofType int32

const (
	BloockProof ProofType = iota
	PolygonMtp  ProofType = iota
)

var (
	ProofTypeFromProto = map[proto.ProofType]ProofType{
		proto.ProofType_BloockProof: BloockProof,
		proto.ProofType_PolygonMtp:  PolygonMtp,
	}

	KeyTypeToProto = map[ProofType]proto.ProofType{
		BloockProof: proto.ProofType_BloockProof,
		PolygonMtp:  proto.ProofType_PolygonMtp,
	}
)
