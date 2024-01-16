//go:build e2e

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

func InitDevSdk() {
	bloock.ApiKey = "no9rLf9dOMjXGvXQX3I96a39qYFoZknGd6YHtY3x1VPelr6M-TmTLpAF-fm1k9Zp"
	apiHost := "https://api.bloock.dev"
	identityApiHost := "https://identity-managed-api.bloock.dev"

	if apiHost != "" {
		bloock.ApiHost = apiHost
	}

	if identityApiHost != "" {
		bloock.IdentityApiHost = identityApiHost
	}

	bloock.DisableAnalytics = true
}
