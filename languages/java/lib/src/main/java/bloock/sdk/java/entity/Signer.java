package bloock.sdk.java.entity;

import bloock.sdk.java.bridge.proto.RecordOuterClass;

public interface Signer {
  RecordOuterClass.Signer toProto();
}
