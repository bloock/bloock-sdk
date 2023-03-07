import * as proto from "../../bridge/proto/encryption_entities";
import { EncrypterArgs } from "./encrypter_args";

export interface Encrypter {
  alg: proto.EncryptionAlg;
  args: EncrypterArgs;
  toProto(): proto.Encrypter;
}
