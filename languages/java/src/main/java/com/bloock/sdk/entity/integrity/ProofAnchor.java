package com.bloock.sdk.entity.integrity;

import com.bloock.sdk.bridge.proto.IntegrityEntities;

import java.util.List;
import java.util.stream.Collectors;

public class ProofAnchor {
    long anchorId;
    List<AnchorNetwork> networks;
    String root;
    String status;

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

    public long getAnchorId() {
        return anchorId;
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
