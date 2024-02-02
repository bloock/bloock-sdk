package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.IntegrityEntities;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Represents a proof anchor.
 */
public class ProofAnchor {
  long anchorId;
  List<AnchorNetwork> networks;
  String root;
  String status;

  /**
   * Constructs a ProofAnchor object with the specified parameters.
   * @param anchorId
   * @param networks
   * @param root
   * @param status
   */
  public ProofAnchor(long anchorId, List<AnchorNetwork> networks, String root, String status) {
    this.anchorId = anchorId;
    this.networks = networks;
    this.root = root;
    this.status = status;
  }

  public static ProofAnchor fromProto(IntegrityEntities.ProofAnchor anchor) {
    return new ProofAnchor(
        anchor.getAnchorId(),
        anchor.getNetworksList().stream()
            .map(x -> AnchorNetwork.fromProto(x))
            .collect(Collectors.toList()),
        anchor.getRoot(),
        anchor.getStatus());
  }

  IntegrityEntities.ProofAnchor toProto() {
    return IntegrityEntities.ProofAnchor.newBuilder()
        .setAnchorId(anchorId)
        .addAllNetworks(networks.stream().map(x -> x.toProto()).collect(Collectors.toList()))
        .setRoot(root)
        .setStatus(status)
        .build();
  }

  /**
   * Gets the anchor id of the anchor proof.
   * @return
   */
  public long getAnchorId() {
    return anchorId;
  }

  /**
   * Gets the networks of the anchor proof
   * @return
   */
  public List<AnchorNetwork> getNetworks() {
    return networks;
  }

  /**
   * Gets the root of the anchor proof.
   * @return
   */
  public String getRoot() {
    return root;
  }

  /**
   * Gets the status of the anchor proof.
   * @return
   */
  public String getStatus() {
    return status;
  }
}
