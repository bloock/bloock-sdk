package bloock.sdk.java.bridge;

import bloock.sdk.java.App;
import bloock.sdk.java.bridge.proto.Bloock;
import io.grpc.*;

import javax.annotation.Nullable;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Scanner;
import java.util.concurrent.Executor;
import java.util.logging.Logger;

public class ConnectionRequest<ReqT, RespT> extends ClientCall<ReqT, RespT> {
    private static final Logger logger = Logger.getLogger(ConnectionRequest.class.getName());

    public static class Listener<RespT> {

        public void onHeaders(Metadata headers) {}

        public void onMessage(RespT message) {}

        public void onClose(Status status, Metadata trailers) {}

        public void onReady() {}
    }

    private ClientCall.Listener<RespT> listener;
    private MethodDescriptor<ReqT, RespT> method;
    private CallOptions callOptions;

    ConnectionRequest(MethodDescriptor<ReqT, RespT> method, CallOptions callOptions) {
        this.method = method;
        this.callOptions = callOptions;
    }

    @Override
    public void start(ClientCall.Listener<RespT> responseListener, Metadata headers) {
        listener = responseListener;
    }

    @Override
    public void request(int numMessages) {
    }

    @Override
    public void cancel(@Nullable String message, @Nullable Throwable cause) {
    }

    @Override
    public void halfClose() {
    }

    @Override
    public void sendMessage(ReqT message) {
        Scanner s = new Scanner(method.streamRequest(message)).useDelimiter("\\A");
        String request = s.hasNext() ? s.next() : "";
        String requestType = method.getFullMethodName();

        // Integrate with native FFI here

        // Workaround
        byte[] response = {10, 22, 72, 101, 108, 108, 111, 32, 102, 114, 111, 109, 32, 82, 117, 115, 116, 44, 32, 77, 97, 114, 99, 33};

        InputStream responseStrean = new ByteArrayInputStream(response);

        RespT respT = method.parseResponse(responseStrean);
        listener.onMessage(respT);
        listener.onClose(Status.OK, null);
    }
}
