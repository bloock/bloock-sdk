package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.BloockAuthenticityEntities;

/**
 * Represents a cryptographic signature along with additional metadata.
 */
public class Signature {
  /**
   * Is the cryptographic signature.
   */
  String signature;
  /**
   * Is the algorithm used for the signature.
   */
  String alg;
  /**
   * Is the key identifier associated with the signature. (public key or key ID).
   */
  String kid;
  /**
   * Is the hash of the message that was signed.
   */
  String messageHash;
  /**
   * Is an optional field representing the subject of the signature.
   */
  String subject;

  /**
   * Constructs a Signature object with the specified parameters.
   * 
   * @param signature
   * @param alg
   * @param kid
   * @param messageHash
   * @param subject
   */
  Signature(String signature, String alg, String kid, String messageHash, String subject) {
    this.signature = signature;
    this.alg = alg;
    this.kid = kid;
    this.messageHash = messageHash;
    this.subject = subject;
  }

  public static Signature fromProto(BloockAuthenticityEntities.Signature signature) {
    return new Signature(
        signature.getSignature(),
        signature.getAlg(),
        signature.getKid(),
        signature.getMessageHash(),
        signature.getSubject());
  }

  public BloockAuthenticityEntities.Signature toProto() {
    return BloockAuthenticityEntities.Signature.newBuilder()
        .setSignature(this.signature)
        .setAlg(this.alg)
        .setKid(this.kid)
        .setMessageHash(this.messageHash)
        .setSubject(this.subject)
        .build();
  }

  /**
   * Gets the cryptographic signature.
   * 
   * @return
   */
  public String getSignature() {
    return signature;
  }

  /**
   * Sets the cryptographic signature.
   * 
   * @param signature
   */
  public void setSignature(String signature) {
    this.signature = signature;
  }

  /**
   * Returns the SignatureAlg based on the algorithm specified in the Alg field.
   * 
   * @return
   */
  public SignatureAlg getAlg() {
    return SignatureAlg.fromString(this.alg);
  }

  /**
   * Gets the key identifier associated with the signature. (public key or key
   * ID).
   * 
   * @return
   */
  public String getKid() {
    return kid;
  }

  /**
   * Sets the hash of the message that was signed.
   * 
   * @param hash
   */
  public void setMessageHash(String hash) {
    this.messageHash = hash;
  }

  /**
   * Gets the subject of the signature.
   * 
   * @return
   */
  public String getSubject() {
    return subject;
  }

  /**
   * Sets the subject of the signature.
   * 
   * @param subject
   */
  public void setSubject(String subject) {
    this.subject = subject;
  }
}
