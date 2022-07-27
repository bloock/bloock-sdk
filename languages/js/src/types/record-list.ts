import { Record } from '../record';

export class RecordList {
  static toWasm(records: Record[]): any {
    return records.map(record => record.toWasm());
  }
}
