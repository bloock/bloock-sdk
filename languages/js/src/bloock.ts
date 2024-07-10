import {
  Network,
  NetworkConfig as NetworkConfigProto
} from "./bridge/proto/bloock_config";

/**
 * Provides a centralized configuration for the Bloock SDK library. For information about Bloock SDK in Go, see https://bloock.com.
 */
export class Bloock {
  private static instance: Bloock;
  private apiKey?: string;
  private identityApiHost?: string;
  private apiHost?: string;
  private networksConfig?: {
    [key: number]: NetworkConfigProto;
  };

  /**
   * Creates a new instance of Bloock instance.
   */
  private constructor() {
    this.apiKey = "";
    this.apiHost = "";
    this.networksConfig = {};
  }

  /**
   * Is a string variable representing the API key used for authentication with the Bloock SDK, create [here](https://dashboard.bloock.com/login).
   * @returns
   */
  public static getApiKey(): string | undefined {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    return Bloock.instance.apiKey;
  }

  /**
   * Sets the API key used for authentication with the Bloock SDK.
   * @param apiKey
   */
  public static setApiKey(apiKey: string) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    Bloock.instance.apiKey = apiKey;
  }

  /**
   * Is a string variable representing the host URL used for Identity Managed API, required to be set for identity-related features of the Bloock SDK.
   * @returns
   */
  public static getIdentityApiHost(): string | undefined {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    return Bloock.instance.identityApiHost;
  }

  /**
   * Sets the host URL used for Identity Managed API.
   * @param identityApiHost
   */
  public static setIdentityApiHost(identityApiHost: string) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    Bloock.instance.identityApiHost = identityApiHost;
  }

  /**
   * Is a string variable representing the host URL used for API communication with the Bloock SDK.
   * @returns
   */
  public static getApiHost(): string | undefined {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    return Bloock.instance.apiHost;
  }

  /**
   * Sets the host used for API communication with the Bloock SDK.
   * @param host
   */
  public static setApiHost(host: string) {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    Bloock.instance.apiHost = host;
  }

  /**
   * Is a variable that holds network configurations associated with specific network IDs in the Bloock SDK.
   * @returns
   */
  public static getNetworkConfiguration():
    | { [key: number]: NetworkConfigProto }
    | undefined {
    if (!Bloock.instance) {
      Bloock.instance = new Bloock();
    }
    return Bloock.instance.networksConfig;
  }

  /**
   * Sets the HTTP provider for the specified network in the Bloock SDK configuration.
   * @param network
   * @param provider
   */
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

  /**
   * Sets the contract address for the specified network in the Bloock SDK configuration.
   * @param network
   * @param contractAddress
   */
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
