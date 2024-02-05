import { BloockBridge } from "../bridge/bridge";
import { PublishRequest, RetrieveRequest } from "../bridge/proto/availability";
import { ConfigData } from "../bridge/proto/config";
import { NewConfigData } from "../config/config";
import { Publisher, Loader } from "../entity/availability";
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
  async publish(record: Record, publisher: Publisher): Promise<string> {
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
        return res.id;
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
