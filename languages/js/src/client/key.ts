import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import {
  GenerateLocalKeyRequest,
  GenerateManagedKeyRequest
} from "../bridge/proto/keys";
import { NewConfigData } from "../config/config";
import { KeyType } from "../entity/key_type";
import { LocalKey } from "../entity/local_key";
import { ManagedKey, ManagedKeyParams } from "../entity/managed_key";

export class KeyClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  async newLocalKey(keyType: KeyType): Promise<LocalKey> {
    const request = GenerateLocalKeyRequest.fromPartial({
      configData: this.configData,
      keyType: KeyType.toProto(keyType)
    });
    return this.bridge
      .getKey()
      .GenerateLocalKey(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return LocalKey.fromProto(res.localKey!);
      });
  }

  async newManagedKey(params: ManagedKeyParams): Promise<ManagedKey> {
    const request = GenerateManagedKeyRequest.fromPartial({
      configData: this.configData,
      params: params.toProto()
    });

    return this.bridge
      .getKey()
      .GenerateManagedKey(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return ManagedKey.fromProto(res.managedKey!);
      });
  }
}
