package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;

public class IssuerKeyArgs {

  LocalKey localKey;
  ManagedKey managedKey;

  public IssuerKeyArgs(LocalKey localKey) {
    this.localKey = localKey;
  }

  public IssuerKeyArgs(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }
}
