package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type PublishIntervalParams int32

const (
	Interval1  PublishIntervalParams = iota
	Interval5  PublishIntervalParams = iota
	Interval15 PublishIntervalParams = iota
	Interval60 PublishIntervalParams = iota
)

var (
	PublishIntervalParamsFromProto = map[proto.PublishInterval]PublishIntervalParams{
		proto.PublishInterval_INTERVAL_1:  Interval1,
		proto.PublishInterval_INTERVAL_5:  Interval5,
		proto.PublishInterval_INTERVAL_15: Interval15,
		proto.PublishInterval_INTERVAL_60: Interval60,
	}

	PublishIntervalParamsToProto = map[PublishIntervalParams]proto.PublishInterval{
		Interval1:  proto.PublishInterval_INTERVAL_1,
		Interval5:  proto.PublishInterval_INTERVAL_5,
		Interval15: proto.PublishInterval_INTERVAL_15,
		Interval60: proto.PublishInterval_INTERVAL_60,
	}
)
