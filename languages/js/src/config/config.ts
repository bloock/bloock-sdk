import { Bloock } from "../bloock";
import { ConfigData, Configuration } from "../bridge/proto/config";

export function NewConfigData(configData: ConfigData | undefined): ConfigData {
  if (configData) return configData;

  return ConfigData.fromPartial({
    config: Configuration.fromPartial({
      libraryName: "Javascript",
      apiKey: Bloock.getApiKey(),
      environment: Bloock.getForceEnv(),
      host: Bloock.getApiHost(),
      disableAnalytics: Bloock.getDisableAnalytics()
    }),
    networksConfig: Bloock.getNetworkConfiguration()
  });
}
