package bloock.sdk.java.bridge;

import bloock.sdk.java.App;
import bloock.sdk.java.bridge.proto.Bloock;
import bloock.sdk.java.ffi.Ffi;
import io.grpc.*;

import javax.annotation.Nullable;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Scanner;
import java.util.concurrent.Executor;
import java.util.logging.Logger;

public class ConnectionRequest<ReqT, RespT> extends ClientCall<ReqT, RespT> {
    private static final Logger logger = Logger.getLogger(ConnectionRequest.class.getName());

    private ClientCall.Listener<RespT> listener;
    private final MethodDescriptor<ReqT, RespT> method;
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
        String payload = s.hasNext() ? s.next() : "";
        String requestType = "/" + method.getFullMethodName();

        byte[] response = Ffi.get().request(requestType, payload);

        InputStream responseStrean = new ByteArrayInputStream(response);

        RespT respT = method.parseResponse(responseStrean);
        listener.onMessage(respT);
        listener.onClose(Status.OK, null);
    }
}
