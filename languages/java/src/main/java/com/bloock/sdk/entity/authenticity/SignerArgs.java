package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.entity.key.LocalKey;
import com.bloock.sdk.entity.key.ManagedKey;

public class SignerArgs {

  LocalKey localKey;
  ManagedKey managedKey;
  String commonName;

  public SignerArgs(LocalKey localKey) {
    this.localKey = localKey;
  }

  public SignerArgs(LocalKey localKey, String commonName) {
    this.localKey = localKey;
    this.commonName = commonName;
  }

  public SignerArgs(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }

  public SignerArgs(ManagedKey managedKey, String commonName) {
    this.managedKey = managedKey;
    this.commonName = commonName;
  }
}
