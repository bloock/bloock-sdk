import * as proto from "../../bridge/proto/authenticity_entities";
import * as protoKey from "../../bridge/proto/keys_entities";
import {
  AccessControl,
  LocalCertificate,
  LocalKey,
  ManagedCertificate,
  ManagedKey
} from "../key";
import { HashAlg } from "./hash_alg";

export class Signer {
  localKey?: LocalKey;
  managedKey?: ManagedKey;
  managedCertificate?: ManagedCertificate;
  localCertificate?: LocalCertificate;

  hashAlg?: HashAlg;
  accessControl?: AccessControl;

  constructor(
    key: LocalKey | ManagedKey | ManagedCertificate | LocalCertificate | string,
    hashAlg?: HashAlg,
    accessControl?: AccessControl,
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

    if (hashAlg) {
      this.hashAlg = hashAlg;
    }
    if (accessControl) {
      this.accessControl = accessControl;
    }
  }

  public toProto(): proto.Signer {
    let hashAlg: proto.HashAlg | undefined;
    if (this.hashAlg) {
      hashAlg = this.hashAlg && HashAlg.toProto(this.hashAlg);
    }
    let accessControl: protoKey.AccessControl | undefined;
    if (this.accessControl) {
      accessControl = this.accessControl && this.accessControl.toProto();
    }

    return proto.Signer.fromPartial({
      localKey: this.localKey?.toProto(),
      managedKey: this.managedKey?.toProto(),
      managedCertificate: this.managedCertificate?.toProto(),
      localCertificate: this.localCertificate?.toProto(),
      hashAlg: hashAlg,
      accessControl: accessControl,
    });
  }
}
