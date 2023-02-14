package client

import (
	"os"

	"github.com/bloock/bloock-sdk-go/v2"
)

func InitSdk() {
	bloock.ApiKey = os.Getenv("API_KEY")
	apiHost := os.Getenv("API_HOST")
	if apiHost != "" {
		bloock.ApiHost = apiHost
	}

	bloock.DisableAnalytics = true
}
