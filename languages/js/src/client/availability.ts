import { BloockBridge } from "../bridge/bridge";
import {
  PublishRequest,
  RetrieveRequest
} from "../bridge/proto/bloock_availability";
import { ConfigData } from "../bridge/proto/bloock_config";
import { NewConfigData } from "../config/config";
import { Loader, Publisher, PublishResponse } from "../entity/availability";
import { Record } from "../entity/record";

/**
 * Represents a client for interacting with the [Bloock Availability service](https://dashboard.bloock.com/login).
 */
export class AvailabilityClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  /**
   * Creates a new instance of the AvailabilityClient with default configuration.
   * @param configData
   */
  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * Publishes a Bloock record to the Availability service using the specified publisher.
   * @param record
   * @param publisher
   * @returns
   */
  async publish(record: Record, publisher: Publisher): Promise<PublishResponse> {
    const request = PublishRequest.fromPartial({
      configData: this.configData,
      publisher: publisher.toProto(),
      record: record.toProto()
    });
    return this.bridge
      .getAvailability()
      .Publish(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return PublishResponse.fromProto(res);
      });
  }

  /**
   * Gets a Bloock record from the Availability service using the specified loader.
   * @param loader
   * @returns
   */
  async retrieve(loader: Loader): Promise<Record> {
    const request = RetrieveRequest.fromPartial({
      configData: this.configData,
      loader: loader.toProto()
    });
    return this.bridge
      .getAvailability()
      .Retrieve(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Record.fromProto(res.record!, this.configData);
      });
  }
}
