<?php

namespace Bloock\Entity\IdentityV2;

class Network
{
    const MAIN = "MAIN";
    const MUMBAI = "MUMBAI";
    const GOERLI = "GOERLI";
    const NO_NETWORK = "NO_NETWORK";
    const UNKNOWN_NETWORK = "UNKNOWN_NETWORK";

    public static function fromProto(\Bloock\Network $network): string
    {
        switch ($network) {
            case \Bloock\NetworkId::MAIN:
                return Network::MAIN;
            case \Bloock\NetworkId::MUMBAI:
                return Network::MUMBAI;
            case \Bloock\NetworkId::GOERLI:
                return Network::GOERLI;
            case \Bloock\NetworkId::NO_NETWORK:
                return Network::NO_NETWORK;
            case \Bloock\NetworkId::UNKNOWN_NETWORK:
                return Network::UNKNOWN_NETWORK;
            default:
                return Network::MUMBAI;
        }
    }

    public static function toProto(string $network): int
    {
        switch ($network) {
            case Network::MAIN:
                return \Bloock\NetworkId::MAIN;
            case Network::MUMBAI:
                return \Bloock\NetworkId::MUMBAI;
            case Network::GOERLI:
                return \Bloock\NetworkId::GOERLI;
            case Network::NO_NETWORK:
                return \Bloock\NetworkId::NO_NETWORK;
            case Network::UNKNOWN_NETWORK:
                return \Bloock\NetworkId::UNKNOWN_NETWORK;
            default:
                return \Bloock\NetworkId::MUMBAI;
        }
    }
}
