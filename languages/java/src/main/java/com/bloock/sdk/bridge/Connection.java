package com.bloock.sdk.bridge;

import io.grpc.CallOptions;
import io.grpc.Channel;
import io.grpc.ClientCall;
import io.grpc.MethodDescriptor;

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
