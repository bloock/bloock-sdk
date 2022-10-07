import { ConfigData, Configuration } from "../bridge/proto/config";

export function NewConfigData(apiKey: string): ConfigData {
  return ConfigData.fromPartial({
    config: Configuration.fromPartial({
      apiKey
    })
  });
}
