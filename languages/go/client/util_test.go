//go:build e2e

package client

import (
	"math/rand"
	"os"
	"time"

	"github.com/bloock/bloock-sdk-go/v2"
)

func InitSdk() {
	bloock.ApiKey = os.Getenv("API_KEY")
	apiHost := os.Getenv("API_HOST")

	if apiHost != "" {
		bloock.ApiHost = apiHost
	}
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
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func generateRandomString(length int) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]byte, length)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}
