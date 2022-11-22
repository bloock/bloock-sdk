import { NetworkConfig } from "./entity/network_config";
import { Network, NetworkConfig as NetworkConfigProto } from "./bridge/proto/config";

export class Bloock {
  private static instance: Bloock;
  private apiKey?: string;
  private apiHost?: string;
  private networksConfig?: {
    [key: number]: NetworkConfigProto;
  };

  private constructor() {
      this.apiKey = "";
      this.apiHost = "";
      this.networksConfig = {};
  }

  public static getApiKey(): string | undefined {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    return Bloock.instance.apiKey;
  }

  public static setApiKey(apiKey: string) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    Bloock.instance.apiKey = apiKey;
  }

  public static getApiHost(): string | undefined {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    return Bloock.instance.apiHost;
  }

  public static setApiHost(host: string) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    Bloock.instance.apiHost = host;
  }

  public static getNetworkConfiguration():
    | { [key: number]: NetworkConfigProto }
    | undefined {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    return Bloock.instance.networksConfig;
  }

  public static setNetworkConfiguration(
    network: Network,
    config: NetworkConfig
  ) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    if (Bloock.instance.networksConfig) {
      Bloock.instance.networksConfig[network] = {
          ContractAddress: config.ContractAddress,
          ContractAbi: config.ContractAbi,
          HttpProvider: config.HttpProvider,
      };
    }
  }
}
