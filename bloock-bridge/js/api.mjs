import wasm from "./wasm.mjs"
import * as diplomatRuntime from "./diplomat-runtime.mjs"
const diplomat_alloc_destroy_registry = new FinalizationRegistry(obj => {
  wasm.diplomat_free(obj["ptr"], obj["size"], obj["align"]);
});

const BloockBridge_box_destroy_registry = new FinalizationRegistry(underlying => {
  wasm.BloockBridge_destroy(underlying);
});

export class BloockBridge {
  constructor(underlying) {
    this.underlying = underlying;
  }

  static request(request_type, payload) {
    let request_type_diplomat_bytes = (new TextEncoder()).encode(request_type);
    let request_type_diplomat_ptr = wasm.diplomat_alloc(request_type_diplomat_bytes.length, 1);
    let request_type_diplomat_buf = new Uint8Array(wasm.memory.buffer, request_type_diplomat_ptr, request_type_diplomat_bytes.length);
    request_type_diplomat_buf.set(request_type_diplomat_bytes, 0);
    let payload_diplomat_bytes = (new TextEncoder()).encode(payload);
    let payload_diplomat_ptr = wasm.diplomat_alloc(payload_diplomat_bytes.length, 1);
    let payload_diplomat_buf = new Uint8Array(wasm.memory.buffer, payload_diplomat_ptr, payload_diplomat_bytes.length);
    payload_diplomat_buf.set(payload_diplomat_bytes, 0);
    const diplomat_out = diplomatRuntime.withWriteable(wasm, (writeable) => {
      return (() => {
        const is_ok = wasm.BloockBridge_request(request_type_diplomat_ptr, request_type_diplomat_bytes.length, payload_diplomat_ptr, payload_diplomat_bytes.length, writeable) == 1;
        if (!is_ok) {
          throw new diplomatRuntime.FFIError({});
        }
      })();
    });
    wasm.diplomat_free(request_type_diplomat_ptr, request_type_diplomat_bytes.length, 1);
    wasm.diplomat_free(payload_diplomat_ptr, payload_diplomat_bytes.length, 1);
    return diplomat_out;
  }

  get _phantom() {
    return (new Uint32Array(wasm.memory.buffer, this.underlying + 0, 1))[0];
  }
}
