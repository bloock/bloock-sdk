package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;
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

  public static DateAttribute fromProto(IdentityEntitiesV2.DateAttributeV2 res) {
    LocalDate parsedDate = LocalDate.parse(res.getValue());

    return new DateAttribute(res.getId(), parsedDate);
  }

  public IdentityEntitiesV2.DateAttributeV2 toProto() {
    String formattedDate = this.value.toString();

    return IdentityEntitiesV2.DateAttributeV2.newBuilder()
        .setId(this.id)
        .setValue(formattedDate)
        .build();
  }
}
