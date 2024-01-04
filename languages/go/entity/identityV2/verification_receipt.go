package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type VerificationReceipt struct {
	SessionID int64
	VerificationRequest string
}

func NewVerificationReceiptFromProto(s *proto.VerificationReceipt) VerificationReceipt {
	if s == nil {
		return VerificationReceipt{}
	}
	return VerificationReceipt{
		SessionID: s.SessionId,
		VerificationRequest: s.VerificationRequest,
	}
}

func (i VerificationReceipt) ToProto() *proto.VerificationReceipt {
	return &proto.VerificationReceipt{
		SessionId: i.SessionID,
		VerificationRequest: i.VerificationRequest,
	}
}

