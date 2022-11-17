package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;

public interface Publisher {
  RecordOuterClass.Publisher toProto();
}
