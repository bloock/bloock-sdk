package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents a JSON Web Signature (JWS). <a href="https://datatracker.ietf.org/doc/html/rfc7515">RFC 7515</a>.
 */
public class SignatureJws {
  String signature;
  String protected_;
  SignatureHeaderJws header;
  String messageHash;

  /**
   * Constructs a SignatureJws object with the specified parameters.
   * @param signature
   * @param protected_
   * @param header
   * @param messageHash
   */
  SignatureJws(String signature, String protected_, SignatureHeaderJws header, String messageHash) {
    this.signature = signature;
    this.protected_ = protected_;
    this.header = header;
    this.messageHash = messageHash;
  }

  public static SignatureJws fromProto(IdentityEntities.SignatureJWS signature) {
    return new SignatureJws(
        signature.getSignature(),
        signature.getProtected(),
        SignatureHeaderJws.fromProto(signature.getHeader()),
        signature.getMessageHash());
  }

  public IdentityEntities.SignatureJWS toProto() {
    return IdentityEntities.SignatureJWS.newBuilder()
        .setSignature(this.signature)
        .setProtected(this.protected_)
        .setHeader(this.header.toProto())
        .setMessageHash(this.messageHash)
        .build();
  }

  /**
   * Gets the cryptographic signature.
   * @return
   */
  public String getSignature() {
    return signature;
  }

  /**
   * Sets the cryptographic signature.
   * @param signature
   */
  public void setSignature(String signature) {
    this.signature = signature;
  }

  /**
   * Gets the "protected" header parameter of the JWS.
   * @return
   */
  public String getProtected_() {
    return protected_;
  }

  /**
   * Gets the header containing algorithm and key identifier metadata for the JWS.
   * @return
   */
  public SignatureHeaderJws getHeader() {
    return header;
  }

  /**
   * Sets the hash of the message that was signed.
   * @param hash
   */
  public void setMessageHash(String hash) {
    this.messageHash = hash;
  }

  /**
   * Gets the algorithm used for the JWS signature.
   * @return
   */
  public SignatureAlg getAlg() {
    return SignatureAlg.fromString(this.header.alg);
  }
}
