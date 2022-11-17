package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;

public interface Loader {
  RecordOuterClass.Loader toProto();
}
