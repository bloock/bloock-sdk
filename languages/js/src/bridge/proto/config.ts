/* eslint-disable */
import _m0 from 'protobufjs/minimal';

export enum Network {
  ETHEREUM_MAINNET = 0,
  ETHEREUM_RINKEBY = 1,
  GNOSIS_CHAIN = 2,
  BLOOCK_CHAIN = 3,
  UNRECOGNIZED = -1,
}

export function networkFromJSON(object: any): Network {
  switch (object) {
    case 0:
    case 'ETHEREUM_MAINNET':
      return Network.ETHEREUM_MAINNET;
    case 1:
    case 'ETHEREUM_RINKEBY':
      return Network.ETHEREUM_RINKEBY;
    case 2:
    case 'GNOSIS_CHAIN':
      return Network.GNOSIS_CHAIN;
    case 3:
    case 'BLOOCK_CHAIN':
      return Network.BLOOCK_CHAIN;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Network.UNRECOGNIZED;
  }
}

export function networkToJSON(object: Network): string {
  switch (object) {
    case Network.ETHEREUM_MAINNET:
      return 'ETHEREUM_MAINNET';
    case Network.ETHEREUM_RINKEBY:
      return 'ETHEREUM_RINKEBY';
    case Network.GNOSIS_CHAIN:
      return 'GNOSIS_CHAIN';
    case Network.BLOOCK_CHAIN:
      return 'BLOOCK_CHAIN';
    case Network.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface ConfigData {
  config?: Configuration;
  networksConfig: {[key: number]: NetworkConfig};
}

export interface ConfigData_NetworksConfigEntry {
  key: number;
  value?: NetworkConfig;
}

export interface Configuration {
  host: string;
  apiKey: string;
  waitMessageIntervalFactor: number;
  waitMessageIntervalDefault: number;
  keyTypeAlgorithm: string;
  ellipticCurveKey: string;
  signatureAlgorithm: string;
}

export interface NetworkConfig {
  ContractAddress: string;
  ContractAbi: string;
  HttpProvider: string;
}

function createBaseConfigData(): ConfigData {
  return {config: undefined, networksConfig: {}};
}

export const ConfigData = {
  encode(
    message: ConfigData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.config !== undefined) {
      Configuration.encode(message.config, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.networksConfig).forEach(([key, value]) => {
      ConfigData_NetworksConfigEntry.encode(
        {key: key as any, value},
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.config = Configuration.decode(reader, reader.uint32());
          break;
        case 2:
          const entry2 = ConfigData_NetworksConfigEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.networksConfig[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfigData {
    return {
      config: isSet(object.config)
        ? Configuration.fromJSON(object.config)
        : undefined,
      networksConfig: isObject(object.networksConfig)
        ? Object.entries(object.networksConfig).reduce<{
            [key: number]: NetworkConfig;
          }>((acc, [key, value]) => {
            acc[Number(key)] = NetworkConfig.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: ConfigData): unknown {
    const obj: any = {};
    message.config !== undefined &&
      (obj.config = message.config
        ? Configuration.toJSON(message.config)
        : undefined);
    obj.networksConfig = {};
    if (message.networksConfig) {
      Object.entries(message.networksConfig).forEach(([k, v]) => {
        obj.networksConfig[k] = NetworkConfig.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigData>, I>>(
    object: I
  ): ConfigData {
    const message = createBaseConfigData();
    message.config =
      object.config !== undefined && object.config !== null
        ? Configuration.fromPartial(object.config)
        : undefined;
    message.networksConfig = Object.entries(
      object.networksConfig ?? {}
    ).reduce<{[key: number]: NetworkConfig}>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = NetworkConfig.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseConfigData_NetworksConfigEntry(): ConfigData_NetworksConfigEntry {
  return {key: 0, value: undefined};
}

export const ConfigData_NetworksConfigEntry = {
  encode(
    message: ConfigData_NetworksConfigEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== undefined) {
      NetworkConfig.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ConfigData_NetworksConfigEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigData_NetworksConfigEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = NetworkConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfigData_NetworksConfigEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value)
        ? NetworkConfig.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: ConfigData_NetworksConfigEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined &&
      (obj.value = message.value
        ? NetworkConfig.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigData_NetworksConfigEntry>, I>>(
    object: I
  ): ConfigData_NetworksConfigEntry {
    const message = createBaseConfigData_NetworksConfigEntry();
    message.key = object.key ?? 0;
    message.value =
      object.value !== undefined && object.value !== null
        ? NetworkConfig.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseConfiguration(): Configuration {
  return {
    host: '',
    apiKey: '',
    waitMessageIntervalFactor: 0,
    waitMessageIntervalDefault: 0,
    keyTypeAlgorithm: '',
    ellipticCurveKey: '',
    signatureAlgorithm: '',
  };
}

export const Configuration = {
  encode(
    message: Configuration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.host !== '') {
      writer.uint32(10).string(message.host);
    }
    if (message.apiKey !== '') {
      writer.uint32(18).string(message.apiKey);
    }
    if (message.waitMessageIntervalFactor !== 0) {
      writer.uint32(24).int32(message.waitMessageIntervalFactor);
    }
    if (message.waitMessageIntervalDefault !== 0) {
      writer.uint32(32).int32(message.waitMessageIntervalDefault);
    }
    if (message.keyTypeAlgorithm !== '') {
      writer.uint32(42).string(message.keyTypeAlgorithm);
    }
    if (message.ellipticCurveKey !== '') {
      writer.uint32(50).string(message.ellipticCurveKey);
    }
    if (message.signatureAlgorithm !== '') {
      writer.uint32(58).string(message.signatureAlgorithm);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Configuration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.host = reader.string();
          break;
        case 2:
          message.apiKey = reader.string();
          break;
        case 3:
          message.waitMessageIntervalFactor = reader.int32();
          break;
        case 4:
          message.waitMessageIntervalDefault = reader.int32();
          break;
        case 5:
          message.keyTypeAlgorithm = reader.string();
          break;
        case 6:
          message.ellipticCurveKey = reader.string();
          break;
        case 7:
          message.signatureAlgorithm = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Configuration {
    return {
      host: isSet(object.host) ? String(object.host) : '',
      apiKey: isSet(object.apiKey) ? String(object.apiKey) : '',
      waitMessageIntervalFactor: isSet(object.waitMessageIntervalFactor)
        ? Number(object.waitMessageIntervalFactor)
        : 0,
      waitMessageIntervalDefault: isSet(object.waitMessageIntervalDefault)
        ? Number(object.waitMessageIntervalDefault)
        : 0,
      keyTypeAlgorithm: isSet(object.keyTypeAlgorithm)
        ? String(object.keyTypeAlgorithm)
        : '',
      ellipticCurveKey: isSet(object.ellipticCurveKey)
        ? String(object.ellipticCurveKey)
        : '',
      signatureAlgorithm: isSet(object.signatureAlgorithm)
        ? String(object.signatureAlgorithm)
        : '',
    };
  },

  toJSON(message: Configuration): unknown {
    const obj: any = {};
    message.host !== undefined && (obj.host = message.host);
    message.apiKey !== undefined && (obj.apiKey = message.apiKey);
    message.waitMessageIntervalFactor !== undefined &&
      (obj.waitMessageIntervalFactor = Math.round(
        message.waitMessageIntervalFactor
      ));
    message.waitMessageIntervalDefault !== undefined &&
      (obj.waitMessageIntervalDefault = Math.round(
        message.waitMessageIntervalDefault
      ));
    message.keyTypeAlgorithm !== undefined &&
      (obj.keyTypeAlgorithm = message.keyTypeAlgorithm);
    message.ellipticCurveKey !== undefined &&
      (obj.ellipticCurveKey = message.ellipticCurveKey);
    message.signatureAlgorithm !== undefined &&
      (obj.signatureAlgorithm = message.signatureAlgorithm);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Configuration>, I>>(
    object: I
  ): Configuration {
    const message = createBaseConfiguration();
    message.host = object.host ?? '';
    message.apiKey = object.apiKey ?? '';
    message.waitMessageIntervalFactor = object.waitMessageIntervalFactor ?? 0;
    message.waitMessageIntervalDefault = object.waitMessageIntervalDefault ?? 0;
    message.keyTypeAlgorithm = object.keyTypeAlgorithm ?? '';
    message.ellipticCurveKey = object.ellipticCurveKey ?? '';
    message.signatureAlgorithm = object.signatureAlgorithm ?? '';
    return message;
  },
};

function createBaseNetworkConfig(): NetworkConfig {
  return {ContractAddress: '', ContractAbi: '', HttpProvider: ''};
}

export const NetworkConfig = {
  encode(
    message: NetworkConfig,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ContractAddress !== '') {
      writer.uint32(10).string(message.ContractAddress);
    }
    if (message.ContractAbi !== '') {
      writer.uint32(18).string(message.ContractAbi);
    }
    if (message.HttpProvider !== '') {
      writer.uint32(26).string(message.HttpProvider);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetworkConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ContractAddress = reader.string();
          break;
        case 2:
          message.ContractAbi = reader.string();
          break;
        case 3:
          message.HttpProvider = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkConfig {
    return {
      ContractAddress: isSet(object.ContractAddress)
        ? String(object.ContractAddress)
        : '',
      ContractAbi: isSet(object.ContractAbi) ? String(object.ContractAbi) : '',
      HttpProvider: isSet(object.HttpProvider)
        ? String(object.HttpProvider)
        : '',
    };
  },

  toJSON(message: NetworkConfig): unknown {
    const obj: any = {};
    message.ContractAddress !== undefined &&
      (obj.ContractAddress = message.ContractAddress);
    message.ContractAbi !== undefined &&
      (obj.ContractAbi = message.ContractAbi);
    message.HttpProvider !== undefined &&
      (obj.HttpProvider = message.HttpProvider);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NetworkConfig>, I>>(
    object: I
  ): NetworkConfig {
    const message = createBaseNetworkConfig();
    message.ContractAddress = object.ContractAddress ?? '';
    message.ContractAbi = object.ContractAbi ?? '';
    message.HttpProvider = object.HttpProvider ?? '';
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? {[K in keyof T]?: DeepPartial<T[K]>}
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & {[K in keyof P]: Exact<P[K], I[K]>} & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
