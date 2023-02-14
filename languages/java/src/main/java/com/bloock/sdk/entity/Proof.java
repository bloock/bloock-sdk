package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.IntegrityEntities;
import java.util.List;

public class Proof {
  List<String> leaves;
  List<String> nodes;
  String depth;
  String bitmap;
  ProofAnchor anchor;

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

  public List<String> getLeaves() {
    return leaves;
  }

  public List<String> getNodes() {
    return nodes;
  }

  public String getDepth() {
    return depth;
  }

  public String getBitmap() {
    return bitmap;
  }

  public ProofAnchor getAnchor() {
    return anchor;
  }
}
