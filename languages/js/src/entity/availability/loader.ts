import * as proto from "../../bridge/proto/availability_entities";

export interface Loader {
  type: proto.DataAvailabilityType;
  args: proto.LoaderArgs;
  toProto(): proto.Loader;
}
