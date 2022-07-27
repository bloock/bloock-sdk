import { NetworkConfiguration as WasmNetworkConfiguration } from '../bloock_wasm_api';

export class NetworkConfiguration {
  public CONTRACT_ADDRESS = '';
  public CONTRACT_ABI = '';
  public HTTP_PROVIDER = '';

  constructor(
    contactAddress: string,
    contractAbi: string,
    httpProvider: string
  ) {
    this.CONTRACT_ADDRESS = contactAddress;
    this.CONTRACT_ABI = contractAbi;
    this.HTTP_PROVIDER = httpProvider;
  }

  static fromWasm(config: WasmNetworkConfiguration): NetworkConfiguration {
    return new NetworkConfiguration(
      config.contract_address,
      config.contract_abi,
      config.http_provider
    );
  }

  toWasm(): WasmNetworkConfiguration {
    return new WasmNetworkConfiguration(
      this.CONTRACT_ADDRESS,
      this.CONTRACT_ABI,
      this.HTTP_PROVIDER
    );
  }
}
