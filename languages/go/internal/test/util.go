package test

import (
	"os"

	bloock "github.com/bloock/go-bridge/client"
)

func GetSdk() bloock.Client {
	apiKey := os.Getenv("API_KEY")
	apiHost := os.Getenv("API_HOST")
	client := bloock.NewClient(apiKey, apiHost)
	return client
}
