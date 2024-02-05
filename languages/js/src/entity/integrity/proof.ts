import * as proto from "../../bridge/proto/integrity_entities";
import { ProofAnchor } from "./proof_anchor";

/**
 * Represents a proof, including leaves, nodes, depth, bitmap, and anchor information.
 */
export class Proof {
  leaves: string[];
  nodes: string[];
  depth: string;
  bitmap: string;
  anchor: ProofAnchor;

  /**
   * Constructs a Proof object with the specified parameters.
   * @param leaves 
   * @param nodes 
   * @param depth 
   * @param bitmap 
   * @param anchor 
   */
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
