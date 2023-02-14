package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Availability.PublishRequest;
import com.bloock.sdk.bridge.proto.Availability.PublishResponse;
import com.bloock.sdk.bridge.proto.Availability.RetrieveRequest;
import com.bloock.sdk.bridge.proto.Availability.RetrieveResponse;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.Loader;
import com.bloock.sdk.entity.Publisher;
import com.bloock.sdk.entity.Record;

public class AvailabilityClient {
  private Bridge bridge;
  private ConfigData configData;

  public AvailabilityClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  public AvailabilityClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  public String publish(Record record, Publisher publisher) throws Exception {
    PublishRequest req =
        PublishRequest.newBuilder()
            .setConfigData(this.configData)
            .setRecord(record.toProto())
            .setPublisher(publisher.toProto())
            .build();

    PublishResponse response = this.bridge.getAvailability().publish(req);
    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getId();
  }

  public Record retrieve(Loader loader) throws Exception {
    RetrieveRequest req =
        RetrieveRequest.newBuilder()
            .setConfigData(this.configData)
            .setLoader(loader.toProto())
            .build();

    RetrieveResponse response = this.bridge.getAvailability().retrieve(req);
    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Record.fromProto(response.getRecord(), this.configData);
  }
}
