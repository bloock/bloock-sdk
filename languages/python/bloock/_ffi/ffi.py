import base64

from _bloock_bridge_lib import ffi, lib


def request(request_type, payload) -> bytes:
    encoded_payload = base64.b64encode(payload).decode("utf-8")
    response = lib.request(_to_c_str(request_type), _to_c_str(encoded_payload))
    return base64.b64decode(_read_c_str(response))


def _to_c_str(string):
    return ffi.new("char[]", string.encode())


def _read_c_str(c_str) -> str:
    python_str = ffi.string(c_str).decode()
    # lib.string_free(c_str)
    return python_str
