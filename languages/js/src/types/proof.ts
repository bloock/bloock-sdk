import { Anchor } from './anchor';
import { Proof as WasmProof } from '../bloock_wasm_api';

/**
 * Proof is the object in charge of storing all data necessary to compute
 * a data integrity check.
 */
export class Proof {
  public hash: string;

  constructor(hash: string) {
    this.hash = hash;
  }

  static fromWasm(proof: WasmProof): Proof {
    return new Proof(proof.hash);
  }

  toWasm(): WasmProof {
    return new WasmProof(this.hash);
  }
}
