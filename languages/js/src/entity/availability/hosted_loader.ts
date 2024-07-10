import * as proto from "../../bridge/proto/bloock_availability_entities";
import { Loader } from "./loader";
import { LoaderArgs } from "./loader_args";

/**
 * Represents a loader for hosted data availability.
 */
export class HostedLoader implements Loader {
  type: proto.DataAvailabilityType;
  args: LoaderArgs;

  /**
   * Constructs a HostedLoader object with the specified parameters.
   * @param id
   */
  constructor(id: string) {
    this.type = proto.DataAvailabilityType.HOSTED;
    this.args = new LoaderArgs(id);
  }

  public toProto(): proto.Loader {
    return proto.Loader.fromPartial({
      type: this.type,
      args: this.args.toProto()
    });
  }
}
