package bloock.sdk.java.bridge;

import bloock.sdk.java.bridge.proto.AnchorServiceGrpc;
import bloock.sdk.java.bridge.proto.GreeterGrpc;
import io.grpc.Channel;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

import java.util.logging.Logger;

public class Bridge {
    private static final Logger logger = Logger.getLogger(Bridge.class.getName());

    private final GreeterGrpc.GreeterBlockingStub greeting;
    private final AnchorServiceGrpc.AnchorServiceBlockingStub anchor;

    public Bridge() {
        Connection conn = new Connection();
        greeting = GreeterGrpc.newBlockingStub(conn);
        anchor = AnchorServiceGrpc.newBlockingStub(conn);
    }

    public GreeterGrpc.GreeterBlockingStub getGreeting() {
        return this.greeting;
    }

    public AnchorServiceGrpc.AnchorServiceBlockingStub getAnchor() {
        return this.anchor;
    }
}
