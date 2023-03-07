import * as proto from "../../bridge/proto/availability_entities";

export interface Publisher {
  type: proto.DataAvailabilityType;
  args: proto.PublisherArgs;
  toProto(): proto.Publisher;
}
