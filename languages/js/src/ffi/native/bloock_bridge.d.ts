/* tslint:disable */
/* eslint-disable */
/**
* @param {string} request_type
* @param {string} payload
* @returns {Promise<any>}
*/
export function request(request_type: string, payload: string): Promise<any>;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly request: (a: number, b: number, c: number, d: number) => number;
  readonly rustsecp256k1_v0_5_0_context_create: (a: number) => number;
  readonly rustsecp256k1_v0_5_0_context_destroy: (a: number) => void;
  readonly rustsecp256k1_v0_5_0_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_5_0_default_error_callback_fn: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he198c3b73f8043c1: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h86d90b4ab5ca7f0f: (a: number, b: number, c: number, d: number) => void;
}

/**
* Synchronously compiles the given `bytes` and instantiates the WebAssembly module.
*
* @param {BufferSource} bytes
*
* @returns {InitOutput}
*/
export function initSync(bytes: BufferSource): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
