package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;
import java.time.LocalDate;

/**
 * Represents an attribute with a date value, including its key and formatted value.
 */
public class DateAttribute extends Attribute<LocalDate> {
  /**
   * Creates a new DateAttribute instance with the provided key and time value.
   * @param id
   * @param value
   */
  public DateAttribute(String id, LocalDate value) {
    super(id, value);
  }

  public static DateAttribute fromProto(IdentityEntities.DateAttribute res) {
    LocalDate parsedDate = LocalDate.parse(res.getValue());

    return new DateAttribute(res.getId(), parsedDate);
  }

  public IdentityEntities.DateAttribute toProto() {
    String formattedDate = this.value.toString();

    return IdentityEntities.DateAttribute.newBuilder()
        .setId(this.id)
        .setValue(formattedDate)
        .build();
  }
}
