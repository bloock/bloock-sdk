package bloock.sdk.java.entity;

import java.util.List;
import java.util.stream.Collectors;

import bloock.sdk.java.bridge.proto.ProofOuterClass;

public class Proof {
    List<String> leaves;
    List<String> nodes;
    String depth;
    String bitmap;
    ProofAnchor anchor;

    Proof(List<String> leaves, List<String> nodes, String depth, String bitmap, ProofAnchor anchor) {
        this.leaves = leaves;
        this.nodes = nodes;
        this.depth = depth;
        this.bitmap = bitmap;
        this.anchor = anchor;
    }

    public static Proof fromProto(ProofOuterClass.Proof proof) {
        return new Proof(
                proof.getLeavesList(),
                proof.getNodesList(),
                proof.getDepth(),
                proof.getBitmap(),
                ProofAnchor.fromProto(proof.getAnchor()));
    }

    public ProofOuterClass.Proof toProto() {
        return ProofOuterClass.Proof
                .newBuilder()
                .addAllLeaves(leaves)
                .addAllNodes(nodes)
                .setDepth(depth)
                .setBitmap(bitmap)
                .setAnchor(anchor.toProto())
                .build();
    }
}

class ProofAnchor {
    long anchorId;
    List<AnchorNetwork> networks;
    String root;
    String status;

    ProofAnchor(long anchorId, List<AnchorNetwork> networks, String root, String status) {
        this.anchorId = anchorId;
        this.networks = networks;
        this.root = root;
        this.status = status;
    }

    public static ProofAnchor fromProto(ProofOuterClass.ProofAnchor anchor) {
        return new ProofAnchor(
                anchor.getAnchorId(),
                anchor.getNetworksList().stream().map(x -> AnchorNetwork.fromProto(x)).collect(Collectors.toList()),
                anchor.getRoot(),
                anchor.getStatus());
    }

    ProofOuterClass.ProofAnchor toProto() {
        return ProofOuterClass.ProofAnchor
                .newBuilder()
                .setAnchorId(anchorId)
                .addAllNetworks(networks.stream().map(x -> x.toProto()).collect(Collectors.toList()))
                .setRoot(root)
                .setStatus(status)
                .build();
    }
}
