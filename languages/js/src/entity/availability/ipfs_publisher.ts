import * as proto from "../../bridge/proto/availability_entities";
import { Publisher } from "./publisher";
import { PublisherArgs } from "./publisher_args";

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
