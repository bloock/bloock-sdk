import * as proto from "../../bridge/proto/bloock_availability_entities";

/**
 * Represents the arguments for a data publisher.
 */
export class PublisherArgs {
  public toProto(): proto.PublisherArgs {
    return proto.PublisherArgs.fromPartial({});
  }
}
