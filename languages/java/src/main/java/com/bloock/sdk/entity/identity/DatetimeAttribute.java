package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Represents an attribute with a datetime value.
 */
public class DatetimeAttribute extends Attribute<LocalDateTime> {
  /**
   * Creates a new DatetimeAttribute instance with the provided key and value.
   * @param id
   * @param value
   */
  public DatetimeAttribute(String id, LocalDateTime value) {
    super(id, value);
  }

  public static DatetimeAttribute fromProto(IdentityEntities.DateTimeAttribute res) {
    LocalDateTime parsedDate = LocalDateTime.parse(res.getValue());
    return new DatetimeAttribute(res.getId(), parsedDate);
  }

  public IdentityEntities.DateTimeAttribute toProto() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");
    String formattedDate = this.value.format(formatter);

    return IdentityEntities.DateTimeAttribute.newBuilder()
        .setId(this.id)
        .setValue(formattedDate)
        .build();
  }
}
