<?php

namespace Bloock\Entity\Integrity;

/**
 * Represents a network.
 */
class Network
{
    const ETHEREUM_MAINNET = "ETHEREUM_MAINNET";
    const ETHEREUM_SEPOLIA = "ETHEREUM_SEPOLIA";
    const GNOSIS_CHAIN = "GNOSIS_CHAIN";
    const POLYGON_CHAIN = "POLYGON_CHAIN";

    public static function fromProto(\Bloock\Network $network): string
    {
        switch ($network) {
            case \Bloock\Network::ETHEREUM_SEPOLIA:
                return Network::ETHEREUM_SEPOLIA;
            case \Bloock\Network::GNOSIS_CHAIN:
                return Network::GNOSIS_CHAIN;
            case \Bloock\Network::POLYGON_CHAIN:
                return Network::POLYGON_CHAIN;
            default:
                return Network::ETHEREUM_MAINNET;
        }
    }

    public static function toProto(string $network): int
    {
        switch ($network) {
            case Network::ETHEREUM_SEPOLIA:
                return \Bloock\Network::ETHEREUM_SEPOLIA;
            case Network::GNOSIS_CHAIN:
                return \Bloock\Network::GNOSIS_CHAIN;
            case Network::POLYGON_CHAIN:
                return \Bloock\Network::POLYGON_CHAIN;
            default:
                return \Bloock\Network::ETHEREUM_MAINNET;
        }
    }
}
