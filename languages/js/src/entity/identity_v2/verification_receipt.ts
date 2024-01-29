import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

export class VerificationReceipt {
  sessionID: number;
  verificationRequest: string;

  constructor(sessionID: number, verificationRequest: string) {
    this.sessionID = sessionID;
    this.verificationRequest = verificationRequest;
  }

  public toProto(): identityEntitiesProto.VerificationReceipt {
    return identityEntitiesProto.VerificationReceipt.fromPartial({
      sessionId: this.sessionID,
      verificationRequest: this.verificationRequest
    });
  }

  static fromProto(
    r: identityEntitiesProto.VerificationReceipt
  ): VerificationReceipt {
    return new VerificationReceipt(r.sessionId, r.verificationRequest);
  }
}
