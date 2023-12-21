package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;

public class IdentityKeyArgs {

  LocalKey localKey;
  ManagedKey managedKey;

  public IdentityKeyArgs(LocalKey localKey) {
    this.localKey = localKey;
  }

  public IdentityKeyArgs(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }
}
