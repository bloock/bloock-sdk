package test

import (
	"os"

	"github.com/bloock/bloock-sdk-go/v2"
	"github.com/bloock/bloock-sdk-go/v2/client"
)

func GetSdk() client.Client {
	bloock.Key = os.Getenv("API_KEY")
	apiHost := os.Getenv("API_HOST")
	client := client.NewClient()

	if apiHost != "" {
		client.SetApiHost(apiHost)
	}
	return client
}
