package bloock.sdk.java.entity;

import bloock.sdk.java.bridge.proto.RecordOuterClass;

public class RecordReceipt {
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

	public long getAnchor() {
		return anchor;
	}

	public String getClient() {
		return client;
	}

	public String getRecord() {
		return record;
	}

	public String getStatus() {
		return status;
	}
}
