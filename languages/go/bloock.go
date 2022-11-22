package bloock

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

var ApiKey string
var ApiHost string
var NetworkConfig map[int32]*proto.NetworkConfig = make(map[int32]*proto.NetworkConfig)
