package test

import (
	"os"

	"github.com/bloock/bloock-sdk-go/v2"
	"github.com/bloock/bloock-sdk-go/v2/client"
)

func GetSdk() client.Client {
	bloock.ApiKey = os.Getenv("API_KEY")
	apiHost := os.Getenv("API_HOST")
	client := client.NewClient()

	if apiHost != "" {
		bloock.ApiHost = apiHost
	}
	return client
}
