import { RecordReceipt as WasmRecordReceipt } from '../bloock_wasm_api';

export class RecordReceipt {
  public hash: string;

  constructor(hash: string) {
    this.hash = hash;
  }

  static fromWasm(receipt: WasmRecordReceipt): RecordReceipt {
    return new RecordReceipt(receipt.hash);
  }
}
