import * as proto from "../../bridge/proto/bloock_availability_entities";
import { Publisher } from "./publisher";
import { PublisherArgs } from "./publisher_args";

/**
 * Represents a publisher for hosted data availability.
 */
export class HostedPublisher implements Publisher {
  type: proto.DataAvailabilityType;
  args: proto.PublisherArgs;

  /**
   * Constructs a HostedPublisher object with the specified parameters.
   */
  constructor() {
    this.type = proto.DataAvailabilityType.HOSTED;
    this.args = new PublisherArgs().toProto();
  }

  public toProto(): proto.Publisher {
    return proto.Publisher.fromPartial({
      type: this.type,
      args: this.args
    });
  }
}
