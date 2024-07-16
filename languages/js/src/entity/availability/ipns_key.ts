import * as proto from "../../bridge/proto/bloock_availability_entities";
import {
  ManagedCertificate,
  ManagedKey
} from "../key";

/**
 * Represents an IpnsKey with various key types.
 */
export class IpnsKey {
  managedKey?: ManagedKey;
  managedCertificate?: ManagedCertificate;

  /**
   * Creates an IpnsKey instance with a managed key or managed certificate.
   * @param key
   */
  constructor(
    key: ManagedKey | ManagedCertificate,
  ) {
    if (key instanceof ManagedKey) {
      this.managedKey = key;
    } else if (key instanceof ManagedCertificate) {
      this.managedCertificate = key;
    } else {
      throw new Error("invalid key provided");
    }
  }

  public toProto(): proto.IpnsKey {
    return proto.IpnsKey.fromPartial({
      managedKey: this.managedKey?.toProto(),
      managedCertificate: this.managedCertificate?.toProto(),
    });
  }
}
