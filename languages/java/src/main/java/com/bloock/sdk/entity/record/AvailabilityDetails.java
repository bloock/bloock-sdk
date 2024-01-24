package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.proto.RecordEntities;

public class AvailabilityDetails {
  String contentType;
  long size;

  AvailabilityDetails(String contentType, long size) {
    this.contentType = contentType;
    this.size = size;
  }

  public String getContentType() {
    return contentType;
  }

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
