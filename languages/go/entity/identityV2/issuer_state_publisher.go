package identityV2

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type IssuerStatePublisher struct {
	issuerDid  string
	signer     *proto.Signer
	configData *proto.ConfigData
}

func NewIssuerStatePublisher(issuerDid string, configData *proto.ConfigData) IssuerStatePublisher {
	return IssuerStatePublisher{
		issuerDid:  issuerDid,
		configData: configData,
	}
}

func (i IssuerStatePublisher) WithSigner(signer authenticity.Signer) IssuerStatePublisher {
	i.signer = signer.ToProto()
	return i
}

func (i IssuerStatePublisher) Build() (IssuerStateReceipt, error) {
	bridge := bridge.NewBloockBridge()

	req := proto.PublishIssuerStateRequest{
		IssuerDid:  i.issuerDid,
		Signer:     i.signer,
		ConfigData: i.configData,
	}

	res, err := bridge.IdentityV2().PublishIssuerState(context.Background(), &req)
	if err != nil {
		return IssuerStateReceipt{}, err
	}

	if res.Error != nil {
		return IssuerStateReceipt{}, errors.New(res.Error.Message)
	}

	return NewIssuerStateReceiptFromProto(res.GetStateReceipt()), nil
}
