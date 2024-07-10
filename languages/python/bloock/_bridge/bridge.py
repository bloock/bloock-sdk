from .channel import Channel
from .proto import (
    bloock_authenticity_pb2_grpc,
    bloock_availability_pb2_grpc,
    bloock_encryption_pb2_grpc,
    bloock_identity_pb2_grpc,
    bloock_identity_core_pb2_grpc,
    bloock_integrity_pb2_grpc,
    bloock_keys_pb2_grpc,
    bloock_record_pb2_grpc,
    bloock_webhook_pb2_grpc,
)


class BloockBridge:
    def __init__(self):
        channel = Channel()
        self._authenticity = bloock_authenticity_pb2_grpc.AuthenticityServiceStub(channel)
        self._availability = bloock_availability_pb2_grpc.AvailabilityServiceStub(channel)
        self._encryption = bloock_encryption_pb2_grpc.EncryptionServiceStub(channel)
        self._identity = bloock_identity_pb2_grpc.IdentityServiceStub(channel)
        self._identity_core = bloock_identity_core_pb2_grpc.IdentityCoreServiceStub(channel)
        self._integrity = bloock_integrity_pb2_grpc.IntegrityServiceStub(channel)
        self._key = bloock_keys_pb2_grpc.KeyServiceStub(channel)
        self._record = bloock_record_pb2_grpc.RecordServiceStub(channel)
        self._webhook = bloock_webhook_pb2_grpc.WebhookServiceStub(channel)

    def authenticity(self) -> bloock_authenticity_pb2_grpc.AuthenticityServiceStub:
        return self._authenticity

    def availability(self) -> bloock_availability_pb2_grpc.AvailabilityServiceStub:
        return self._availability

    def encryption(self) -> bloock_encryption_pb2_grpc.EncryptionServiceStub:
        return self._encryption

    def identity(self) -> bloock_identity_pb2_grpc.IdentityServiceStub:
        return self._identity
    
    def identity_core(self) -> bloock_identity_core_pb2_grpc.IdentityCoreServiceStub:
        return self._identity_core

    def integrity(self) -> bloock_integrity_pb2_grpc.IntegrityServiceStub:
        return self._integrity

    def key(self) -> bloock_keys_pb2_grpc.KeyServiceStub:
        return self._key

    def record(self) -> bloock_record_pb2_grpc.RecordServiceStub:
        return self._record

    def webhook(self) -> bloock_webhook_pb2_grpc.WebhookServiceStub:
        return self._webhook
