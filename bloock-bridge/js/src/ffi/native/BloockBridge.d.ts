import { u32 } from "./diplomat-runtime"
import { FFIError } from "./diplomat-runtime"

/**
 */
export class BloockBridge {
  _phantom: usize;

  /**
   * @throws {@link FFIError}<void>
   */
  static request(wasm: any, request_type: string, payload: string): string | never;
}
