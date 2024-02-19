package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// Method represents an enumeration of methods used in the DID.
type Method = proto.Method

func MethodToProto(method Method) *proto.Method {
	if method == -1 {
		return nil
	}
	return &method
}

// methods represents a set of predefined methods.
type methods struct {
	Iden3     Method
	PolygonId Method
}

// ListOfMethods returns an instance of the methods available for [DID] types.
//
// [DID]: https://www.w3.org/TR/did-core/
func ListOfMethods() methods {
	return methods{
		Iden3:     proto.Method_IDEN3,
		PolygonId: proto.Method_POLYGON_ID,
	}
}

// Blockchain represents an enumeration of blockchains used in the DID.
type Blockchain = proto.Blockchain

func BlockchainToProto(blockchain Blockchain) *proto.Blockchain {
	if blockchain == -1 {
		return nil
	}
	return &blockchain
}

// blockchains represents a set of predefined blockchains.
type blockchains struct {
	Ethereum     Blockchain
	Polygon      Blockchain
	UnknownChain Blockchain
	NoChain      Blockchain
}

// ListOfBlockchains returns an instance of the blockchains available for DID types.
func ListOfBlockchains() blockchains {
	return blockchains{
		Ethereum:     proto.Blockchain_ETHEREUM,
		Polygon:      proto.Blockchain_POLYGON,
		UnknownChain: proto.Blockchain_UNKNOWN_CHAIN,
		NoChain:      proto.Blockchain_NO_CHAIN,
	}
}

// NetworkId represents an enumeration of network identifiers.
type NetworkId = proto.NetworkId

func NetworkIdToProto(networkId NetworkId) *proto.NetworkId {
	if networkId == -1 {
		return nil
	}
	return &networkId
}

// networkIds represents a set of predefined network identifiers.
type networkIds struct {
	Main           NetworkId
	Mumbai         NetworkId
	Goerli         NetworkId
	UnknownNetwork NetworkId
	NoNetwork      NetworkId
}

// ListOfNetworkIds returns an instance of the networkIds available for DID types.
func ListOfNetworkIds() networkIds {
	return networkIds{
		Main:           proto.NetworkId_MAIN,
		Mumbai:         proto.NetworkId_MUMBAI,
		Goerli:         proto.NetworkId_GOERLI,
		UnknownNetwork: proto.NetworkId_UNKNOWN_NETWORK,
		NoNetwork:      proto.NetworkId_NO_NETWORK,
	}
}

// DidType represents parameters used for generating DIDs.
type DidType struct {
	Method     Method
	Blockchain Blockchain
	NetworkId  NetworkId
}

// NewDidType returns a new instance of DidType with default values.
func NewDidType() DidType {
	return DidType{
		Method:     -1,
		Blockchain: -1,
		NetworkId:  -1,
	}
}

func DidTypeToProto(didType DidType) *proto.DidType {
	if didType.Method == -1 {
		return nil
	} else if didType.Blockchain == -1 {
		return nil
	} else if didType.NetworkId == -1 {
		return nil
	} else {
		return &proto.DidType{
			Method:     *MethodToProto(didType.Method),
			Blockchain: *BlockchainToProto(didType.Blockchain),
			NetworkId:  *NetworkIdToProto(didType.NetworkId),
		}
	}
}
