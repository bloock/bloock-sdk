import { Bloock } from "../bloock";
import { ConfigData, Configuration } from "../bridge/proto/config";

export function NewConfigData(): ConfigData {
  return ConfigData.fromPartial({
    config: Configuration.fromPartial({
      apiKey: Bloock.getApiKey(),
      host: Bloock.getApiHost(),
    })
  });
}
