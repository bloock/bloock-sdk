package bloock.sdk.java.entity;

import bloock.sdk.java.bridge.proto.RecordOuterClass;
import com.google.protobuf.ByteString;

import bloock.sdk.java.bridge.Bridge;
import bloock.sdk.java.bridge.proto.RecordOuterClass;
import bloock.sdk.java.bridge.proto.RecordOuterClass.RecordHash;
import bloock.sdk.java.bridge.proto.Shared.Error;

public class Record {
  byte[] payload;

  Record(byte[] payload) {
    this.payload = payload;
  }

  public static Record fromProto(RecordOuterClass.Record record) {
    return new Record(record.getPayload().toByteArray());
  }

    public RecordOuterClass.Record toProto() {
        return RecordOuterClass.Record
                .newBuilder()
                .setPayload(ByteString.copyFrom(payload))
                .build();
    }

    public String getHash() throws Exception {
        Bridge bridge = new Bridge();
        RecordHash recordHash = bridge.getRecord().getHash(this.toProto());

        if (recordHash.getError() != Error.getDefaultInstance()) {
            throw new Exception(recordHash.getError().toString());
        }

        return recordHash.getHash();
    }

	public byte[] getPayload() {
		return payload;
	}
}
