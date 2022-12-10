import {
  Network,
  NetworkConfig as NetworkConfigProto
} from "./bridge/proto/config";

export class Bloock {
  private static instance: Bloock;
  private apiKey?: string;
  private apiHost?: string;
  private disableAnalytics: boolean = false;
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

  public static getDisableAnalytics(): boolean {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    return Bloock.instance.disableAnalytics;
  }

  public static setDisableAnalytics(disableAnalytics: boolean) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    Bloock.instance.disableAnalytics = disableAnalytics;
  }

  public static getNetworkConfiguration():
    | { [key: number]: NetworkConfigProto }
    | undefined {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    return Bloock.instance.networksConfig;
  }

  public static setProvider(network: Network, provider: string) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }

    if (Bloock.instance.networksConfig) {
      if (network in Bloock.instance.networksConfig) {
        Bloock.instance.networksConfig[network].HttpProvider = provider;
      } else {
        Bloock.instance.networksConfig[network] = {
          ContractAddress: "",
          ContractAbi: "",
          HttpProvider: provider
        };
      }
    }
  }

  public static setContractAddress(network: Network, contractAddress: string) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }

    if (Bloock.instance.networksConfig) {
      if (network in Bloock.instance.networksConfig) {
        Bloock.instance.networksConfig[
          network
        ].ContractAddress = contractAddress;
      } else {
        Bloock.instance.networksConfig[network] = {
          ContractAddress: "",
          ContractAbi: contractAddress,
          HttpProvider: ""
        };
      }
    }
  }
}
