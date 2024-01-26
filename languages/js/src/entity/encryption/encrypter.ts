import * as proto from "../../bridge/proto/encryption_entities";
import {
  LocalKey,
  ManagedKey,
  ManagedCertificate,
  LocalCertificate,
  AccessControl
} from "../key";

export class Encrypter {
  localKey?: LocalKey;
  managedKey?: ManagedKey;
  managedCertificate?: ManagedCertificate;
  localCertificate?: LocalCertificate;
  accessControl?: AccessControl;

  constructor(
    key: LocalKey | ManagedKey | ManagedCertificate | LocalCertificate,
    accessControl?: AccessControl
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

    if (accessControl) {
      this.accessControl = accessControl;
    }
  }

  public toProto(): proto.Encrypter {
    return proto.Encrypter.fromPartial({
      localKey: this.localKey?.toProto(),
      managedKey: this.managedKey?.toProto(),
      managedCertificate: this.managedCertificate?.toProto(),
      localCertificate: this.localCertificate?.toProto(),
      accessControl: this.accessControl?.toProto(),
    });
  }
}
