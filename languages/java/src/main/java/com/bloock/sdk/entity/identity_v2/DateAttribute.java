package com.bloock.sdk.entity.identity_v2;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class DateAttribute extends Attribute<LocalDate> {
  public DateAttribute(String id, LocalDate value) {
    super(id, value);
  }

  public static DateAttribute fromProto(IdentityEntitiesV2.DateAttributeV2 res) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate parsedDate = LocalDate.parse(res.getValue(), formatter);

    return new DateAttribute(res.getId(), parsedDate);
  }

  public IdentityEntitiesV2.DateAttributeV2 toProto() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    String formattedDate = this.value.format(formatter);

    return IdentityEntitiesV2.DateAttributeV2.newBuilder().setId(this.id).setValue(formattedDate).build();
  }
}
