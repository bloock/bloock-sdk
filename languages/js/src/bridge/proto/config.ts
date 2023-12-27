/* eslint-disable */
import _m0 from "protobufjs/minimal";

export enum Network {
  ETHEREUM_MAINNET = 0,
  ETHEREUM_GOERLI = 1,
  GNOSIS_CHAIN = 2,
  BLOOCK_CHAIN = 3,
  POLYGON_CHAIN = 4,
  UNRECOGNIZED = -1,
}

export function networkFromJSON(object: any): Network {
  switch (object) {
    case 0:
    case "ETHEREUM_MAINNET":
      return Network.ETHEREUM_MAINNET;
    case 1:
    case "ETHEREUM_GOERLI":
      return Network.ETHEREUM_GOERLI;
    case 2:
    case "GNOSIS_CHAIN":
      return Network.GNOSIS_CHAIN;
    case 3:
    case "BLOOCK_CHAIN":
      return Network.BLOOCK_CHAIN;
    case 4:
    case "POLYGON_CHAIN":
      return Network.POLYGON_CHAIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Network.UNRECOGNIZED;
  }
}

export function networkToJSON(object: Network): string {
  switch (object) {
    case Network.ETHEREUM_MAINNET:
      return "ETHEREUM_MAINNET";
    case Network.ETHEREUM_GOERLI:
      return "ETHEREUM_GOERLI";
    case Network.GNOSIS_CHAIN:
      return "GNOSIS_CHAIN";
    case Network.BLOOCK_CHAIN:
      return "BLOOCK_CHAIN";
    case Network.POLYGON_CHAIN:
      return "POLYGON_CHAIN";
    case Network.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ConfigData {
  config?: Configuration | undefined;
  networksConfig: { [key: number]: NetworkConfig };
}

export interface ConfigData_NetworksConfigEntry {
  key: number;
  value?: NetworkConfig | undefined;
}

export interface Configuration {
  libraryName: string;
  host: string;
  apiKey: string;
  waitMessageIntervalFactor: number;
  waitMessageIntervalDefault: number;
  keyTypeAlgorithm: string;
  ellipticCurveKey: string;
  signatureAlgorithm: string;
  disableAnalytics: boolean;
  environment?: string | undefined;
}

export interface NetworkConfig {
  ContractAddress: string;
  ContractAbi: string;
  HttpProvider: string;
}

function createBaseConfigData(): ConfigData {
  return { config: undefined, networksConfig: {} };
}

export const ConfigData = {
  encode(message: ConfigData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.config !== undefined) {
      Configuration.encode(message.config, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.networksConfig).forEach(([key, value]) => {
      ConfigData_NetworksConfigEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.config = Configuration.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = ConfigData_NetworksConfigEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.networksConfig[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConfigData {
    return {
      config: isSet(object.config) ? Configuration.fromJSON(object.config) : undefined,
      networksConfig: isObject(object.networksConfig)
        ? Object.entries(object.networksConfig).reduce<{ [key: number]: NetworkConfig }>((acc, [key, value]) => {
          acc[globalThis.Number(key)] = NetworkConfig.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ConfigData): unknown {
    const obj: any = {};
    if (message.config !== undefined) {
      obj.config = Configuration.toJSON(message.config);
    }
    if (message.networksConfig) {
      const entries = Object.entries(message.networksConfig);
      if (entries.length > 0) {
        obj.networksConfig = {};
        entries.forEach(([k, v]) => {
          obj.networksConfig[k] = NetworkConfig.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConfigData>, I>>(base?: I): ConfigData {
    return ConfigData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConfigData>, I>>(object: I): ConfigData {
    const message = createBaseConfigData();
    message.config = (object.config !== undefined && object.config !== null)
      ? Configuration.fromPartial(object.config)
      : undefined;
    message.networksConfig = Object.entries(object.networksConfig ?? {}).reduce<{ [key: number]: NetworkConfig }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[globalThis.Number(key)] = NetworkConfig.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseConfigData_NetworksConfigEntry(): ConfigData_NetworksConfigEntry {
  return { key: 0, value: undefined };
}

export const ConfigData_NetworksConfigEntry = {
  encode(message: ConfigData_NetworksConfigEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== undefined) {
      NetworkConfig.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigData_NetworksConfigEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigData_NetworksConfigEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = NetworkConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConfigData_NetworksConfigEntry {
    return {
      key: isSet(object.key) ? globalThis.Number(object.key) : 0,
      value: isSet(object.value) ? NetworkConfig.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ConfigData_NetworksConfigEntry): unknown {
    const obj: any = {};
    if (message.key !== 0) {
      obj.key = Math.round(message.key);
    }
    if (message.value !== undefined) {
      obj.value = NetworkConfig.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConfigData_NetworksConfigEntry>, I>>(base?: I): ConfigData_NetworksConfigEntry {
    return ConfigData_NetworksConfigEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConfigData_NetworksConfigEntry>, I>>(
    object: I,
  ): ConfigData_NetworksConfigEntry {
    const message = createBaseConfigData_NetworksConfigEntry();
    message.key = object.key ?? 0;
    message.value = (object.value !== undefined && object.value !== null)
      ? NetworkConfig.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseConfiguration(): Configuration {
  return {
    libraryName: "",
    host: "",
    apiKey: "",
    waitMessageIntervalFactor: 0,
    waitMessageIntervalDefault: 0,
    keyTypeAlgorithm: "",
    ellipticCurveKey: "",
    signatureAlgorithm: "",
    disableAnalytics: false,
    environment: undefined,
  };
}

export const Configuration = {
  encode(message: Configuration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.libraryName !== "") {
      writer.uint32(10).string(message.libraryName);
    }
    if (message.host !== "") {
      writer.uint32(18).string(message.host);
    }
    if (message.apiKey !== "") {
      writer.uint32(26).string(message.apiKey);
    }
    if (message.waitMessageIntervalFactor !== 0) {
      writer.uint32(32).int32(message.waitMessageIntervalFactor);
    }
    if (message.waitMessageIntervalDefault !== 0) {
      writer.uint32(40).int32(message.waitMessageIntervalDefault);
    }
    if (message.keyTypeAlgorithm !== "") {
      writer.uint32(50).string(message.keyTypeAlgorithm);
    }
    if (message.ellipticCurveKey !== "") {
      writer.uint32(58).string(message.ellipticCurveKey);
    }
    if (message.signatureAlgorithm !== "") {
      writer.uint32(66).string(message.signatureAlgorithm);
    }
    if (message.disableAnalytics === true) {
      writer.uint32(72).bool(message.disableAnalytics);
    }
    if (message.environment !== undefined) {
      writer.uint32(82).string(message.environment);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Configuration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.libraryName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.host = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.apiKey = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.waitMessageIntervalFactor = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.waitMessageIntervalDefault = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.keyTypeAlgorithm = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.ellipticCurveKey = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.signatureAlgorithm = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.disableAnalytics = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.environment = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Configuration {
    return {
      libraryName: isSet(object.libraryName) ? globalThis.String(object.libraryName) : "",
      host: isSet(object.host) ? globalThis.String(object.host) : "",
      apiKey: isSet(object.apiKey) ? globalThis.String(object.apiKey) : "",
      waitMessageIntervalFactor: isSet(object.waitMessageIntervalFactor)
        ? globalThis.Number(object.waitMessageIntervalFactor)
        : 0,
      waitMessageIntervalDefault: isSet(object.waitMessageIntervalDefault)
        ? globalThis.Number(object.waitMessageIntervalDefault)
        : 0,
      keyTypeAlgorithm: isSet(object.keyTypeAlgorithm) ? globalThis.String(object.keyTypeAlgorithm) : "",
      ellipticCurveKey: isSet(object.ellipticCurveKey) ? globalThis.String(object.ellipticCurveKey) : "",
      signatureAlgorithm: isSet(object.signatureAlgorithm) ? globalThis.String(object.signatureAlgorithm) : "",
      disableAnalytics: isSet(object.disableAnalytics) ? globalThis.Boolean(object.disableAnalytics) : false,
      environment: isSet(object.environment) ? globalThis.String(object.environment) : undefined,
    };
  },

  toJSON(message: Configuration): unknown {
    const obj: any = {};
    if (message.libraryName !== "") {
      obj.libraryName = message.libraryName;
    }
    if (message.host !== "") {
      obj.host = message.host;
    }
    if (message.apiKey !== "") {
      obj.apiKey = message.apiKey;
    }
    if (message.waitMessageIntervalFactor !== 0) {
      obj.waitMessageIntervalFactor = Math.round(message.waitMessageIntervalFactor);
    }
    if (message.waitMessageIntervalDefault !== 0) {
      obj.waitMessageIntervalDefault = Math.round(message.waitMessageIntervalDefault);
    }
    if (message.keyTypeAlgorithm !== "") {
      obj.keyTypeAlgorithm = message.keyTypeAlgorithm;
    }
    if (message.ellipticCurveKey !== "") {
      obj.ellipticCurveKey = message.ellipticCurveKey;
    }
    if (message.signatureAlgorithm !== "") {
      obj.signatureAlgorithm = message.signatureAlgorithm;
    }
    if (message.disableAnalytics === true) {
      obj.disableAnalytics = message.disableAnalytics;
    }
    if (message.environment !== undefined) {
      obj.environment = message.environment;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Configuration>, I>>(base?: I): Configuration {
    return Configuration.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Configuration>, I>>(object: I): Configuration {
    const message = createBaseConfiguration();
    message.libraryName = object.libraryName ?? "";
    message.host = object.host ?? "";
    message.apiKey = object.apiKey ?? "";
    message.waitMessageIntervalFactor = object.waitMessageIntervalFactor ?? 0;
    message.waitMessageIntervalDefault = object.waitMessageIntervalDefault ?? 0;
    message.keyTypeAlgorithm = object.keyTypeAlgorithm ?? "";
    message.ellipticCurveKey = object.ellipticCurveKey ?? "";
    message.signatureAlgorithm = object.signatureAlgorithm ?? "";
    message.disableAnalytics = object.disableAnalytics ?? false;
    message.environment = object.environment ?? undefined;
    return message;
  },
};

function createBaseNetworkConfig(): NetworkConfig {
  return { ContractAddress: "", ContractAbi: "", HttpProvider: "" };
}

export const NetworkConfig = {
  encode(message: NetworkConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ContractAddress !== "") {
      writer.uint32(10).string(message.ContractAddress);
    }
    if (message.ContractAbi !== "") {
      writer.uint32(18).string(message.ContractAbi);
    }
    if (message.HttpProvider !== "") {
      writer.uint32(26).string(message.HttpProvider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetworkConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ContractAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ContractAbi = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.HttpProvider = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NetworkConfig {
    return {
      ContractAddress: isSet(object.ContractAddress) ? globalThis.String(object.ContractAddress) : "",
      ContractAbi: isSet(object.ContractAbi) ? globalThis.String(object.ContractAbi) : "",
      HttpProvider: isSet(object.HttpProvider) ? globalThis.String(object.HttpProvider) : "",
    };
  },

  toJSON(message: NetworkConfig): unknown {
    const obj: any = {};
    if (message.ContractAddress !== "") {
      obj.ContractAddress = message.ContractAddress;
    }
    if (message.ContractAbi !== "") {
      obj.ContractAbi = message.ContractAbi;
    }
    if (message.HttpProvider !== "") {
      obj.HttpProvider = message.HttpProvider;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NetworkConfig>, I>>(base?: I): NetworkConfig {
    return NetworkConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NetworkConfig>, I>>(object: I): NetworkConfig {
    const message = createBaseNetworkConfig();
    message.ContractAddress = object.ContractAddress ?? "";
    message.ContractAbi = object.ContractAbi ?? "";
    message.HttpProvider = object.HttpProvider ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
