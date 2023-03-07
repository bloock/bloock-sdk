import * as proto from "../../bridge/proto/integrity_entities";

export class RecordReceipt {
  anchor: number;
  client: string;
  record: string;
  status: string;

  constructor(anchor: number, client: string, record: string, status: string) {
    this.anchor = anchor;
    this.client = client;
    this.record = record;
    this.status = status;
  }

  static fromProto(r: proto.RecordReceipt): RecordReceipt {
    return new RecordReceipt(r.anchor, r.client, r.record, r.status);
  }

  toProto(): proto.RecordReceipt {
    return proto.RecordReceipt.fromPartial({
      anchor: this.anchor,
      client: this.client,
      record: this.record,
      status: this.status
    });
  }
}
