import * as proto from "../../bridge/proto/availability_entities";
import { Loader } from "./loader";
import { LoaderArgs } from "./loader_args";

/**
 * Represents a loader for IPFS data availability.
 */
export class IpfsLoader implements Loader {
  type: proto.DataAvailabilityType;
  args: LoaderArgs;

  /**
   * Constructs a IpfsLoader object with the specified parameters.
   * @param id 
   */
  constructor(id: string) {
    this.type = proto.DataAvailabilityType.IPFS;
    this.args = new LoaderArgs(id);
  }

  public toProto(): proto.Loader {
    return proto.Loader.fromPartial({
      type: this.type,
      args: this.args.toProto()
    });
  }
}
