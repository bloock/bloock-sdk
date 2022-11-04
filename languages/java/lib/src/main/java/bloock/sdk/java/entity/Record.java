package bloock.sdk.java.entity;

import com.google.protobuf.ByteString;

import bloock.sdk.java.bridge.proto.RecordOuterClass;

public class Record {
    byte[] payload;

    Record(byte[] payload) {
        this.payload = payload;
    }

    public static Record fromProto(RecordOuterClass.Record record) {
        return new Record(record.getPayload().toByteArray());
    }

    RecordOuterClass.Record toProto() {
        return RecordOuterClass.Record
                .newBuilder()
                .setPayload(ByteString.copyFrom(payload))
                .build();
    }
}
