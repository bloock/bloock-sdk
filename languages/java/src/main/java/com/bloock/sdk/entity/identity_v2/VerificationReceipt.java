package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

/**
 * Represents a receipt for a verification session.
 */
public class VerificationReceipt {
  private final long sessionID;
  private final String verificationRequest;

  /**
   * Constructs a VerificationReceipt object with the specified parameters.
   * @param sessionID
   * @param verificationRequest
   */
  public VerificationReceipt(long sessionID, String verificationRequest) {
    this.sessionID = sessionID;
    this.verificationRequest = verificationRequest;
  }

  public static VerificationReceipt fromProto(IdentityEntitiesV2.VerificationReceipt res) {
    return new VerificationReceipt(res.getSessionId(), res.getVerificationRequest());
  }

  public IdentityEntitiesV2.VerificationReceipt toProto() {
    return IdentityEntitiesV2.VerificationReceipt.newBuilder()
        .setSessionId(this.sessionID)
        .setVerificationRequest(this.verificationRequest)
        .build();
  }

  /**
   * Gets the session id of the verification.
   * @return
   */
  public long getSessionID() {
    return sessionID;
  }

  /**
   * Gets the verification request json.
   * @return
   */
  public String getVerificationRequest() {
    return verificationRequest;
  }
}
