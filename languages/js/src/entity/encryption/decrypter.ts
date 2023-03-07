import * as proto from "../../bridge/proto/encryption_entities";
import { DecrypterArgs } from "./decrypter_args";

export interface Decrypter {
  alg: proto.EncryptionAlg;
  args: DecrypterArgs;
  toProto(): proto.Decrypter;
}
