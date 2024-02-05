package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;

/**
 * Represents arguments for configuring an issuer key.
 */
public class IdentityKeyArgs {

  LocalKey localKey;
  ManagedKey managedKey;

  /**
   * Constructs an IdentityKeyArgs object with a local key.
   * @param localKey
   */
  public IdentityKeyArgs(LocalKey localKey) {
    this.localKey = localKey;
  }

  /**
   * Constructs an IdentityKeyArgs object with a managed key.
   * @param managedKey
   */
  public IdentityKeyArgs(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }
}
