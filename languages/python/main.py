from bloock import _bridge
from bloock._bridge.proto import bloock_pb2
from bloock._bridge.proto import anchor_pb2
from bloock._bridge.proto import config_pb2
from bloock._bridge.proto.config_pb2 import Configuration
from bloock._bridge.proto.config_pb2 import NetworkConfig
from bloock._bridge.proto.config_pb2 import Network


bridge = _bridge.BloockBridge()

config = config_pb2.ConfigData(
    config=Configuration(
        api_key="test_api_key",
        host="https://api.bloock.dev",
    ),
    networks_config={Network.ETHEREUM_MAINNET: NetworkConfig()},
)

print("-------------- SayHelloWithError --------------")
helloRequest = bloock_pb2.HelloRequest(name="Marc")
sayHelloResponse = bridge.greeting().SayHelloWithError(helloRequest)
print(sayHelloResponse)

print("-------------- Get Anchor --------------")
getAnchorRequest = anchor_pb2.GetAnchorRequest(anchor_id=500, config_data=config)
getAnchorResponse = bridge.anchor().GetAnchor(getAnchorRequest)
print(getAnchorResponse)
