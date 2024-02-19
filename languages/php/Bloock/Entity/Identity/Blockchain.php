<?php

namespace Bloock\Entity\Identity;

/**
 * Represents an enumeration of blockchains used in the DID.
 */
class Blockchain
{
    const POLYGON = "POLYGON";
    const ETHEREUM = "ETHEREUM";
    const NO_CHAIN = "NO_CHAIN";
    const UNKNOWN_CHAIN = "UNKNOWN_CHAIN";

    public static function fromProto(\Bloock\Blockchain $blockchain): string
    {
        switch ($blockchain) {
            case \Bloock\Blockchain::POLYGON:
                return Blockchain::POLYGON;
            case \Bloock\Blockchain::ETHEREUM:
                return Blockchain::ETHEREUM;
            case \Bloock\Blockchain::NO_CHAIN:
                return Blockchain::NO_CHAIN;
            case \Bloock\Blockchain::UNKNOWN_CHAIN:
                return Blockchain::UNKNOWN_CHAIN;
            default:
                return Blockchain::UNKNOWN_CHAIN;
        }
    }

    public static function toProto(string $blockchain): int
    {
        switch ($blockchain) {
            case Blockchain::POLYGON:
                return \Bloock\Blockchain::POLYGON;
            case Blockchain::ETHEREUM:
                return \Bloock\Blockchain::ETHEREUM;
            case Blockchain::NO_CHAIN:
                return \Bloock\Blockchain::NO_CHAIN;
            case Blockchain::UNKNOWN_CHAIN:
                return \Bloock\Blockchain::UNKNOWN_CHAIN;
            default:
                return \Bloock\Blockchain::POLYGON;
        }
    }
}
