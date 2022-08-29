from cffi import FFI
from typing import List
import sys

ffi_builder = FFI()

lib_dirs = "./bloock/_ffi/native/aarch64-apple-darwin"
include_dir = "./bloock/_ffi/native"
libs: List[str] = []
if sys.platform.startswith("win"):
    libs.extend(
        (
            f"{lib_dirs}/polar.lib",
            "Ws2_32.lib",
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
