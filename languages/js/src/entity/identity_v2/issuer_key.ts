import { IssuerKey as IssuerKeytProto } from "../../bridge/proto/identity_entities_v2";

export interface IssuerKey {
  toProto(): IssuerKeytProto;
}
