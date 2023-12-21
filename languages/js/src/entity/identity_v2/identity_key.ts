import { IdentityKey as IssuerKeyProto } from "../../bridge/proto/identity_entities_v2";

export interface IdentityKey {
  toProto(): IssuerKeyProto;
}
