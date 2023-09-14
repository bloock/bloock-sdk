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
        self.GenerateLocalCertificate = channel.unary_unary(
                '/bloock.KeyService/GenerateLocalCertificate',
                request_serializer=keys__pb2.GenerateLocalCertificateRequest.SerializeToString,
                response_deserializer=keys__pb2.GenerateLocalCertificateResponse.FromString,
                )
        self.GenerateManagedCertificate = channel.unary_unary(
                '/bloock.KeyService/GenerateManagedCertificate',
                request_serializer=keys__pb2.GenerateManagedCertificateRequest.SerializeToString,
                response_deserializer=keys__pb2.GenerateManagedCertificateResponse.FromString,
                )
        self.LoadLocalCertificate = channel.unary_unary(
                '/bloock.KeyService/LoadLocalCertificate',
                request_serializer=keys__pb2.LoadLocalCertificateRequest.SerializeToString,
                response_deserializer=keys__pb2.LoadLocalCertificateResponse.FromString,
                )
        self.LoadManagedCertificate = channel.unary_unary(
                '/bloock.KeyService/LoadManagedCertificate',
                request_serializer=keys__pb2.LoadManagedCertificateRequest.SerializeToString,
                response_deserializer=keys__pb2.LoadManagedCertificateResponse.FromString,
                )
        self.ImportManagedCertificate = channel.unary_unary(
                '/bloock.KeyService/ImportManagedCertificate',
                request_serializer=keys__pb2.ImportManagedCertificateRequest.SerializeToString,
                response_deserializer=keys__pb2.ImportManagedCertificateResponse.FromString,
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

    def GenerateLocalCertificate(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GenerateManagedCertificate(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def LoadLocalCertificate(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def LoadManagedCertificate(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def ImportManagedCertificate(self, request, context):
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
            'GenerateLocalCertificate': grpc.unary_unary_rpc_method_handler(
                    servicer.GenerateLocalCertificate,
                    request_deserializer=keys__pb2.GenerateLocalCertificateRequest.FromString,
                    response_serializer=keys__pb2.GenerateLocalCertificateResponse.SerializeToString,
            ),
            'GenerateManagedCertificate': grpc.unary_unary_rpc_method_handler(
                    servicer.GenerateManagedCertificate,
                    request_deserializer=keys__pb2.GenerateManagedCertificateRequest.FromString,
                    response_serializer=keys__pb2.GenerateManagedCertificateResponse.SerializeToString,
            ),
            'LoadLocalCertificate': grpc.unary_unary_rpc_method_handler(
                    servicer.LoadLocalCertificate,
                    request_deserializer=keys__pb2.LoadLocalCertificateRequest.FromString,
                    response_serializer=keys__pb2.LoadLocalCertificateResponse.SerializeToString,
            ),
            'LoadManagedCertificate': grpc.unary_unary_rpc_method_handler(
                    servicer.LoadManagedCertificate,
                    request_deserializer=keys__pb2.LoadManagedCertificateRequest.FromString,
                    response_serializer=keys__pb2.LoadManagedCertificateResponse.SerializeToString,
            ),
            'ImportManagedCertificate': grpc.unary_unary_rpc_method_handler(
                    servicer.ImportManagedCertificate,
                    request_deserializer=keys__pb2.ImportManagedCertificateRequest.FromString,
                    response_serializer=keys__pb2.ImportManagedCertificateResponse.SerializeToString,
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

    @staticmethod
    def GenerateLocalCertificate(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.KeyService/GenerateLocalCertificate',
            keys__pb2.GenerateLocalCertificateRequest.SerializeToString,
            keys__pb2.GenerateLocalCertificateResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GenerateManagedCertificate(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.KeyService/GenerateManagedCertificate',
            keys__pb2.GenerateManagedCertificateRequest.SerializeToString,
            keys__pb2.GenerateManagedCertificateResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def LoadLocalCertificate(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.KeyService/LoadLocalCertificate',
            keys__pb2.LoadLocalCertificateRequest.SerializeToString,
            keys__pb2.LoadLocalCertificateResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def LoadManagedCertificate(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.KeyService/LoadManagedCertificate',
            keys__pb2.LoadManagedCertificateRequest.SerializeToString,
            keys__pb2.LoadManagedCertificateResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def ImportManagedCertificate(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.KeyService/ImportManagedCertificate',
            keys__pb2.ImportManagedCertificateRequest.SerializeToString,
            keys__pb2.ImportManagedCertificateResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
