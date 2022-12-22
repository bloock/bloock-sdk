import { base64ToBytes, bytesToBase64 } from "./base64";
import init, { request } from "./native/bloock_bridge";

export class FFIClient {
  private static instance: FFIClient;
  private ready: Promise<void>;

  private constructor() {
    this.ready = new Promise((resolve, reject) => {
      this.init()
        .then(resolve)
        .catch(reject);
    });
  }

  static getInstance() {
    if (!FFIClient.instance) {
      FFIClient.instance = new FFIClient();
    }
    return FFIClient.instance;
  }

  public async request(type: string, payload: Uint8Array): Promise<Uint8Array> {
    await this.ready;

    let response = await request(type, bytesToBase64(payload));
    return base64ToBytes(response);
  }

  private async init() {
    let wasmFile;
    if (typeof window === "undefined") {
      // Node
      const fs = await import("fs");
      wasmFile = new Uint8Array(
        fs.readFileSync(__dirname + "/bloock_bridge_bg.wasm")
      );
    } else {
      // Browser
      const wasmPath = new URL(
        "bloock_bridge_bg.wasm",
        import.meta.url
      ).toString();
      wasmFile = await fetch(wasmPath);
    }
    await init(wasmFile);
  }
}
