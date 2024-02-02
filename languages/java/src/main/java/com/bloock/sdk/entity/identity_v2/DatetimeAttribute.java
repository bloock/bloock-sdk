package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;
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

  public static DatetimeAttribute fromProto(IdentityEntitiesV2.DateTimeAttributeV2 res) {
    LocalDateTime parsedDate = LocalDateTime.parse(res.getValue());
    return new DatetimeAttribute(res.getId(), parsedDate);
  }

  public IdentityEntitiesV2.DateTimeAttributeV2 toProto() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");
    String formattedDate = this.value.format(formatter);

    return IdentityEntitiesV2.DateTimeAttributeV2.newBuilder()
        .setId(this.id)
        .setValue(formattedDate)
        .build();
  }
}
