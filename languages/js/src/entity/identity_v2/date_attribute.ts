import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { Attribute } from "./attribute";

export class DateAttribute extends Attribute<Date> {
  public toProto(): identityEntitiesProto.DateAttributeV2 {
    return identityEntitiesProto.DateAttributeV2.fromPartial({
      id: this.id,
      value: formatDateToString(this.value)
    });
  }

  static fromProto(r: identityEntitiesProto.DateAttributeV2): DateAttribute {
    return new DateAttribute(r.id, parseDateString(r.value)!);
  }
}

function formatDateToString(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(date);
  const dateString = `${parts[0].value}-${parts[2].value}-${parts[4].value}`;

  return dateString;
}

function parseDateString(dateString: string): Date | null {
  const dateParts = dateString.split("-");

  if (dateParts.length !== 3) {
    return null;
  }

  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are 0-based in JavaScript Date
  const day = parseInt(dateParts[2]);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  return new Date(year, month, day);
}
