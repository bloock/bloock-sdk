//go:build e2e

package client

import (
	"os"

	"github.com/bloock/bloock-sdk-go/v2"
)

func InitSdk() {
	bloock.ApiKey = os.Getenv("API_KEY")
	apiHost := os.Getenv("API_HOST")
	identityApiHost := os.Getenv("IDENTITY_API_HOST")

	if apiHost != "" {
		bloock.ApiHost = apiHost
	}

	if identityApiHost != "" {
		bloock.IdentityApiHost = identityApiHost
	}

	bloock.DisableAnalytics = true
}

func InitDevSdk() {
	bloock.ApiKey = os.Getenv("DEV_API_KEY")
	apiHost := os.Getenv("DEV_API_HOST")
	identityApiHost := os.Getenv("DEV_IDENTITY_API_HOST")

	if apiHost != "" {
		bloock.ApiHost = apiHost
	}

	if identityApiHost != "" {
		bloock.IdentityApiHost = identityApiHost
	}

	bloock.DisableAnalytics = true
}
