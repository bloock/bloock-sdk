package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// PublishIntervalParams represents different publish intervals.
type PublishIntervalParams int32

const (
	// Interval5 represents a 5-minute publish interval.
	Interval5 PublishIntervalParams = iota
	// Interval15 represents a 15-minute publish interval.
	Interval15 PublishIntervalParams = iota
	// Interval60 represents a 60-minute publish interval.
	Interval60 PublishIntervalParams = iota
)

var (
	PublishIntervalParamsFromProto = map[proto.PublishInterval]PublishIntervalParams{
		proto.PublishInterval_INTERVAL_5:  Interval5,
		proto.PublishInterval_INTERVAL_15: Interval15,
		proto.PublishInterval_INTERVAL_60: Interval60,
	}

	PublishIntervalParamsToProto = map[PublishIntervalParams]proto.PublishInterval{
		Interval5:  proto.PublishInterval_INTERVAL_5,
		Interval15: proto.PublishInterval_INTERVAL_15,
		Interval60: proto.PublishInterval_INTERVAL_60,
	}
)
