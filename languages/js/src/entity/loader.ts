import * as proto from "../bridge/proto/availability_entities";

export interface Loader {
  type: proto.DataAvailabilityType;
  args: proto.LoaderArgs;
  toProto(): proto.Loader;
}

export class LoaderArgs {
  id: string;
  constructor(id: string) {
    this.id = id;
  }

  public toProto(): proto.LoaderArgs {
    return proto.LoaderArgs.fromPartial({ id: this.id });
  }
}

export class HostedLoader implements Loader {
  type: proto.DataAvailabilityType;
  args: LoaderArgs;

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

export class IpfsLoader implements Loader {
  type: proto.DataAvailabilityType;
  args: LoaderArgs;

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
