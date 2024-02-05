import * as proto from "../../bridge/proto/availability_entities";
import { Publisher } from "./publisher";
import { PublisherArgs } from "./publisher_args";

/**
 * Represents a publisher for hosted data availability.
 */
export class HostedPublisher implements Publisher {
  type: proto.DataAvailabilityType;
  args: PublisherArgs;

  /**
   * Constructs a HostedPublisher object with the specified parameters.
   */
  constructor() {
    this.type = proto.DataAvailabilityType.HOSTED;
    this.args = new PublisherArgs();
  }

  public toProto(): proto.Publisher {
    return proto.Publisher.fromPartial({
      type: this.type,
      args: this.args.toProto()
    });
  }
}
