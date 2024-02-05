import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

/**
 * Represents a receipt for a verification session.
 */
export class VerificationReceipt {
  sessionID: number;
  verificationRequest: string;

  /**
   * Constructs a VerificationReceipt object with the specified parameters.
   * @param sessionID 
   * @param verificationRequest 
   */
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
