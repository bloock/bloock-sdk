package com.bloock.sdk.java.entity;

import com.bloock.sdk.java.bridge.proto.RecordOuterClass.DataAvailabilityType;
import com.bloock.sdk.java.bridge.proto.RecordOuterClass;

public class HostedPublisher implements Publisher {
    DataAvailabilityType type;
    PublisherArgs args;
	@Override
	public RecordOuterClass.Publisher toProto() {
		return RecordOuterClass.Publisher
            .newBuilder()
            .setType(this.type)
            .setArgs(this.args.toProto())
            .build();
	}
}

class PublisherArgs {
    public PublisherArgs() {
    }

    RecordOuterClass.PublisherArgs toProto() {
        return RecordOuterClass.PublisherArgs.newBuilder().build();
    }
}
