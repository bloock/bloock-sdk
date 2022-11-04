package bloock.sdk.java.bridge;

import bloock.sdk.java.bridge.proto.AnchorServiceGrpc;

public class Bridge {
    private final AnchorServiceGrpc.AnchorServiceBlockingStub anchor;

    public Bridge() {
        Connection conn = new Connection();
        anchor = AnchorServiceGrpc.newBlockingStub(conn);
    }

    public AnchorServiceGrpc.AnchorServiceBlockingStub getAnchor() {
        return this.anchor;
    }
}
