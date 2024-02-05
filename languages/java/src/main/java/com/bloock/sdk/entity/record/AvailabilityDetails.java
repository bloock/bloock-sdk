package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.proto.RecordEntities;

/**
 * Represents details related to the availability of a record, including content type and size.
 */
public class AvailabilityDetails {
  String contentType;
  long size;

  /**
   * Constructs a AvailabilityDetails object with the specified parameters.
   * @param contentType
   * @param size
   */
  AvailabilityDetails(String contentType, long size) {
    this.contentType = contentType;
    this.size = size;
  }

  /**
   * Gets the content type of record file.
   * @return
   */
  public String getContentType() {
    return contentType;
  }

  /**
   * Gets the byte size of the record file.
   * @return
   */
  public long getSize() {
    return size;
  }

  public static AvailabilityDetails fromProto(RecordEntities.AvailabilityDetails details) {
    String type = null;
    if (details.hasType()) {
      type = details.getType();
    }
    return new AvailabilityDetails(type, details.getSize());
  }

  public RecordEntities.AvailabilityDetails toProto() {
    return RecordEntities.AvailabilityDetails.newBuilder()
        .setType(contentType)
        .setSize(size)
        .build();
  }
}
