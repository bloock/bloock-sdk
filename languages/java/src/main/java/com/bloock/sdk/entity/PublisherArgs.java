package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;

public class PublisherArgs {
  RecordOuterClass.PublisherArgs toProto() {
    return RecordOuterClass.PublisherArgs.newBuilder().build();
  }
}
