package com.bloock.sdk.entity.key;

/**
 * Represents a pair of public and private keys.
 */
public class KeyPair {
  String publicKey;
  String privateKey;

  /**
   * Constructs a KeyPair object with the specified parameters.
   * @param publicKey
   * @param privateKey
   */
  KeyPair(String publicKey, String privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  /**
   * Gets the public key.
   * @return
   */
  public String getPublicKey() {
    return publicKey;
  }

  /**
   * Gets the private key.
   * @return
   */
  public String getPrivateKey() {
    return privateKey;
  }
}
