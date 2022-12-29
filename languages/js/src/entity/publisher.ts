import * as proto from "../bridge/proto/record";

export interface Publisher {
  type: proto.DataAvailabilityType;
  args: proto.PublisherArgs;
  toProto(): proto.Publisher;
}

export class PublisherArgs {
  public toProto(): proto.PublisherArgs {
    return proto.PublisherArgs.fromPartial({});
  }
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

export class IpfsPublisher implements Publisher {
  type: proto.DataAvailabilityType;
  args: PublisherArgs;

  constructor() {
    this.type = proto.DataAvailabilityType.IPFS;
    this.args = new PublisherArgs();
  }

  public toProto(): proto.Publisher {
    return proto.Publisher.fromPartial({
      type: this.type,
      args: this.args.toProto()
    });
  }
}
