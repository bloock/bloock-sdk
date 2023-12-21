package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Method = proto.Method

func MethodToProto(method Method) *proto.Method {
	if method == -1 {
		return nil
	}
	return &method
}

type methods struct {
	Iden3     Method
	PolygonId Method
}

func ListOfMethods() methods {
	return methods{
		Iden3:     proto.Method_IDEN3,
		PolygonId: proto.Method_POLYGON_ID,
	}
}

type Blockchain = proto.Blockchain

func BlockchainToProto(blockchain Blockchain) *proto.Blockchain {
	if blockchain == -1 {
		return nil
	}
	return &blockchain
}

type blockchains struct {
	Ethereum     Blockchain
	Polygon      Blockchain
	UnknownChain Blockchain
	NoChain      Blockchain
}

func ListOfBlockchains() blockchains {
	return blockchains{
		Ethereum:     proto.Blockchain_ETHEREUM,
		Polygon:      proto.Blockchain_POLYGON,
		UnknownChain: proto.Blockchain_UNKNOWN_CHAIN,
		NoChain:      proto.Blockchain_NO_CHAIN,
	}
}

type NetworkId = proto.NetworkId

func NetworkIdToProto(networkId NetworkId) *proto.NetworkId {
	if networkId == -1 {
		return nil
	}
	return &networkId
}

type networkIds struct {
	Main           NetworkId
	Mumbai         NetworkId
	Goerli         NetworkId
	UnknownNetwork NetworkId
	NoNetwork      NetworkId
}

func ListOfNetworkIds() networkIds {
	return networkIds{
		Main:           proto.NetworkId_MAIN,
		Mumbai:         proto.NetworkId_MUMBAI,
		Goerli:         proto.NetworkId_GOERLI,
		UnknownNetwork: proto.NetworkId_UNKNOWN_NETWORK,
		NoNetwork:      proto.NetworkId_NO_NETWORK,
	}
}

type DidParams struct {
	Method     Method
	Blockchain Blockchain
	NetworkId  NetworkId
}

func NewDidParams() DidParams {
	return DidParams{
		Method:     -1,
		Blockchain: -1,
		NetworkId:  -1,
	}
}

func DidParamsToProto(didParams DidParams) *proto.DidParams {
	if didParams.Method == -1 {
		return nil
	} else if didParams.Blockchain == -1 {
		return nil
	} else if didParams.NetworkId == -1 {
		return nil
	} else {
		return &proto.DidParams{
			Method:     *MethodToProto(didParams.Method),
			Blockchain: *BlockchainToProto(didParams.Blockchain),
			NetworkId:  *NetworkIdToProto(didParams.NetworkId),
		}
	}
}
