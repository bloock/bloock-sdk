package bloock.sdk.java.entity;

import com.google.protobuf.ByteString;

import bloock.sdk.java.bridge.proto.RecordOuterClass;
import bloock.sdk.java.bridge.proto.RecordOuterClass.GenerateKeysResponse;

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

class RecordReceipt {
    long anchor;
    String client;
    String record;
    String status;

    RecordReceipt(long anchor, String client, String record, String status) {
        this.anchor = anchor;
        this.client = client;
        this.record = record;
        this.status = status;
    }

    public static RecordReceipt fromProto(RecordOuterClass.RecordReceipt receipt) {
        return new RecordReceipt(
                receipt.getAnchor(),
                receipt.getClient(),
                receipt.getRecord(),
                receipt.getStatus());
    }

    RecordOuterClass.RecordReceipt toProto() {
        return RecordOuterClass.RecordReceipt
                .newBuilder()
                .setAnchor(anchor)
                .setClient(client)
                .setRecord(record)
                .setStatus(status)
                .build();
    }
}

class Keys {
    String publicKey;
    String privateKey;

    Keys(String publicKey, String privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    public static Keys fromProto(GenerateKeysResponse keys) {
        return new Keys(keys.getPublicKey(), keys.getPrivateKey());
    }
}
