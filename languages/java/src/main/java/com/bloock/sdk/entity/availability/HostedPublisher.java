package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.AvailabilityEntities;
import com.bloock.sdk.bridge.proto.AvailabilityEntities.DataAvailabilityType;

public class HostedPublisher implements Publisher {
    DataAvailabilityType type;
    PublisherArgs args;

    public HostedPublisher() {
        this.type = DataAvailabilityType.HOSTED;
        this.args = new PublisherArgs();
    }

    @Override
    public AvailabilityEntities.Publisher toProto() {
        return AvailabilityEntities.Publisher.newBuilder()
                .setType(this.type)
                .setArgs(this.args.toProto())
                .build();
    }
}
