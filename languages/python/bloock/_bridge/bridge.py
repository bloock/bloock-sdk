from .channel import Channel
from .proto import anchor_pb2_grpc, record_pb2_grpc, proof_pb2_grpc


class BloockBridge:
    def __init__(self):
        channel = Channel()
        self.Anchor = anchor_pb2_grpc.AnchorServiceStub(channel)
        self.Record = record_pb2_grpc.RecordServiceStub(channel)
        self.Proof = proof_pb2_grpc.ProofServiceStub(channel)

    def anchor(self) -> anchor_pb2_grpc.AnchorServiceStub:
        return self.Anchor

    def record(self) -> record_pb2_grpc.RecordServiceStub:
        return self.Record

    def proof(self) -> proof_pb2_grpc.ProofServiceStub:
        return self.Proof
