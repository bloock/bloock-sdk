package bloock.sdk.java.builder;

import com.google.protobuf.ByteString;

import bloock.sdk.java.bridge.Bridge;
import bloock.sdk.java.bridge.proto.RecordOuterClass;
import bloock.sdk.java.bridge.proto.RecordOuterClass.RecordBuilderFromBytesRequest;
import bloock.sdk.java.bridge.proto.RecordOuterClass.RecordBuilderFromFileRequest;
import bloock.sdk.java.bridge.proto.RecordOuterClass.RecordBuilderFromHexRequest;
import bloock.sdk.java.bridge.proto.RecordOuterClass.RecordBuilderFromJSONRequest;
import bloock.sdk.java.bridge.proto.RecordOuterClass.RecordBuilderFromRecordRequest;
import bloock.sdk.java.bridge.proto.RecordOuterClass.RecordBuilderResponse;
import bloock.sdk.java.bridge.proto.RecordOuterClass.RecordTypes;
import bloock.sdk.java.bridge.proto.Shared.Error;
import bloock.sdk.java.entity.Decrypter;
import bloock.sdk.java.entity.Encrypter;
import bloock.sdk.java.entity.Record;
import bloock.sdk.java.entity.Signer;

public class Builder {
    Object payload;
    RecordTypes type;
    Signer signer;
    Encrypter encrypter;
    Decrypter decrypter;

    Builder(Object payload, RecordTypes type) {
        this.payload = payload;
        this.type = type;
    }

    public static Builder fromRecord(Record record) {
        return new Builder(record, RecordTypes.RECORD);
    }

    public static Builder fromString(String str) {
        return new Builder(str, RecordTypes.STRING);
    }

    public static Builder fromHex(String str) {
        return new Builder(str, RecordTypes.HEX);
    }

    public static Builder fromJson(String json) {
        return new Builder(json, RecordTypes.JSON);
    }

    public static Builder fromFile(byte[] file) {
        return new Builder(file, RecordTypes.FILE);
    }

    public static Builder fromBytes(byte[] bytes) {
        return new Builder(bytes, RecordTypes.BYTES);
    }

    public Builder withSigner(Signer signer) {
        this.signer = signer;
        return this;
    }

    public Builder withEncrypter(Encrypter encrypter) {
        this.encrypter = encrypter;
        return this;
    }

    public Builder withDecrypter(Decrypter decrypter) {
        this.decrypter = decrypter;
        return this;
    }

    public Record build() throws Exception {
        Bridge bridge = new Bridge();

        RecordBuilderResponse response;

        switch (this.type) {
            case BYTES:
                response = bridge.getRecord().buildRecordFromBytes(
                        RecordBuilderFromBytesRequest
                                .newBuilder()
                                .setPayload((ByteString) this.payload)
                                .setSigner(this.signer.toProto())
                                .setEncrypter(this.encrypter.toProto())
                                .setDecrypter(this.decrypter.toProto())
                                .build());
                break;
            case FILE:
                response = bridge.getRecord().buildRecordFromFile(
                        RecordBuilderFromFileRequest
                                .newBuilder()
                                .setPayload((ByteString) this.payload)
                                .setSigner(this.signer.toProto())
                                .setEncrypter(this.encrypter.toProto())
                                .setDecrypter(this.decrypter.toProto())
                                .build());
                break;
            case HEX:
                response = bridge.getRecord().buildRecordFromHex(
                        RecordBuilderFromHexRequest
                                .newBuilder()
                                .setPayload((String) this.payload)
                                .setSigner(this.signer.toProto())
                                .setEncrypter(this.encrypter.toProto())
                                .setDecrypter(this.decrypter.toProto())
                                .build());
                break;
            case JSON:
                response = bridge.getRecord().buildRecordFromJson(
                        RecordBuilderFromJSONRequest
                                .newBuilder()
                                .setPayload((String) this.payload)
                                .setSigner(this.signer.toProto())
                                .setEncrypter(this.encrypter.toProto())
                                .setDecrypter(this.decrypter.toProto())
                                .build());
                break;
            case RECORD:
                response = bridge.getRecord().buildRecordFromRecord(
                        RecordBuilderFromRecordRequest
                                .newBuilder()
                                .setPayload((RecordOuterClass.Record) this.payload)
                                .setSigner(this.signer.toProto())
                                .setEncrypter(this.encrypter.toProto())
                                .setDecrypter(this.decrypter.toProto())
                                .build());
                break;
            case STRING:
                response = bridge.getRecord().buildRecordFromBytes(
                        RecordBuilderFromBytesRequest
                                .newBuilder()
                                .setPayload((ByteString) this.payload)
                                .setSigner(this.signer.toProto())
                                .setEncrypter(this.encrypter.toProto())
                                .setDecrypter(this.decrypter.toProto())
                                .build());
                break;
            default:
                throw new Exception("Invalid type");
        }

        if (response.getError() != Error.getDefaultInstance()) {
            throw new Exception(response.getError().getMessage());
        }

        return Record.fromProto(response.getRecord());
    }
}
