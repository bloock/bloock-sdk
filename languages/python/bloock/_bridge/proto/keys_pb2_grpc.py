# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from . import keys_pb2 as keys__pb2


class KeyServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GenerateLocalKey = channel.unary_unary(
                '/bloock.KeyService/GenerateLocalKey',
                request_serializer=keys__pb2.GenerateLocalKeyRequest.SerializeToString,
                response_deserializer=keys__pb2.GenerateLocalKeyResponse.FromString,
                )
        self.GenerateManagedKey = channel.unary_unary(
                '/bloock.KeyService/GenerateManagedKey',
                request_serializer=keys__pb2.GenerateManagedKeyRequest.SerializeToString,
                response_deserializer=keys__pb2.GenerateManagedKeyResponse.FromString,
                )
        self.LoadLocalKey = channel.unary_unary(
                '/bloock.KeyService/LoadLocalKey',
                request_serializer=keys__pb2.LoadLocalKeyRequest.SerializeToString,
                response_deserializer=keys__pb2.LoadLocalKeyResponse.FromString,
                )
        self.LoadManagedKey = channel.unary_unary(
                '/bloock.KeyService/LoadManagedKey',
                request_serializer=keys__pb2.LoadManagedKeyRequest.SerializeToString,
                response_deserializer=keys__pb2.LoadManagedKeyResponse.FromString,
                )


class KeyServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GenerateLocalKey(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GenerateManagedKey(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def LoadLocalKey(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def LoadManagedKey(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_KeyServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GenerateLocalKey': grpc.unary_unary_rpc_method_handler(
                    servicer.GenerateLocalKey,
                    request_deserializer=keys__pb2.GenerateLocalKeyRequest.FromString,
                    response_serializer=keys__pb2.GenerateLocalKeyResponse.SerializeToString,
            ),
            'GenerateManagedKey': grpc.unary_unary_rpc_method_handler(
                    servicer.GenerateManagedKey,
                    request_deserializer=keys__pb2.GenerateManagedKeyRequest.FromString,
                    response_serializer=keys__pb2.GenerateManagedKeyResponse.SerializeToString,
            ),
            'LoadLocalKey': grpc.unary_unary_rpc_method_handler(
                    servicer.LoadLocalKey,
                    request_deserializer=keys__pb2.LoadLocalKeyRequest.FromString,
                    response_serializer=keys__pb2.LoadLocalKeyResponse.SerializeToString,
            ),
            'LoadManagedKey': grpc.unary_unary_rpc_method_handler(
                    servicer.LoadManagedKey,
                    request_deserializer=keys__pb2.LoadManagedKeyRequest.FromString,
                    response_serializer=keys__pb2.LoadManagedKeyResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'bloock.KeyService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class KeyService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GenerateLocalKey(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.KeyService/GenerateLocalKey',
            keys__pb2.GenerateLocalKeyRequest.SerializeToString,
            keys__pb2.GenerateLocalKeyResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GenerateManagedKey(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.KeyService/GenerateManagedKey',
            keys__pb2.GenerateManagedKeyRequest.SerializeToString,
            keys__pb2.GenerateManagedKeyResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def LoadLocalKey(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.KeyService/LoadLocalKey',
            keys__pb2.LoadLocalKeyRequest.SerializeToString,
            keys__pb2.LoadLocalKeyResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def LoadManagedKey(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.KeyService/LoadManagedKey',
            keys__pb2.LoadManagedKeyRequest.SerializeToString,
            keys__pb2.LoadManagedKeyResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
