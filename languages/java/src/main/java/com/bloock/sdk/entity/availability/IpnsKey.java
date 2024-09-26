package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;

/**
 * Represents an object with a key uuid identifier.
 */
public class IpnsKey {

  String keyID;

  /**
   * Creates an IpnsKey instance with a key uuid identifier.
   * 
   * @param keyID
   */
  public IpnsKey(String keyID) {
    this.keyID = keyID;
  }

  public BloockAvailabilityEntities.IpnsKey toProto() {
    return BloockAvailabilityEntities.IpnsKey.newBuilder()
      .setKeyId(this.keyID)
      .build();
  }

  public static IpnsKey fromProto(BloockAvailabilityEntities.IpnsKey ipnsKey) {
    if (ipnsKey != null) {
      return new IpnsKey(ipnsKey.getKeyId());
    } else {
      return null;
    }    
  }

  /**
   * Gets the key uuid identifier of the Ipns key object.
   * 
   * @return
   */
  public String getKeyID() {
    return keyID;
  }
}
