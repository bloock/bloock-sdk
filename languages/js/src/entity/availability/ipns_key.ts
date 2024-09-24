import * as proto from "../../bridge/proto/bloock_availability_entities";

/**
 * Represents an object with a key uuid identifier.
 */
export class IpnsKey {
  keyID: string;

  /**
   * Creates an IpnsKey instance with a key uuid identifier.
   * @param keyID
   */
  constructor(
    keyID: string
  ) {
    this.keyID = keyID;
  }

  public toProto(): proto.IpnsKey {
    return proto.IpnsKey.fromPartial({
      keyId: this.keyID
    });
  }

  static fromProto(res: proto.IpnsKey): IpnsKey {
    return new IpnsKey(res.keyId);
  }
}
