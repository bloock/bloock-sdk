import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import { KeyPair, RsaKeyPair } from "../entity/key";
import { Record } from "../entity/record/record";
import { NewConfigData } from "../config/config";
import {
  EncryptionAlgRequest,
  EncryptRequest,
  DecryptRequest
} from "../bridge/proto/encryption";
import { EncryptionAlg, Encrypter } from "../entity/encryption";
import { GenerateLocalKeyRequest } from "../bridge/proto/keys";
import { KeyType } from "../bridge/proto/keys_entities";

/**
 * Represents a client for interacting with the [Bloock Encryption service](https://dashboard.bloock.com/login).
 */
export class EncryptionClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  /**
   * Creates a new instance of the EncryptionClient with default configuration.
   * @param configData 
   */
  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * GenerateRsaKeyPair generates an RSA key pair for encryption.
   * @returns {Promise<KeyPair>} An object containing both the public and the private key
   * @deprecated Will be deleted in future versions. Use KeyClient.newLocalKey function instead.
   */
  public async generateRsaKeyPair(): Promise<KeyPair> {
    let request = GenerateLocalKeyRequest.fromPartial({
      configData: this.configData,
      keyType: KeyType.Rsa2048
    });

    return this.bridge
      .getKey()
      .GenerateLocalKey(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return RsaKeyPair.fromProto(res);
      });
  }

  /**
   * Encrypts a Bloock record using the specified encrypter.
   * @param record 
   * @param encrypter 
   * @returns 
   */
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

  /**
   * Decrypts a Bloock record using the specified decrypter.
   * @param record 
   * @param decrypter 
   * @returns 
   */
  async decrypt(record: Record, decrypter: Encrypter): Promise<Record> {
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

  /**
   * Gets the encryption algorithm used for a Bloock record.
   * @param record 
   * @returns 
   */
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
