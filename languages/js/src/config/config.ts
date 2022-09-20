import { ConfigData, Configuration } from "../bridge/proto/config";

export function NewConfigData(apiKey: string, host: string): ConfigData {
    return ConfigData.fromPartial({
        config: Configuration.fromPartial({
            host,
            apiKey,
        })
    })
}
