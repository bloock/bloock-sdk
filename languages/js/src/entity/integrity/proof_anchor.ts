import * as proto from "../../bridge/proto/integrity_entities";
import { AnchorNetwork } from "./anchor_network";

/**
 * Represents a proof anchor.
 */
export class ProofAnchor {
  anchorID: number;
  networks: AnchorNetwork[];
  root: string;
  status: string;

  /**
   * Constructs a ProofAnchor object with the specified parameters.
   * @param anchorID 
   * @param networks 
   * @param root 
   * @param status 
   */
  constructor(
    anchorID: number,
    networks: AnchorNetwork[],
    root: string,
    status: string
  ) {
    this.anchorID = anchorID;
    this.networks = networks;
    this.root = root;
    this.status = status;
  }

  static fromProto(p: proto.ProofAnchor): ProofAnchor {
    return new ProofAnchor(
      p.anchorId,
      p.networks.map(x => AnchorNetwork.fromProto(x)),
      p.root,
      p.status
    );
  }

  toProto(): proto.ProofAnchor {
    return proto.ProofAnchor.fromPartial({
      anchorId: this.anchorID,
      networks: this.networks.map(n => n.toProto()),
      root: this.root,
      status: this.status
    });
  }
}
