import { BloockBridge } from './api.mjs';

export class FFIClient {
  public static request(type: string, payload: string): string {
    return BloockBridge.request(type, payload);
  }
}
