import * as diplomatRuntime from "./diplomat-runtime.js"

export class BloockBridge {
  constructor(underlying) {
    this._phantom = (new Uint32Array(wasm.memory.buffer, underlying, 1))[0];
  }

  static request(wasm, arg_request_type, arg_payload) {
    const buf_arg_request_type = diplomatRuntime.DiplomatBuf.str(wasm, arg_request_type);
    const buf_arg_payload = diplomatRuntime.DiplomatBuf.str(wasm, arg_payload);
    const diplomat_out = diplomatRuntime.withWriteable(wasm, (writeable) => {
      return (() => {
        const is_ok = wasm.BloockBridge_request(buf_arg_request_type.ptr, buf_arg_request_type.size, buf_arg_payload.ptr, buf_arg_payload.size, writeable) == 1;
        if (!is_ok) {
          throw new diplomatRuntime.FFIError(undefined);
        }
      })();
    });
    buf_arg_request_type.free();
    buf_arg_payload.free();
    return diplomat_out;
  }
}
