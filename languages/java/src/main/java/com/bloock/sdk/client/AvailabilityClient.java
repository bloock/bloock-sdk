package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.BloockAvailability.PublishRequest;
import com.bloock.sdk.bridge.proto.BloockAvailability.PublishResponse;
import com.bloock.sdk.bridge.proto.BloockAvailability.RetrieveRequest;
import com.bloock.sdk.bridge.proto.BloockAvailability.RetrieveResponse;
import com.bloock.sdk.bridge.proto.BloockConfig.ConfigData;
import com.bloock.sdk.bridge.proto.BloockShared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.availability.Loader;
import com.bloock.sdk.entity.availability.Publisher;
import com.bloock.sdk.entity.record.Record;

/**
 * Represents a client for interacting with the
 * <a href="https://dashboard.bloock.com/login">Bloock Availability service</a>.
 */
public class AvailabilityClient {
  private final Bridge bridge;
  private final ConfigData configData;

  /**
   * Creates a new instance of the AvailabilityClient with default configuration.
   */
  public AvailabilityClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * Creates a new instance of the AvailabilityClient with the provided
   * configuration.
   * 
   * @param configData
   */
  public AvailabilityClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * Publishes a Bloock record to the Availability service using the specified
   * publisher.
   * 
   * @param record
   * @param publisher
   * @return
   * @throws Exception
   */
  public String publish(Record record, Publisher publisher) throws Exception {
    PublishRequest req = PublishRequest.newBuilder()
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

  /**
   * Gets a Bloock record from the Availability service using the specified
   * loader.
   * 
   * @param loader
   * @return
   * @throws Exception
   */
  public Record retrieve(Loader loader) throws Exception {
    RetrieveRequest req = RetrieveRequest.newBuilder()
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
