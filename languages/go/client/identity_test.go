package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/identity"
	"github.com/stretchr/testify/assert"
)

func TestIdentity(t *testing.T) {
	InitSdk()

	t.Run("create identity", func(t *testing.T) {
		identityClient := NewIdentityClient()
		_, err := identityClient.CreateIdentity()
		assert.Error(t, err)
		assert.Equal(t, err.Error(), "not implemented")
	})

	t.Run("load identity", func(t *testing.T) {
		identityClient := NewIdentityClient()
		_, err := identityClient.LoadIdentity("mnemonic")
		assert.Error(t, err)
		assert.Equal(t, err.Error(), "not implemented")
	})

	t.Run("build schema", func(t *testing.T) {
		identityClient := NewIdentityClient()
		_, err := identityClient.BuildSchema("", "").
			AddBooleanAttribute("", "", "").
			AddDateAttribute("", "", "").
			AddDatetimeAttribute("", "", "").
			AddMultichoiceAttribute("", "", []string{"a", "b", "c"}, "").
			AddNumberAttribute("", "", "").
			Build()
		assert.Error(t, err)
		assert.Equal(t, err.Error(), "not implemented")
	})

	t.Run("get schema", func(t *testing.T) {
		identityClient := NewIdentityClient()
		_, err := identityClient.GetSchema("")
		assert.Error(t, err)
		assert.Equal(t, err.Error(), "not implemented")
	})

	t.Run("credential offer builder", func(t *testing.T) {
		identityClient := NewIdentityClient()
		_, err := identityClient.BuildOffer("", "").
			WithBooleanAttribute("", true).
			WithDateAttribute("", 123).
			WithDatetimeAttribute("", 123).
			WithMultichoiceAttribute("", "a").
			WithNumberAttribute("", 123).
			Build()
		assert.Error(t, err)
		assert.Equal(t, err.Error(), "not implemented")
	})

	t.Run("credential offer to json", func(t *testing.T) {
		json := identity.NewCredentialOfferFromJson("{}").ToJson()
		assert.Equal(t, json, "{}")
	})

	t.Run("credential offer from json", func(t *testing.T) {
		offer := identity.NewCredentialOfferFromJson("{}")
		assert.Equal(t, offer.ToJson(), "{}")
	})

	t.Run("credential offer redeem", func(t *testing.T) {
		identityClient := NewIdentityClient()
		_, err := identityClient.CreateIdentity()
		assert.Error(t, err)
		assert.Equal(t, err.Error(), "not implemented")
	})

	t.Run("credential to json", func(t *testing.T) {
		json := identity.NewCredentialFromJson("{}").ToJson()
		assert.Equal(t, json, "{}")
	})

	t.Run("credential from json", func(t *testing.T) {
		credential := identity.NewCredentialFromJson("{}")
		assert.Equal(t, credential.ToJson(), "{}")
	})

	t.Run("verify credential", func(t *testing.T) {
		identityClient := NewIdentityClient()
		credential := identity.NewCredentialFromJson("{}")
		_, err := identityClient.VerifyCredential(credential)
		assert.Error(t, err)
		assert.Equal(t, err.Error(), "not implemented")
	})

	t.Run("revoke credential", func(t *testing.T) {
		identityClient := NewIdentityClient()
		credential := identity.NewCredentialFromJson("{}")
		_, err := identityClient.RevokeCredential(credential)
		assert.Error(t, err)
		assert.Equal(t, err.Error(), "not implemented")
	})
}
