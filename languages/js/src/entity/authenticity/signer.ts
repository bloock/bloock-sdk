import * as proto from "../../bridge/proto/authenticity_entities";

export interface Signer {
  toProto(): proto.Signer;
}
