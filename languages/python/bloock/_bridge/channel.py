import grpc

from .._ffi.ffi import request as FfiRequest


class Channel(grpc.Channel):
    def unary_unary(self, method, request_serializer=None, response_deserializer=None):
        return _UnaryCallable(method, request_serializer, response_deserializer)

    def subscribe(self, callback, try_to_connect=False):
        pass

    def unsubscribe(self, callback):
        pass

    def unary_stream(self, method, request_serializer=None, response_deserializer=None):
        pass

    def stream_unary(self, method, request_serializer=None, response_deserializer=None):
        pass

    def stream_stream(
        self, method, request_serializer=None, response_deserializer=None
    ):
        pass

    def close(self):
        pass

    def __enter__(self):
        pass

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass


def _transform(message, transformer):
    if transformer is None:
        return message
    else:
        try:
            return transformer(message)
        except Exception:  # pylint: disable=broad-except
            return None


class _UnaryCallable(grpc.UnaryUnaryMultiCallable):
    def __init__(self, method, request_serializer, response_deserializer):
        self._method = method
        self._request_serializer = request_serializer
        self._response_deserializer = response_deserializer

    def __call__(
        self,
        request,
        timeout=None,
        metadata=None,
        credentials=None,
        wait_for_ready=None,
        compression=None,
    ):
        serialized_request = _transform(request, self._request_serializer)
        response = FfiRequest(self._method, serialized_request)
        return _transform(response, self._response_deserializer)

    def with_call(
        self,
        request,
        timeout=None,
        metadata=None,
        credentials=None,
        wait_for_ready=None,
        compression=None,
    ):
        pass

    def future(
        self,
        request,
        timeout=None,
        metadata=None,
        credentials=None,
        wait_for_ready=None,
        compression=None,
    ):
        pass
