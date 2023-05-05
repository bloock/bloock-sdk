package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;

public class DecrypterArgs {
  LocalKey localKey;
  ManagedKey managedKey;

  public DecrypterArgs(LocalKey localKey) {
    this.localKey = localKey;
  }

  public DecrypterArgs(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }
}
