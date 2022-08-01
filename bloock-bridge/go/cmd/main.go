package main

import (
	"context"
	"log"

	"github.com/bloock/go-bridge/internal/bridge"
	"github.com/bloock/go-bridge/internal/bridge/protos"
)

func main() {
	client := bridge.NewBloockBridge()
	response, err := client.Greeting().SayHello(context.Background(), &protos.HelloRequest{
		Name: "Marc",
	})

	log.Println(response)
	log.Println(err)

	response, err = client.Greeting().SayHelloWithError(context.Background(), &protos.HelloRequest{
		Name: "Marc",
	})

	log.Println(response)
	log.Println(err)
}
