package com.bloock.sdk.bridge;

import com.bloock.sdk.ffi.Ffi;
import io.grpc.*;

import javax.annotation.Nullable;
import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Logger;

public class ConnectionRequest<ReqT, RespT> extends ClientCall<ReqT, RespT> {
    private static final Logger logger = Logger.getLogger(ConnectionRequest.class.getName());
    private final MethodDescriptor<ReqT, RespT> method;
    private ClientCall.Listener<RespT> listener;
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
        String requestType = "/" + method.getFullMethodName();

        byte[] payload;
        try {
            InputStream stream = method.streamRequest(message);
            payload = new byte[(int) stream.available()];
            DataInputStream dataInputStream = new DataInputStream(stream);
            dataInputStream.readFully(payload);
        } catch (IOException e) {
            logger.severe(e.toString());
            return;
        }

        byte[] response = Ffi.get().request(requestType, payload);

        InputStream responseStrean = new ByteArrayInputStream(response);

        RespT respT = method.parseResponse(responseStrean);
        listener.onMessage(respT);
        listener.onClose(Status.OK, null);
    }
}
