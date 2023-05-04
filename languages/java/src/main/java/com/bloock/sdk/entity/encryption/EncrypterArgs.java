package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;

class EncrypterArgs {
  String key;
  LocalKey localKey;
  ManagedKey managedKey;

  public EncrypterArgs(String key) {
    this.key = key;
  }

  public EncrypterArgs(LocalKey localKey) {
    this.localKey = localKey;
  }

  public EncrypterArgs(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }
}
