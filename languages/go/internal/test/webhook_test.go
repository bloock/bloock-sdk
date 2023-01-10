package test

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestVerifyWebhookSignature(t *testing.T) {
	sdk := GetSdk()
	t.Run("verify webhook signature ok", func(t *testing.T) {
		payload := []byte(`{"webhook_id":"80b505b4-df81-48f4-92a6-69cbc1a114a0","request_id":"8d30ef45-69a3-4cdd-8457-8cad485848f2","type":"core.bloock_chain","created_at":1672909660,"data":{"created_at":1672909591,"finalized":true,"id":105122,"message_count":1,"network":{"anchor_id":105122,"created_at":1672909661,"name":"bloock_chain","status":"Confirmed","test":false,"tx_hash":"0x53d1c7c1ff8100b921ce0ef593c81ed4e5e50eff888b3bb5c69260c13f0b2f58"},"root":"fd71e7ac128ff2219853e43e4044769df36c5329ce34655b4c5d166d1564d5b7","test":false}}`)
		header := "t=1672909660,v1=955e726c98d606ff5534d325f68854173411be61698ef7c5c466a5485f979a29"
		secret := "NHJTAE6ikKBccSaeCSBSWGdp7NmixXy7"
		isValid, err := sdk.VerifyWebhookSignature(payload, header, secret, false)
		assert.NoError(t, err)
		assert.True(t, isValid)
	})

	t.Run("verify webhook signature invalid secret", func(t *testing.T) {
		payload := []byte(`{"webhook_id":"80b505b4-df81-48f4-92a6-69cbc1a114a0","request_id":"8d30ef45-69a3-4cdd-8457-8cad485848f2","type":"core.bloock_chain","created_at":1672909660,"data":{"created_at":1672909591,"finalized":true,"id":105122,"message_count":1,"network":{"anchor_id":105122,"created_at":1672909661,"name":"bloock_chain","status":"Confirmed","test":false,"tx_hash":"0x53d1c7c1ff8100b921ce0ef593c81ed4e5e50eff888b3bb5c69260c13f0b2f58"},"root":"fd71e7ac128ff2219853e43e4044769df36c5329ce34655b4c5d166d1564d5b7","test":false}}`)
		header := "t=1672909660,v1=955e726c98d606ff5534d325f68854173411be61698ef7c5c466a5485f979a29"
		secret := "asdf"
		isValid, err := sdk.VerifyWebhookSignature(payload, header, secret, false)
		assert.NoError(t, err)
		assert.False(t, isValid)
	})
}
