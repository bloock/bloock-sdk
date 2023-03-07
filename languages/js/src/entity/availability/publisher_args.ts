import * as proto from "../../bridge/proto/availability_entities";

export class PublisherArgs {
  public toProto(): proto.PublisherArgs {
    return proto.PublisherArgs.fromPartial({});
  }
}
