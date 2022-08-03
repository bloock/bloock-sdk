package bloock.sdk.java.bridge;

import bloock.sdk.java.bridge.proto.GreeterGrpc;
import io.grpc.Channel;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

import java.util.logging.Logger;

public class Bridge {
    private static final Logger logger = Logger.getLogger(Bridge.class.getName());

    private final GreeterGrpc.GreeterBlockingStub greeting;

    public Bridge() {
        Connection conn = new Connection();
        greeting = GreeterGrpc.newBlockingStub(conn);
    }

    public GreeterGrpc.GreeterBlockingStub getGreeting() {
        return this.greeting;
    }
}
