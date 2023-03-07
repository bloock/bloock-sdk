import * as proto from "../../bridge/proto/integrity_entities";
import { ProofAnchor } from "./proof_anchor";

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
