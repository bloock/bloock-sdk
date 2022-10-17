from cffi import FFI
from typing import List
import sys
import os
import platform

ffi_builder = FFI()

env = os.environ.get("BLOOCK_ENV", "DEVELOPMENT")

if env == "CI":
    lib_dirs = "bloock/_ffi/native"
else:
    if sys.platform.startswith("linux"):
        lib_dirs = "bloock/_ffi/native/x86_64-unknown-linux-musl"
    elif sys.platform.startswith("win"):
        lib_dirs = "bloock/_ffi/native/x86_64-pc-windows-gnu"
    elif platform.machine() == "x86_64" and sys.platform.startswith("darwin"):
        lib_dirs = "bloock/_ffi/native/x86_64-apple-darwin"
    else:
        lib_dirs = "bloock/_ffi/native/aarch64-apple-darwin"


include_dir = "bloock/_ffi/native"

libs: List[str] = []
if sys.platform.startswith("win"):
    libs.extend(
        (
            f"{lib_dirs}/libbloock_bridge.lib",
            "Ws2_32.lib",
            "advapi32.lib",
            "userenv.lib",
            "bcrypt.lib",
        )
    )
elif sys.platform.startswith("darwin"):
    libs.extend(("-framework", "Security"))
    libs.append(f"{lib_dirs}/libbloock_bridge.a")
else:
    libs.append(f"{lib_dirs}/libbloock_bridge.a")

ffi_builder.set_source(
    "_bloock_bridge_lib",
    r"""
    #include "bloock_bridge.h"
    """,
    library_dirs=[lib_dirs],
    include_dirs=[include_dir],
    libraries=["rt"] if sys.platform.startswith("linux") else [],
    extra_link_args=libs,
)

with open(f"{include_dir}/bloock_bridge.h") as f:
    header = f.read()
    ffi_builder.cdef(header)


if __name__ == "__main__":  # not when running with setuptools
    ffi_builder.compile(verbose=True)
