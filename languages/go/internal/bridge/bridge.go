package bridge

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type BloockBridge struct {
	authenticity proto.AuthenticityServiceClient
	availability proto.AvailabilityServiceClient
	encryption   proto.EncryptionServiceClient
	integrity    proto.IntegrityServiceClient
	record       proto.RecordServiceClient
	webhook      proto.WebhookServiceClient
}

func NewBloockBridge() BloockBridge {
	conn := NewBloockConnection()
	return BloockBridge{
		authenticity: proto.NewAuthenticityServiceClient(conn),
		availability: proto.NewAvailabilityServiceClient(conn),
		encryption:   proto.NewEncryptionServiceClient(conn),
		integrity:    proto.NewIntegrityServiceClient(conn),
		record:       proto.NewRecordServiceClient(conn),
		webhook:      proto.NewWebhookServiceClient(conn),
	}
}

func (b *BloockBridge) Authenticity() proto.AuthenticityServiceClient {
	return b.authenticity
}

func (b *BloockBridge) Availability() proto.AvailabilityServiceClient {
	return b.availability
}

func (b *BloockBridge) Encryption() proto.EncryptionServiceClient {
	return b.encryption
}

func (b *BloockBridge) Integrity() proto.IntegrityServiceClient {
	return b.integrity
}

func (b *BloockBridge) Record() proto.RecordServiceClient {
	return b.record
}

func (b *BloockBridge) Webhook() proto.WebhookServiceClient {
	return b.webhook
}
