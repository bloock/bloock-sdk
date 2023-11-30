import * as proto from "../../bridge/proto/authenticity_entities";
import {
  LocalCertificate,
  LocalKey,
  ManagedCertificate,
  ManagedKey
} from "../key";

export class Signer {
  localKey?: LocalKey;
  managedKey?: ManagedKey;
  managedCertificate?: ManagedCertificate;
  localCertificate?: LocalCertificate;

  constructor(
    key: LocalKey | ManagedKey | ManagedCertificate | LocalCertificate | string
  ) {
    if (key instanceof LocalKey) {
      this.localKey = key;
    } else if (key instanceof ManagedKey) {
      this.managedKey = key;
    } else if (key instanceof ManagedCertificate) {
      this.managedCertificate = key;
    } else if (key instanceof LocalCertificate) {
      this.localCertificate = key;
    } else {
      throw new Error("invalid key provided");
    }
  }

  public toProto(): proto.Signer {
    return proto.Signer.fromPartial({
      localKey: this.localKey?.toProto(),
      managedKey: this.managedKey?.toProto(),
      managedCertificate: this.managedCertificate?.toProto(),
      localCertificate: this.localCertificate?.toProto()
    });
  }
}
