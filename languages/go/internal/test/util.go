package test

import (
	"math"
	"math/rand"
	"os"
	"strconv"

	bloock "github.com/bloock/bloock-sdk-go/v2/client"
)

func GetSdk() bloock.Client {
	apiKey := os.Getenv("API_KEY")
	apiHost := os.Getenv("API_HOST")
	client := bloock.NewClient(apiKey, apiHost)
	return client
}

func randHex(length int) string {
	maxlength := 8
	min := math.Pow(16, math.Min(float64(length), float64(maxlength))-1)
	max := math.Pow(16, math.Min(float64(length), float64(maxlength))) - 1
	n := int((rand.Float64() * (max - min + 1)) + min)
	r := strconv.Itoa(n)
	for len(r) < length {
		r += randHex(length - maxlength)
	}
	return r
}
