import { Bloock } from "../bloock";
import { ConfigData, Configuration } from "../bridge/proto/bloock_config";

export function NewConfigData(configData: ConfigData | undefined): ConfigData {
  if (configData) return configData;

  return ConfigData.fromPartial({
    config: Configuration.fromPartial({
      libraryName: "Javascript",
      apiKey: Bloock.getApiKey(),
      identityApiHost: Bloock.getIdentityApiHost(),
      host: Bloock.getApiHost()
    }),
    networksConfig: Bloock.getNetworkConfiguration()
  });
}
