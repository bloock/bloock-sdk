package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeys;

/**
 * Represents a rsa key pair, with private and public key.
 */
public class RsaKeyPair extends KeyPair {
  RsaKeyPair(String publicKey, String privateKey) {
    super(publicKey, privateKey);
  }

  public static RsaKeyPair fromProto(BloockKeys.GenerateLocalKeyResponse keys) {
    return new RsaKeyPair(keys.getLocalKey().getKey(), keys.getLocalKey().getPrivateKey());
  }
}
