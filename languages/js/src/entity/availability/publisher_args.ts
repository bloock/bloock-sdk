import * as proto from "../../bridge/proto/bloock_availability_entities";
import { IpnsKey } from "./ipns_key";

/**
 * Represents the arguments for a data publisher.
 */
export class PublisherArgs {
  /**
   * Is a unique identifier associated with the loader.
   */
  ipnsKey?: IpnsKey;

  /**
   * Constructs a PublisherArgs object with the specified parameters.
   * @param ipnsKey
   */
  constructor(ipnsKey?: IpnsKey) {
    if (ipnsKey) {
      this.ipnsKey = ipnsKey;
    }
  }

  public toProto(): proto.PublisherArgs {
    let ipnsKey: proto.IpnsKey | undefined;
    if (this.ipnsKey) {
      ipnsKey = this.ipnsKey.toProto();
    }

    return proto.PublisherArgs.fromPartial({ ipnsKey: ipnsKey });
  }
}
