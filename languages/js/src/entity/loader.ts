import * as proto from "../bridge/proto/record";

export interface Loader {
  type: proto.DataAvailabilityType;
  args: proto.LoaderArgs;
  toProto(): proto.Loader;
}

export class HostedLoader implements Loader {
  type: proto.DataAvailabilityType;
  args: LoaderArgs;

  constructor(hash: string) {
    this.type = proto.DataAvailabilityType.HOSTED;
    this.args = new LoaderArgs(hash);
  }

  public toProto(): proto.Loader {
    return proto.Loader.fromPartial({
      type: this.type,
      args: this.args.toProto()
    });
  }
}

export class LoaderArgs {
  hash: string;
  constructor(hash: string) {
    this.hash = hash;
  }

  public toProto(): proto.LoaderArgs {
    return proto.LoaderArgs.fromPartial({ hash: this.hash });
  }
}
