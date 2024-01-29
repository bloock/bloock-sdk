package com.bloock.sdk.entity.key;

public class Managed {
  ManagedKey managedKey;
  ManagedCertificate managedCertificate;

  public Managed(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }

  public Managed(ManagedCertificate managedCertificate) {
    this.managedCertificate = managedCertificate;
  }

  public ManagedKey getManagedKey() {
    return managedKey;
  }

  public ManagedCertificate getManagedCertificate() {
    return managedCertificate;
  }
}
