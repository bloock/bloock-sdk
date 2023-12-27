# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from . import authenticity_pb2 as authenticity__pb2


class AuthenticityServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.Sign = channel.unary_unary(
                '/bloock.AuthenticityService/Sign',
                request_serializer=authenticity__pb2.SignRequest.SerializeToString,
                response_deserializer=authenticity__pb2.SignResponse.FromString,
                )
        self.Verify = channel.unary_unary(
                '/bloock.AuthenticityService/Verify',
                request_serializer=authenticity__pb2.VerifyRequest.SerializeToString,
                response_deserializer=authenticity__pb2.VerifyResponse.FromString,
                )
        self.GetSignatures = channel.unary_unary(
                '/bloock.AuthenticityService/GetSignatures',
                request_serializer=authenticity__pb2.GetSignaturesRequest.SerializeToString,
                response_deserializer=authenticity__pb2.GetSignaturesResponse.FromString,
                )


class AuthenticityServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def Sign(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def Verify(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetSignatures(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_AuthenticityServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'Sign': grpc.unary_unary_rpc_method_handler(
                    servicer.Sign,
                    request_deserializer=authenticity__pb2.SignRequest.FromString,
                    response_serializer=authenticity__pb2.SignResponse.SerializeToString,
            ),
            'Verify': grpc.unary_unary_rpc_method_handler(
                    servicer.Verify,
                    request_deserializer=authenticity__pb2.VerifyRequest.FromString,
                    response_serializer=authenticity__pb2.VerifyResponse.SerializeToString,
            ),
            'GetSignatures': grpc.unary_unary_rpc_method_handler(
                    servicer.GetSignatures,
                    request_deserializer=authenticity__pb2.GetSignaturesRequest.FromString,
                    response_serializer=authenticity__pb2.GetSignaturesResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'bloock.AuthenticityService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class AuthenticityService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def Sign(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.AuthenticityService/Sign',
            authenticity__pb2.SignRequest.SerializeToString,
            authenticity__pb2.SignResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def Verify(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.AuthenticityService/Verify',
            authenticity__pb2.VerifyRequest.SerializeToString,
            authenticity__pb2.VerifyResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetSignatures(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.AuthenticityService/GetSignatures',
            authenticity__pb2.GetSignaturesRequest.SerializeToString,
            authenticity__pb2.GetSignaturesResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
