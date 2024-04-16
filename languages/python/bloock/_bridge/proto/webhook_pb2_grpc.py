# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import webhook_pb2 as webhook__pb2


class WebhookServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.VerifyWebhookSignature = channel.unary_unary(
                '/bloock.WebhookService/VerifyWebhookSignature',
                request_serializer=webhook__pb2.VerifyWebhookSignatureRequest.SerializeToString,
                response_deserializer=webhook__pb2.VerifyWebhookSignatureResponse.FromString,
                )


class WebhookServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def VerifyWebhookSignature(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_WebhookServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'VerifyWebhookSignature': grpc.unary_unary_rpc_method_handler(
                    servicer.VerifyWebhookSignature,
                    request_deserializer=webhook__pb2.VerifyWebhookSignatureRequest.FromString,
                    response_serializer=webhook__pb2.VerifyWebhookSignatureResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'bloock.WebhookService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class WebhookService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def VerifyWebhookSignature(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/bloock.WebhookService/VerifyWebhookSignature',
            webhook__pb2.VerifyWebhookSignatureRequest.SerializeToString,
            webhook__pb2.VerifyWebhookSignatureResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
