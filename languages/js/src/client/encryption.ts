import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import { EciesKeyPair, KeyPair, RsaKeyPair } from "../entity/keys";
import { Record } from "../entity/record";
import { NewConfigData } from "../config/config";
import {
  GenerateRsaKeyPairRequest,
  GenerateEciesKeyPairRequest,
  EncryptionAlgRequest,
  EncryptRequest,
  DecryptRequest
} from "../bridge/proto/encryption";
import { EncryptionAlg } from "../entity/encryption_alg";
import { Encrypter } from "../entity/encrypter";
import { Decrypter } from "../entity/decrypter";

export class EncryptionClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * It generates a public and a private key for RSA encryption
   * @returns {Promise<KeyPair>} An object containing both the public and the private key
   */
  public async generateRsaKeyPair(): Promise<KeyPair> {
    let request = GenerateRsaKeyPairRequest.fromPartial({
      configData: this.configData
    });

    return this.bridge
      .getEncryption()
      .GenerateRsaKeyPair(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return RsaKeyPair.fromProto(res);
      });
  }

  /**
   * It generates a public and a private key for ECIES encryption
   * @returns {Promise<KeyPair>} An object containing both the public and the private key
   */
  public async generateEciesKeyPair(): Promise<KeyPair> {
    let request = GenerateEciesKeyPairRequest.fromPartial({
      configData: this.configData
    });

    return this.bridge
      .getEncryption()
      .GenerateEciesKeyPair(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return EciesKeyPair.fromProto(res);
      });
  }

  async encrypt(record: Record, encrypter: Encrypter): Promise<Record> {
    return this.bridge
      .getEncryption()
      .Encrypt(
        EncryptRequest.fromPartial({
          configData: this.configData,
          record: record.toProto(),
          encrypter: encrypter.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Record.fromProto(res.record!, this.configData);
      });
  }

  async decrypt(record: Record, decrypter: Decrypter): Promise<Record> {
    return this.bridge
      .getEncryption()
      .Decrypt(
        DecryptRequest.fromPartial({
          configData: this.configData,
          record: record.toProto(),
          decrypter: decrypter.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Record.fromProto(res.record!, this.configData);
      });
  }

  async getEncryptionAlg(record: Record): Promise<EncryptionAlg> {
    return this.bridge
      .getEncryption()
      .GetEncryptionAlg(
        EncryptionAlgRequest.fromPartial({
          configData: this.configData,
          record: record.toProto()
        })
      )
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return EncryptionAlg.fromProto(res.alg);
      });
  }
}
