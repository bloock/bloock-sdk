package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;
import com.bloock.sdk.entity.key.*;

/**
 * Represents an IpnsKey with various key types.
 */
public class IpnsKey {

  ManagedKey managedKey;
  ManagedCertificate managedCertificate;

  /**
   * Creates a IpnsKey instance with a managed key.
   * 
   * @param managedKey
   */
  public IpnsKey(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }

  /**
   * Creates a IpnsKey instance with a managed certificate.
   * 
   * @param managedCertificate
   */
  public IpnsKey(ManagedCertificate managedCertificate) {
    this.managedCertificate = managedCertificate;
  }

  public BloockAvailabilityEntities.IpnsKey toProto() {
    BloockAvailabilityEntities.IpnsKey.Builder builder = BloockAvailabilityEntities.IpnsKey.newBuilder();

    if (this.managedKey != null) {
      builder.setManagedKey(this.managedKey.toProto());
    }

    if (this.managedCertificate != null) {
      builder.setManagedCertificate(this.managedCertificate.toProto());
    }

    return builder.build();
  }
}
