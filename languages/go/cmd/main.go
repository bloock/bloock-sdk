package main

import (
	"context"
	"fmt"
	"log"

	"github.com/bloock/go-bridge/internal/bridge"
	"github.com/bloock/go-bridge/internal/bridge/proto"
)

func main() {
	client := bridge.NewBloockBridge()

	configData := &proto.ConfigData{
		Config: &proto.Configuration{
			Host:                       "https://api.bloock.dev",
			ApiKey:                     "test_key",
			WaitMessageIntervalFactor:  2,
			WaitMessageIntervalDefault: 0,
			KeyTypeAlgorithm:           "EC",
			EllipticCurveKey:           "secp256k1",
			SignatureAlgorithm:         "'ES256K'",
		},
		NetworksConfig: map[int32]*proto.NetworkConfig{
			int32(proto.Network_ETHEREUM_MAINNET): {
				ContractAddress: "0x522b2040CdfD247ED60921623044dF1c929524B7",
				ContractAbi:     "",
				HttpProvider:    "",
			},
		},
	}

	response, err := client.Greeting().SayHelloWithError(context.Background(), &proto.HelloRequest{
		Config: configData,
		Name:   "Marc",
	})

	log.Println("Response 1")
	log.Println(response)
	log.Println(err)

	response2, err := client.Anchor().GetAnchor(context.Background(), &proto.GetAnchorRequest{
		ConfigData: configData,
		AnchorId:   500,
	})

	log.Println("Response 2")
	fmt.Println(response2)
	log.Println(err)
}
