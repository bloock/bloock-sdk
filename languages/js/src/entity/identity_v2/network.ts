import { NetworkId as NetworkProto } from "../../bridge/proto/identity_entities_v2";

export enum NetworkId {
    UNRECOGNIZED = -1,
    MAIN = 0,
    MUMBAI = 1,
    GOERLI = 2,
    UNKNOWN_NETWORK = 3,
    NO_NETWORK = 4
}

export namespace NetworkId {
    export function toProto(network: NetworkId): NetworkProto {
        switch (network) {
            case NetworkId.MAIN:
                return NetworkProto.MAIN;
            case NetworkId.MUMBAI:
                return NetworkProto.MUMBAI;
            case NetworkId.GOERLI:
                return NetworkProto.GOERLI;
            case NetworkId.NO_NETWORK:
                return NetworkProto.NO_NETWORK
            case NetworkId.UNKNOWN_NETWORK:
                return NetworkProto.UNKNOWN_NETWORK
            default:
                return NetworkProto.UNRECOGNIZED;
        }
    }

    export function fromProto(network: NetworkProto | undefined): NetworkId {
        switch (network) {
            case NetworkProto.MAIN:
                return NetworkId.MAIN;
            case NetworkProto.MUMBAI:
                return NetworkId.MUMBAI;
            case NetworkProto.GOERLI:
                return NetworkId.GOERLI;
            case NetworkProto.NO_NETWORK:
                return NetworkId.NO_NETWORK;
            case NetworkProto.UNKNOWN_NETWORK:
                return NetworkId.UNKNOWN_NETWORK;
            default:
                return NetworkId.UNRECOGNIZED;
        }
    }
}