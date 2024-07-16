import * as proto from "../../bridge/proto/bloock_availability_entities";
import { Loader } from "./loader";
import { LoaderArgs } from "./loader_args";

/**
 * Represents a loader for IPNS data availability.
 */
export class IpnsLoader implements Loader {
  type: proto.DataAvailabilityType;
  args: LoaderArgs;

  /**
   * Constructs a IpnsLoader object with the specified parameters.
   * @param id
   */
  constructor(id: string) {
    this.type = proto.DataAvailabilityType.IPNS;
    this.args = new LoaderArgs(id);
  }

  public toProto(): proto.Loader {
    return proto.Loader.fromPartial({
      type: this.type,
      args: this.args.toProto()
    });
  }
}