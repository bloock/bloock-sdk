package bloock.sdk.java.entity;

import bloock.sdk.java.bridge.proto.RecordOuterClass;
import com.google.protobuf.ByteString;

public class Record {
  byte[] payload;

  Record(byte[] payload) {
    this.payload = payload;
  }

  public static Record fromProto(RecordOuterClass.Record record) {
    return new Record(record.getPayload().toByteArray());
  }

  RecordOuterClass.Record toProto() {
    return RecordOuterClass.Record.newBuilder().setPayload(ByteString.copyFrom(payload)).build();
  }
}
