import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import { EcdsaKeyPair, KeyPair } from "../entity/key";
import { NewConfigData } from "../config/config";
import { Signature } from "../entity/authenticity";
import { Record } from "../entity/record";
import {
  GetSignaturesRequest,
  SignRequest,
  VerifyRequest
} from "../bridge/proto/authenticity";
import { Signer } from "../entity/authenticity/signer";
import { GenerateLocalKeyRequest } from "../bridge/proto/keys";
import { KeyType } from "../bridge/proto/keys_entities";

/**
 * Represents a client for interacting with the [Bloock Authenticity service](https://dashboard.bloock.com/login).
 */
export class AuthenticityClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  /**
   * Creates a new instance of the AuthenticityClient with default configuration.
   * @param configData 
   */
  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * Generates ECDSA key pair for signing records.
   * @returns {Promise<KeyPair>} An object containing both the public and the private key
   * @deprecated Will be deleted in future versions. Use KeyClient.newLocalKey function instead.
   */
  public async generateEcdsaKeyPair(): Promise<KeyPair> {
    let request = GenerateLocalKeyRequest.fromPartial({
      configData: this.configData,
      keyType: KeyType.EcP256k
    });

    return this.bridge
      .getKey()
      .GenerateLocalKey(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return EcdsaKeyPair.fromProto(res);
      });
  }

  /**
   * Signs a Bloock record using the specified signer.
   * @param record 
   * @param signer 
   * @returns 
   */
  public async sign(record: Record, signer: Signer): Promise<Signature> {
    return this.bridge
      .getAuthenticity()
      .Sign(
        SignRequest.fromPartial({
          configData: this.configData,
          record: record.toProto(),
          signer: signer.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Signature.fromProto(res.signature!);
      });
  }

  /**
   * Verifies the authenticity of a Bloock record.
   * @param record 
   * @returns 
   */
  public async verify(record: Record): Promise<boolean> {
    return this.bridge
      .getAuthenticity()
      .Verify(
        VerifyRequest.fromPartial({
          configData: this.configData,
          record: record.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.valid;
      });
  }

  /**
   * Gets the signatures associated with a Bloock record.
   * @param record 
   * @returns 
   */
  async getSignatures(record: Record): Promise<Signature[]> {
    return this.bridge
      .getAuthenticity()
      .GetSignatures(
        GetSignaturesRequest.fromPartial({
          configData: this.configData,
          record: record.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.signatures.map(x => Signature.fromProto(x));
      });
  }
}
