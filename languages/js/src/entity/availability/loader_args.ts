import * as proto from "../../bridge/proto/bloock_availability_entities";

/**
 * Represents the arguments for a data loader.
 */
export class LoaderArgs {
  /**
   * Is a unique identifier associated with the loader.
   */
  id: string;

  /**
   * Constructs a LoaderArgs object with the specified parameters.
   * @param id
   */
  constructor(id: string) {
    this.id = id;
  }

  public toProto(): proto.LoaderArgs {
    return proto.LoaderArgs.fromPartial({ id: this.id });
  }
}
