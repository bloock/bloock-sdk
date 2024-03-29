<?php

namespace Bloock\Entity\Integrity;

/**
 * Represents a network.
 */
class Network
{
    const ETHEREUM_MAINNET = "ETHEREUM_MAINNET";
    /**
     * @deprecated Test networks will be deleted in future versions. If you have been integrating with an existent test API key and you want to start a free trial period please contact support@bloock.com.
     */
    const ETHEREUM_GOERLI = "ETHEREUM_GOERLI";
    const GNOSIS_CHAIN = "GNOSIS_CHAIN";
    /**
     * @deprecated Test networks will be deleted in future versions. If you have been integrating with an existent test API key and you want to start a free trial period please contact support@bloock.com.
     */
    const BLOOCK_CHAIN = "BLOOCK_CHAIN";
    const POLYGON_CHAIN = "POLYGON_CHAIN";

    public static function fromProto(\Bloock\Network $network): string
    {
        switch ($network) {
            case \Bloock\Network::ETHEREUM_GOERLI:
                return Network::ETHEREUM_GOERLI;
            case \Bloock\Network::GNOSIS_CHAIN:
                return Network::GNOSIS_CHAIN;
            case \Bloock\Network::BLOOCK_CHAIN:
                return Network::BLOOCK_CHAIN;
            case \Bloock\Network::POLYGON_CHAIN:
                return Network::POLYGON_CHAIN;
            default:
                return Network::ETHEREUM_MAINNET;
        }
    }

    public static function toProto(string $network): int
    {
        switch ($network) {
            case Network::ETHEREUM_GOERLI:
                return \Bloock\Network::ETHEREUM_GOERLI;
            case Network::GNOSIS_CHAIN:
                return \Bloock\Network::GNOSIS_CHAIN;
            case Network::BLOOCK_CHAIN:
                return \Bloock\Network::BLOOCK_CHAIN;
            case Network::POLYGON_CHAIN:
                return \Bloock\Network::POLYGON_CHAIN;
            default:
                return \Bloock\Network::ETHEREUM_MAINNET;
        }
    }
}
