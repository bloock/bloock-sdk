package com.bloock.sdk.entity.availability;

import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities;
import com.bloock.sdk.bridge.proto.BloockAvailabilityEntities.PublisherArgs.Builder;

/**
 * Represents the arguments for a data publisher.
 */
public class PublisherArgs {
   /**
   * Is a managed key or certificate object that will be used to create the IPNS record.
   */
  IpnsKey ipnsKey;

  /**
   * Constructs a PublisherArgs object with the specified parameters.
   * 
   * @param ipnsKey
   */
  public PublisherArgs(IpnsKey ipnsKey) {
    this.ipnsKey = ipnsKey;
  }

  /**
   * Constructs a PublisherArgs object with no parameters.
   */
  public PublisherArgs() {
  }

  BloockAvailabilityEntities.PublisherArgs toProto() {
    Builder builder = BloockAvailabilityEntities.PublisherArgs.newBuilder();

    if (this.ipnsKey != null) {
      builder.setIpnsKey(this.ipnsKey.toProto());
    }
    
    return builder.build();
  }
}
