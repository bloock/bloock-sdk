import { Anchor as WasmAnchor } from '../bloock_wasm_api';
import { AnchorNetwork as WasmAnchorNetwork } from '../bloock_wasm_api';

export class AnchorNetwork {
  public name: string;
  public state: string;
  public txHash: string;

  constructor(name: string, state: string, txHash: string) {
    this.name = name;
    this.state = state;
    this.txHash = txHash;
  }

  static fromWasm(anchor: WasmAnchorNetwork): AnchorNetwork {
    return new AnchorNetwork(anchor.name, anchor.state, anchor.tx_hash);
  }
}

export class Anchor {
  public id: number;
  public blockRoots: string[];
  public networks: AnchorNetwork[];
  public root: string;
  public status: string;

  constructor(
    id: number,
    blockRoots: string[],
    networks: AnchorNetwork[],
    root: string,
    status: string
  ) {
    this.id = id;
    this.blockRoots = blockRoots;
    this.networks = networks;
    this.root = root;
    this.status = status;
  }

  static fromWasm(anchor: WasmAnchor): Anchor {
    return new Anchor(
      Number(anchor.id),
      anchor.block_roots,
      anchor.networks.map((n: WasmAnchorNetwork) => AnchorNetwork.fromWasm(n)),
      anchor.root,
      anchor.status
    );
  }
}
