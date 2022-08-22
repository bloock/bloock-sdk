package test

import (
	bloock "github.com/bloock/go-bridge/client"
	"os"
)

func GetSdk() bloock.Client {
	apiKey := os.Getenv("API_KEY")
	apiHost := os.Getenv("API_HOST")
	client := bloock.NewClient(apiKey)
	client.SetApiHost(apiHost)
	return client
}
