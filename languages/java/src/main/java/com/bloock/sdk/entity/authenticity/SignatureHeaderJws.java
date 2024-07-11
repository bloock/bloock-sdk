package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents the header of a JSON Web Signature (JWS).
 * <a href="https://datatracker.ietf.org/doc/html/rfc7515">RFC 7515</a>.
 */
public class SignatureHeaderJws {
  String alg;
  String kid;

  /**
   * Constructs a SignatureHeaderJws object with the specified algorithm and key
   * identifier.
   * 
   * @param alg
   * @param kid
   */
  SignatureHeaderJws(String alg, String kid) {
    this.alg = alg;
    this.kid = kid;
  }

  public static SignatureHeaderJws fromProto(BloockIdentityEntities.SignatureHeaderJWS header) {
    return new SignatureHeaderJws(header.getAlg(), header.getKid());
  }

  /**
   * Gets the algorithm used for the JWS signature.
   * 
   * @return
   */
  public String getAlg() {
    return alg;
  }

  /**
   * Gets the key identifier associated with the JWS signature.
   * 
   * @return
   */
  public String getKid() {
    return kid;
  }

  public BloockIdentityEntities.SignatureHeaderJWS toProto() {
    return BloockIdentityEntities.SignatureHeaderJWS.newBuilder()
        .setAlg(this.alg)
        .setKid(this.kid)
        .build();
  }
}
