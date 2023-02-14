import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import { EcdsaKeyPair, KeyPair } from "../entity/keys";
import { NewConfigData } from "../config/config";
import { Signature } from "../entity/signature";
import { Record } from "../entity/record";
import {
  GenerateEcdsaKeysRequest,
  GetSignaturesRequest,
  SignRequest,
  SignatureCommonNameRequest,
  VerifyRequest
} from "../bridge/proto/authenticity";
import { Signer } from "../entity/signer";

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
   */
  public async generateEcdsaKeyPair(): Promise<KeyPair> {
    let request = GenerateEcdsaKeysRequest.fromPartial({
      configData: this.configData
    });

    return this.bridge
      .getAuthenticity()
      .GenerateEcdsaKeys(request)
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
