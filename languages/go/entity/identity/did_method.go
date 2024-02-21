package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"


// DidMethod represents the type of method did.
type DidMethod int32

const (
	// PolygonID represents the polygon id method did.
	PolygonID DidMethod = iota
	// PolygonIDTest represents the polygon id test method did.
	PolygonIDTest DidMethod = iota
)

var (
	DidMethodEnumFromProto = map[proto.DidMethod]DidMethod{
		proto.DidMethod_POLYGON_ID: PolygonID,
		proto.DidMethod_POLYGON_ID_TEST: PolygonIDTest,
	}

	DidMethodEnumToProto = map[DidMethod]proto.DidMethod{
		PolygonID: proto.DidMethod_POLYGON_ID,
		PolygonIDTest: proto.DidMethod_POLYGON_ID_TEST,
	}
)