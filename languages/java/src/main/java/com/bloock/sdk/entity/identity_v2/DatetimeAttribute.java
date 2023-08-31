package com.bloock.sdk.entity.identity_v2;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class DatetimeAttribute extends Attribute<LocalDateTime> {
  public DatetimeAttribute(String id, LocalDateTime value) {
    super(id, value);
  }

  public static DatetimeAttribute fromProto(IdentityEntitiesV2.DateTimeAttributeV2 res) {
    DateTimeFormatter rfc3339Formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX");
    LocalDateTime parsedDate = LocalDateTime.parse(res.getValue(), rfc3339Formatter);

    return new DatetimeAttribute(res.getId(), parsedDate);
  }

  public IdentityEntitiesV2.DateTimeAttributeV2 toProto() {
    DateTimeFormatter rfc3339Formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssXXX");
    String formattedDate = this.value.format(rfc3339Formatter);

    return IdentityEntitiesV2.DateTimeAttributeV2.newBuilder()
        .setId(this.id)
        .setValue(formattedDate)
        .build();
  }
}
