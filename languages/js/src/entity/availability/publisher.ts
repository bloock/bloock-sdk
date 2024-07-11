import * as proto from "../../bridge/proto/bloock_availability_entities";

export interface Publisher {
  type: proto.DataAvailabilityType;
  args: proto.PublisherArgs;
  toProto(): proto.Publisher;
}
