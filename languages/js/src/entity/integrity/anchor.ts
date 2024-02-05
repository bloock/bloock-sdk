import * as proto from "../../bridge/proto/integrity_entities";
import { AnchorNetwork } from "./anchor_network";

/**
 * Represents information about an anchor.
 */
export class Anchor {
  id: number;
  blockRoots: string[];
  networks: AnchorNetwork[];
  root: string;
  status: string;

  /**
   * Constructs an Anchor object with the specified parameters.
   * @param id 
   * @param blockRoots 
   * @param networks 
   * @param root 
   * @param status 
   */
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

  static fromProto(a: proto.Anchor): Anchor {
    return new Anchor(
      a.id,
      a.blockRoots,
      a.networks.map(n => AnchorNetwork.fromProto(n)),
      a.root,
      a.status
    );
  }
}
