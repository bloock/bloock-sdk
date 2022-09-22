import init, { request } from "./native/bloock_bridge";

export class FFIClient {
  private ready: Promise<void>;

  constructor() {
    this.ready = new Promise((resolve, reject) => {
      this.init().then(resolve).catch(reject);
    });
  }
  public async request(type: string, payload: string): Promise<string> {
    await this.ready;
    let buffer = Buffer.from(payload);
    return request(type, buffer.toString("base64"));
  }

  private async init() {
    const wasmPath = (await import("path")).resolve(
      __dirname,
      "./bloock_bridge_bg.wasm"
    );
    let wasmFile;

    if (typeof window === "undefined") {
      // Node
      wasmFile = new Uint8Array((await import("fs")).readFileSync(wasmPath));
    } else {
      // Browser
      wasmFile = await fetch(wasmPath);
    }

    await init(wasmFile);
  }
}
