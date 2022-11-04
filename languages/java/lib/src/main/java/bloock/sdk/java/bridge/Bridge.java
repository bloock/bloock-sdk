package bloock.sdk.java.bridge;

import bloock.sdk.java.bridge.proto.AnchorServiceGrpc;
import bloock.sdk.java.bridge.proto.ProofServiceGrpc;
import bloock.sdk.java.bridge.proto.RecordServiceGrpc;

public class Bridge {
    private final AnchorServiceGrpc.AnchorServiceBlockingStub anchor;
    private final RecordServiceGrpc.RecordServiceBlockingStub record;
    private final ProofServiceGrpc.ProofServiceBlockingStub proof;

    public Bridge() {
        Connection conn = new Connection();
        anchor = AnchorServiceGrpc.newBlockingStub(conn);
        record = RecordServiceGrpc.newBlockingStub(conn);
        proof = ProofServiceGrpc.newBlockingStub(conn);
    }

    public AnchorServiceGrpc.AnchorServiceBlockingStub getAnchor() {
        return this.anchor;
    }

    public RecordServiceGrpc.RecordServiceBlockingStub getRecord() {
        return this.record;
    }

    public ProofServiceGrpc.ProofServiceBlockingStub getProof() {
        return this.proof;
    }
}
