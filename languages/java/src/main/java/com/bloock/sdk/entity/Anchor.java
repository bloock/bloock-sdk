package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.AnchorOuterClass;
import java.util.List;
import java.util.stream.Collectors;

public class Anchor {
  long id;
  List<String> blockRoots;
  List<AnchorNetwork> networks;
  String root;
  String status;

  Anchor(
      long id, List<String> blockRoots, List<AnchorNetwork> networks, String root, String status) {
    this.id = id;
    this.blockRoots = blockRoots;
    this.networks = networks;
    this.root = root;
    this.status = status;
  }

  public static Anchor fromProto(AnchorOuterClass.Anchor anchor) {
    return new Anchor(
        anchor.getId(),
        anchor.getBlockRootsList(),
        anchor.getNetworksList().stream()
            .map(x -> AnchorNetwork.fromProto(x))
            .collect(Collectors.toList()),
        anchor.getRoot(),
        anchor.getStatus());
  }

  AnchorOuterClass.Anchor toProto() {
    return AnchorOuterClass.Anchor.newBuilder()
        .setId(this.id)
        .addAllBlockRoots(this.blockRoots)
        .addAllNetworks(this.networks.stream().map(x -> x.toProto()).collect(Collectors.toList()))
        .build();
  }

  @Override
  public String toString() {
    return "{"
        + "id: "
        + id
        + ", blockRoots: "
        + blockRoots
        + ", root: "
        + root
        + ", status: "
        + status
        + ", networks: "
        + networks
        + "}";
  }

  public long getId() {
    return id;
  }

  public List<String> getBlockRoots() {
    return blockRoots;
  }

  public List<AnchorNetwork> getNetworks() {
    return networks;
  }

  public String getRoot() {
    return root;
  }

  public String getStatus() {
    return status;
  }
}
