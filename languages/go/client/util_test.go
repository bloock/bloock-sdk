//go:build e2e

package client

import (
	"crypto/hmac"
	"crypto/sha1"
	"encoding/base32"
	"encoding/binary"
	"math/rand"
	"os"
	"strconv"
	"strings"
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

func generateTOTPClient(secretKey string, timestamp int64) string {
	base32Decoder := base32.StdEncoding.WithPadding(base32.NoPadding)
	secretKey = strings.ToUpper(strings.TrimSpace(secretKey))
	secretBytes, _ := base32Decoder.DecodeString(secretKey)

	timeBytes := make([]byte, 8)
	binary.BigEndian.PutUint64(timeBytes, uint64(timestamp)/30)

	hash := hmac.New(sha1.New, secretBytes)
	hash.Write(timeBytes)
	h := hash.Sum(nil)

	offset := h[len(h)-1] & 0x0F

	truncatedHash := binary.BigEndian.Uint32(h[offset:]) & 0x7FFFFFFF

	return strconv.Itoa(int(truncatedHash % 1_000_000))
}
