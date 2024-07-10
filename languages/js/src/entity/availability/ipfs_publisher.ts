import * as proto from "../../bridge/proto/bloock_availability_entities";
import { Publisher } from "./publisher";
import { PublisherArgs } from "./publisher_args";

/**
 * Represents a publisher for IPFS data availability.
 */
export class IpfsPublisher implements Publisher {
  type: proto.DataAvailabilityType;
  args: PublisherArgs;

  /**
   * Constructs a IpfsPublisher object with the specified parameters.
   */
  constructor() {
    this.type = proto.DataAvailabilityType.IPFS;
    this.args = new PublisherArgs();
  }

  public toProto(): proto.Publisher {
    return proto.Publisher.fromPartial({
      type: this.type,
      args: this.args.toProto()
    });
  }
}
