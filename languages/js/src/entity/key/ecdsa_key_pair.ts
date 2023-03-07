import * as keyProto from "../../bridge/proto/keys";
import { KeyPair } from "./key_pair";

export class EcdsaKeyPair extends KeyPair {
  static fromProto(k: keyProto.GenerateLocalKeyResponse): KeyPair {
    return new KeyPair(k.localKey!.key, k.localKey!.privateKey!);
  }
}
