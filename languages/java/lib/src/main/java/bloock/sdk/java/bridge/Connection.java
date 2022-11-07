package bloock.sdk.java.bridge;

import io.grpc.*;

public class Connection extends Channel {
  @Override
  public <RequestT, ResponseT> ClientCall<RequestT, ResponseT> newCall(
      MethodDescriptor<RequestT, ResponseT> methodDescriptor, CallOptions callOptions) {
    return new ConnectionRequest<>(methodDescriptor, callOptions);
  }

  @Override
  public String authority() {
    return "bloock-native";
  }
}
