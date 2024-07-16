import * as proto from "../../bridge/proto/bloock_availability_entities";
import { IpnsKey } from "./ipns_key";
import { Publisher } from "./publisher";
import { PublisherArgs } from "./publisher_args";

/**
 * Represents a publisher for IPNS data availability.
 */
export class IpnsPublisher implements Publisher {
  type: proto.DataAvailabilityType;
  args: PublisherArgs;

  /**
   * Constructs a IpnsPublisher object with the specified parameters.
   */
  constructor(ipnsKey: IpnsKey) {
    this.type = proto.DataAvailabilityType.IPNS;
    this.args = new PublisherArgs(ipnsKey);
  }

  public toProto(): proto.Publisher {
    return proto.Publisher.fromPartial({
      type: this.type,
      args: this.args.toProto()
    });
  }
}