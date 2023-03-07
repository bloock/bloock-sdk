import * as proto from "../../bridge/proto/availability_entities";

export class LoaderArgs {
  id: string;
  constructor(id: string) {
    this.id = id;
  }

  public toProto(): proto.LoaderArgs {
    return proto.LoaderArgs.fromPartial({ id: this.id });
  }
}
