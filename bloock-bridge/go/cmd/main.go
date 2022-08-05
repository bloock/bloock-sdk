package main

import (
	"context"
	"log"

	"github.com/bloock/go-bridge/internal/bridge"
	"github.com/bloock/go-bridge/internal/bridge/proto"
)

func main() {
	client := bridge.NewBloockBridge()

	configData := &proto.ConfigData{
		Config: &proto.Configuration{
			Host:                       "api.bloock.dev",
			ApiKey:                     "test_key",
			WaitMessageIntervalFactor:  0,
			WaitMessageIntervalDefault: 0,
			KeyTypeAlgorithm:           "asdf",
			EllipticCurveKey:           "asdf",
			SignatureAlgorithm:         "asdf",
		},
		NetworksConfig: map[string]*proto.NetworkConfig{
			proto.Network_name[int32(proto.Network_ETHEREUM_MAINNET)]: {
				ContractAddress: "some address",
				ContractAbi:     "some abi",
				HttpProvider:    "some provider",
			},
		},
	}

	response, err := client.Greeting().SayHello(context.Background(), &proto.HelloRequest{
		Config: configData,
		Name:   "Marc",
	})

	log.Println(response)
	log.Println(err)

	response, err = client.Greeting().SayHelloWithError(context.Background(), &proto.HelloRequest{
		Config: configData,
		Name:   "Marc",
	})

	log.Println(response)
	log.Println(err)
}
