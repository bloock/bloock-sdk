package com.bloock.sdk.java.entity;

import com.bloock.sdk.java.bridge.proto.RecordOuterClass;

public interface Publisher {
  RecordOuterClass.Publisher toProto();
}
