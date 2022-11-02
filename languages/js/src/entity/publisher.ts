import * as proto from "../bridge/proto/record";

export interface Publisher {
  type: proto.DataAvailabilityType;
  args: proto.PublisherArgs;
  toProto(): proto.Publisher;
}

export class HostedPublisher implements Publisher {
  type: proto.DataAvailabilityType;
  args: PublisherArgs;

  constructor() {
    this.type = proto.DataAvailabilityType.HOSTED;
    this.args = new PublisherArgs();
  }

  public toProto(): proto.Publisher {
    return proto.Publisher.fromPartial({
      type: this.type,
      args: this.args.toProto()
    });
  }
}

export class PublisherArgs {
  constructor() {
  }

  public toProto(): proto.PublisherArgs {
    return proto.PublisherArgs.fromPartial({});
  }
}
