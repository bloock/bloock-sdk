package com.bloock.sdk.entity.key;

/**
 * Represents a managed entity that can be either a ManagedKey or a ManagedCertificate.
 */
public class Managed {
  ManagedKey managedKey;
  ManagedCertificate managedCertificate;

  /**
   * Constructs a Managed object for a given managed key object.
   * @param managedKey
   */
  public Managed(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }

  /**
   * Constructs a Managed object for a given managed certificate object.
   * @param managedCertificate
   */
  public Managed(ManagedCertificate managedCertificate) {
    this.managedCertificate = managedCertificate;
  }

  /**
   * Gets de managed key object.
   * @return
   */
  public ManagedKey getManagedKey() {
    return managedKey;
  }

  /**
   * Gets the managed certificate object
   * @return
   */
  public ManagedCertificate getManagedCertificate() {
    return managedCertificate;
  }
}
