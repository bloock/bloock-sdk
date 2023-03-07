import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

export class CredentialVerification {
  timestamp: number;
  issuer: string;
  revocation: number;

  constructor(timestamp: number, issuer: string, revocation: number) {
    this.timestamp = timestamp;
    this.issuer = issuer;
    this.revocation = revocation;
  }

  public toProto(): identityEntitiesProto.CredentialVerification {
    return identityEntitiesProto.CredentialVerification.fromPartial({
      timestamp: this.timestamp,
      issuer: this.issuer,
      revocation: this.revocation
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialVerification
  ): CredentialVerification {
    return new CredentialVerification(r.timestamp, r.issuer, r.revocation);
  }
}
