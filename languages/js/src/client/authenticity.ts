import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import { EcdsaKeyPair, KeyPair } from "../entity/keys";
import { NewConfigData } from "../config/config";
import { Signature } from "../entity/signature";
import { Record } from "../entity/record";
import {
  GetSignaturesRequest,
  SignRequest,
  SignatureCommonNameRequest,
  VerifyRequest
} from "../bridge/proto/authenticity";
import { Signer } from "../entity/signer";
import { GenerateLocalKeyRequest } from "../bridge/proto/keys";
import { KeyType } from "../bridge/proto/keys_entities";

export class AuthenticityClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * It generates a public and a private key
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

  public async getSignatureCommonName(signature: Signature) {
    return this.bridge
      .getAuthenticity()
      .GetSignatureCommonName(
        SignatureCommonNameRequest.fromPartial({
          configData: this.configData,
          signature: signature.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.commonName;
      });
  }

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
