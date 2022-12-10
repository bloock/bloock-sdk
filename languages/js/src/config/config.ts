import { Bloock } from "../bloock";
import { ConfigData, Configuration } from "../bridge/proto/config";

export function NewConfigData(): ConfigData {
  return ConfigData.fromPartial({
    config: Configuration.fromPartial({
      libraryName: "Javascript",
      apiKey: Bloock.getApiKey(),
      host: Bloock.getApiHost(),
      disableAnalytics: Bloock.getDisableAnalytics()
    })
  });
}
