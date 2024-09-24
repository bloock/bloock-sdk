import * as proto from "../../bridge/proto/bloock_availability";
import { IpnsKey } from "./ipns_key";

/**
 * Represents an object with a the publish response attributes.
 */
export class PublishResponse {
    id: string;
    ipnsKey?: IpnsKey;
  
    /**
     * Constructs a PublishResponse object with the specified parameters.
     * @param id
     */
    constructor(
      id: string,
      ipnsKey?: IpnsKey
    ) {
      this.id = id;
      if (ipnsKey) {
        this.ipnsKey = ipnsKey
      }
    }
  
    static fromProto(res: proto.PublishResponse): PublishResponse {
      if (res.ipnsKey) {
        return new PublishResponse(res.id, IpnsKey.fromProto(res.ipnsKey));
      }
      return new PublishResponse(res.id);
    }
  }