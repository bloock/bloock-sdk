import * as keyProto from "../../bridge/proto/bloock_keys";
import { KeyPair } from "./key_pair";

/**
 * Represents an ecdsa key pair, with private and public key.
 */
export class EcdsaKeyPair extends KeyPair {
  static fromProto(k: keyProto.GenerateLocalKeyResponse): KeyPair {
    return new KeyPair(k.localKey!.key, k.localKey!.privateKey!);
  }
}
