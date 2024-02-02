package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.IntegrityEntities;
import java.util.List;

/**
 * Represents a proof, including leaves, nodes, depth, bitmap, and anchor information.
 */
public class Proof {
  List<String> leaves;
  List<String> nodes;
  String depth;
  String bitmap;
  ProofAnchor anchor;

  /**
   * Constructs a Proof object with the specified parameters.
   * @param leaves
   * @param nodes
   * @param depth
   * @param bitmap
   * @param anchor
   */
  public Proof(
      List<String> leaves, List<String> nodes, String depth, String bitmap, ProofAnchor anchor) {
    this.leaves = leaves;
    this.nodes = nodes;
    this.depth = depth;
    this.bitmap = bitmap;
    this.anchor = anchor;
  }

  public static Proof fromProto(IntegrityEntities.Proof proof) {
    return new Proof(
        proof.getLeavesList(),
        proof.getNodesList(),
        proof.getDepth(),
        proof.getBitmap(),
        ProofAnchor.fromProto(proof.getAnchor()));
  }

  public IntegrityEntities.Proof toProto() {
    return IntegrityEntities.Proof.newBuilder()
        .addAllLeaves(leaves)
        .addAllNodes(nodes)
        .setDepth(depth)
        .setBitmap(bitmap)
        .setAnchor(anchor.toProto())
        .build();
  }

  /**
   * Gets the leaves of the proof.
   * @return
   */
  public List<String> getLeaves() {
    return leaves;
  }

  /**
   * Gets the nodes of the proof.
   * @return
   */
  public List<String> getNodes() {
    return nodes;
  }

  /**
   * Gets the depth of the proof.
   * @return
   */
  public String getDepth() {
    return depth;
  }

  /**
   * Gets the bitmap of the proof.
   * @return
   */
  public String getBitmap() {
    return bitmap;
  }

  /**
   * gets the anchor of the proof.
   * @return
   */
  public ProofAnchor getAnchor() {
    return anchor;
  }
}
