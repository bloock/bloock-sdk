import { FFIClient } from "../ffi/ffi";

export class Connection {
  private ffiClient: FFIClient;

  constructor() {
    this.ffiClient = FFIClient.getInstance();
  }

  async request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array> {
    return await this.ffiClient.request(`/${service}/${method}`, data);
  }
}
