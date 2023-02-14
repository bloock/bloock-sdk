import { BloockBridge } from "../bridge/bridge";
import { PublishRequest, RetrieveRequest } from "../bridge/proto/availability";
import { ConfigData } from "../bridge/proto/config";
import { NewConfigData } from "../config/config";
import { Loader } from "../entity/loader";
import { Publisher } from "../entity/publisher";
import { Record } from "../entity/record";

export class AvailabilityClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

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
