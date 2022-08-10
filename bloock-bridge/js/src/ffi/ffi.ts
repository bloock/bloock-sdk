import { BloockBridge } from "./native";
import { initWasm } from "./native/diplomat-wasm";

export class FFIClient {
  private wasm: any;

  public async initFFI() {
    this.wasm = await initWasm();
  }
  public async request(type: string, payload: string): Promise<string> {
    if (!this.wasm) {
      await this.initFFI();
    }
    return BloockBridge.request(this.wasm, type, payload);
  }
}
