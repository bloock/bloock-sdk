# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from . import bloock_identity_core_pb2 as bloock__identity__core__pb2


class IdentityCoreServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.CreateCoreCredential = channel.unary_unary(
                '/bloock.IdentityCoreService/CreateCoreCredential',
                request_serializer=bloock__identity__core__pb2.CreateCoreCredentialRequest.SerializeToString,
                response_deserializer=bloock__identity__core__pb2.CreateCoreCredentialResponse.FromString,
                )


class IdentityCoreServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def CreateCoreCredential(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_IdentityCoreServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'CreateCoreCredential': grpc.unary_unary_rpc_method_handler(
                    servicer.CreateCoreCredential,
                    request_deserializer=bloock__identity__core__pb2.CreateCoreCredentialRequest.FromString,
                    response_serializer=bloock__identity__core__pb2.CreateCoreCredentialResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'bloock.IdentityCoreService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class IdentityCoreService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def CreateCoreCredential(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.IdentityCoreService/CreateCoreCredential',
            bloock__identity__core__pb2.CreateCoreCredentialRequest.SerializeToString,
            bloock__identity__core__pb2.CreateCoreCredentialResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)