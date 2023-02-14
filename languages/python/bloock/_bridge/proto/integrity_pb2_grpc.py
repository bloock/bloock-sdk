# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from . import integrity_pb2 as integrity__pb2


class IntegrityServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.SendRecords = channel.unary_unary(
            "/bloock.IntegrityService/SendRecords",
            request_serializer=integrity__pb2.SendRecordsRequest.SerializeToString,
            response_deserializer=integrity__pb2.SendRecordsResponse.FromString,
        )
        self.GetAnchor = channel.unary_unary(
            "/bloock.IntegrityService/GetAnchor",
            request_serializer=integrity__pb2.GetAnchorRequest.SerializeToString,
            response_deserializer=integrity__pb2.GetAnchorResponse.FromString,
        )
        self.WaitAnchor = channel.unary_unary(
            "/bloock.IntegrityService/WaitAnchor",
            request_serializer=integrity__pb2.WaitAnchorRequest.SerializeToString,
            response_deserializer=integrity__pb2.WaitAnchorResponse.FromString,
        )
        self.GetProof = channel.unary_unary(
            "/bloock.IntegrityService/GetProof",
            request_serializer=integrity__pb2.GetProofRequest.SerializeToString,
            response_deserializer=integrity__pb2.GetProofResponse.FromString,
        )
        self.ValidateRoot = channel.unary_unary(
            "/bloock.IntegrityService/ValidateRoot",
            request_serializer=integrity__pb2.ValidateRootRequest.SerializeToString,
            response_deserializer=integrity__pb2.ValidateRootResponse.FromString,
        )
        self.VerifyProof = channel.unary_unary(
            "/bloock.IntegrityService/VerifyProof",
            request_serializer=integrity__pb2.VerifyProofRequest.SerializeToString,
            response_deserializer=integrity__pb2.VerifyProofResponse.FromString,
        )
        self.VerifyRecords = channel.unary_unary(
            "/bloock.IntegrityService/VerifyRecords",
            request_serializer=integrity__pb2.VerifyRecordsRequest.SerializeToString,
            response_deserializer=integrity__pb2.VerifyRecordsResponse.FromString,
        )


class IntegrityServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def SendRecords(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")

    def GetAnchor(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")

    def WaitAnchor(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")

    def GetProof(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")

    def ValidateRoot(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")

    def VerifyProof(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")

    def VerifyRecords(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")


def add_IntegrityServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
        "SendRecords": grpc.unary_unary_rpc_method_handler(
            servicer.SendRecords,
            request_deserializer=integrity__pb2.SendRecordsRequest.FromString,
            response_serializer=integrity__pb2.SendRecordsResponse.SerializeToString,
        ),
        "GetAnchor": grpc.unary_unary_rpc_method_handler(
            servicer.GetAnchor,
            request_deserializer=integrity__pb2.GetAnchorRequest.FromString,
            response_serializer=integrity__pb2.GetAnchorResponse.SerializeToString,
        ),
        "WaitAnchor": grpc.unary_unary_rpc_method_handler(
            servicer.WaitAnchor,
            request_deserializer=integrity__pb2.WaitAnchorRequest.FromString,
            response_serializer=integrity__pb2.WaitAnchorResponse.SerializeToString,
        ),
        "GetProof": grpc.unary_unary_rpc_method_handler(
            servicer.GetProof,
            request_deserializer=integrity__pb2.GetProofRequest.FromString,
            response_serializer=integrity__pb2.GetProofResponse.SerializeToString,
        ),
        "ValidateRoot": grpc.unary_unary_rpc_method_handler(
            servicer.ValidateRoot,
            request_deserializer=integrity__pb2.ValidateRootRequest.FromString,
            response_serializer=integrity__pb2.ValidateRootResponse.SerializeToString,
        ),
        "VerifyProof": grpc.unary_unary_rpc_method_handler(
            servicer.VerifyProof,
            request_deserializer=integrity__pb2.VerifyProofRequest.FromString,
            response_serializer=integrity__pb2.VerifyProofResponse.SerializeToString,
        ),
        "VerifyRecords": grpc.unary_unary_rpc_method_handler(
            servicer.VerifyRecords,
            request_deserializer=integrity__pb2.VerifyRecordsRequest.FromString,
            response_serializer=integrity__pb2.VerifyRecordsResponse.SerializeToString,
        ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
        "bloock.IntegrityService", rpc_method_handlers
    )
    server.add_generic_rpc_handlers((generic_handler,))


# This class is part of an EXPERIMENTAL API.
class IntegrityService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def SendRecords(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/bloock.IntegrityService/SendRecords",
            integrity__pb2.SendRecordsRequest.SerializeToString,
            integrity__pb2.SendRecordsResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )

    @staticmethod
    def GetAnchor(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/bloock.IntegrityService/GetAnchor",
            integrity__pb2.GetAnchorRequest.SerializeToString,
            integrity__pb2.GetAnchorResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )

    @staticmethod
    def WaitAnchor(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/bloock.IntegrityService/WaitAnchor",
            integrity__pb2.WaitAnchorRequest.SerializeToString,
            integrity__pb2.WaitAnchorResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )

    @staticmethod
    def GetProof(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/bloock.IntegrityService/GetProof",
            integrity__pb2.GetProofRequest.SerializeToString,
            integrity__pb2.GetProofResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )

    @staticmethod
    def ValidateRoot(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/bloock.IntegrityService/ValidateRoot",
            integrity__pb2.ValidateRootRequest.SerializeToString,
            integrity__pb2.ValidateRootResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )

    @staticmethod
    def VerifyProof(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/bloock.IntegrityService/VerifyProof",
            integrity__pb2.VerifyProofRequest.SerializeToString,
            integrity__pb2.VerifyProofResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )

    @staticmethod
    def VerifyRecords(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/bloock.IntegrityService/VerifyRecords",
            integrity__pb2.VerifyRecordsRequest.SerializeToString,
            integrity__pb2.VerifyRecordsResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )
