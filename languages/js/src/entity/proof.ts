import { AnchorNetwork } from "./anchor";
import * as proto from "../bridge/proto/proof";

export class Proof {
  leaves: string[];
  nodes: string[];
  depth: string;
  bitmap: string;
  anchor: ProofAnchor;

  constructor(
    leaves: string[],
    nodes: string[],
    depth: string,
    bitmap: string,
    anchor: ProofAnchor
  ) {
    this.leaves = leaves;
    this.nodes = nodes;
    this.depth = depth;
    this.bitmap = bitmap;
    this.anchor = anchor;
  }

  static fromProto(p: proto.Proof): Proof {
    return new Proof(
      p.leaves,
      p.nodes,
      p.depth,
      p.bitmap,
      ProofAnchor.fromProto(p.anchor!)
    );
  }

  toProto(): proto.Proof {
    return proto.Proof.fromPartial({
      leaves: this.leaves,
      nodes: this.nodes,
      depth: this.depth,
      bitmap: this.bitmap,
      anchor: this.anchor.toProto()
    });
  }
}

export class ProofAnchor {
  anchorID: number;
  networks: AnchorNetwork[];
  root: string;
  status: string;

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
