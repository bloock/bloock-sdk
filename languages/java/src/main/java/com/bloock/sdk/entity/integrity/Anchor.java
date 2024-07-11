package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.BloockIntegrityEntities;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Represents information about an anchor.
 */
public class Anchor {
  long id;
  List<String> blockRoots;
  List<AnchorNetwork> networks;
  String root;
  String status;

  /**
   * Constructs an Anchor object with the specified parameters.
   * 
   * @param id
   * @param blockRoots
   * @param networks
   * @param root
   * @param status
   */
  Anchor(
      long id, List<String> blockRoots, List<AnchorNetwork> networks, String root, String status) {
    this.id = id;
    this.blockRoots = blockRoots;
    this.networks = networks;
    this.root = root;
    this.status = status;
  }

  public static Anchor fromProto(BloockIntegrityEntities.Anchor anchor) {
    return new Anchor(
        anchor.getId(),
        anchor.getBlockRootsList(),
        anchor.getNetworksList().stream()
            .map(AnchorNetwork::fromProto)
            .collect(Collectors.toList()),
        anchor.getRoot(),
        anchor.getStatus());
  }

  BloockIntegrityEntities.Anchor toProto() {
    return BloockIntegrityEntities.Anchor.newBuilder()
        .setId(this.id)
        .addAllBlockRoots(this.blockRoots)
        .addAllNetworks(
            this.networks.stream().map(AnchorNetwork::toProto).collect(Collectors.toList()))
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

  /**
   * Gets id from the anchor.
   * 
   * @return
   */
  public long getId() {
    return id;
  }

  /**
   * Gets block roots from the anchor.
   * 
   * @return
   */
  public List<String> getBlockRoots() {
    return blockRoots;
  }

  /**
   * Gets networks from the anchor.
   * 
   * @return
   */
  public List<AnchorNetwork> getNetworks() {
    return networks;
  }

  /**
   * Gets root from the anchor.
   * 
   * @return
   */
  public String getRoot() {
    return root;
  }

  /**
   * Get status from the anchor.
   * 
   * @return
   */
  public String getStatus() {
    return status;
  }
}
