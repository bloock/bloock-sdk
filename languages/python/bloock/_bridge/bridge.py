from .channel import Channel
from .proto import bloock_pb2_grpc, anchor_pb2_grpc


class BloockBridge:
    def __init__(self):
        channel = Channel()
        self.Greeting = bloock_pb2_grpc.GreeterStub(channel)
        self.Anchor = anchor_pb2_grpc.AnchorServiceStub(channel)

    def greeting(self) -> bloock_pb2_grpc.GreeterStub:
        return self.Greeting

    def anchor(self) -> anchor_pb2_grpc.AnchorServiceStub:
        return self.Anchor
