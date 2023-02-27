from .channel import Channel
from .proto import (
    authenticity_pb2_grpc,
    availability_pb2_grpc,
    encryption_pb2_grpc,
    identity_pb2_grpc,
    integrity_pb2_grpc,
    keys_pb2_grpc,
    record_pb2_grpc,
    webhook_pb2_grpc,
)


class BloockBridge:
    def __init__(self):
        channel = Channel()
        self._authenticity = authenticity_pb2_grpc.AuthenticityServiceStub(channel)
        self._availability = availability_pb2_grpc.AvailabilityServiceStub(channel)
        self._encryption = encryption_pb2_grpc.EncryptionServiceStub(channel)
        self._identity = identity_pb2_grpc.IdentityServiceStub(channel)
        self._integrity = integrity_pb2_grpc.IntegrityServiceStub(channel)
        self._key = keys_pb2_grpc.KeyServiceStub(channel)
        self._record = record_pb2_grpc.RecordServiceStub(channel)
        self._webhook = webhook_pb2_grpc.WebhookServiceStub(channel)

    def authenticity(self) -> authenticity_pb2_grpc.AuthenticityServiceStub:
        return self._authenticity

    def availability(self) -> availability_pb2_grpc.AvailabilityServiceStub:
        return self._availability

    def encryption(self) -> encryption_pb2_grpc.EncryptionServiceStub:
        return self._encryption

    def identity(self) -> identity_pb2_grpc.IdentityServiceStub:
        return self._identity

    def integrity(self) -> integrity_pb2_grpc.IntegrityServiceStub:
        return self._integrity

    def key(self) -> keys_pb2_grpc.KeyServiceStub:
        return self._key

    def record(self) -> record_pb2_grpc.RecordServiceStub:
        return self._record

    def webhook(self) -> webhook_pb2_grpc.WebhookServiceStub:
        return self._webhook
