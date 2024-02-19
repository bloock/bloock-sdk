<?php

namespace Bloock\Entity\Identity;

/**
 * Represents an enumeration of methods used in the DID.
 */
class Method
{
    const IDEN3 = "IDEN3";
    const POLYGON_ID = "POLYGON_ID";

    public static function fromProto(\Bloock\Method $method): string
    {
        switch ($method) {
            case \Bloock\Method::IDEN3:
                return Method::IDEN3;
            case \Bloock\Method::POLYGON_ID:
                return Method::POLYGON_ID;
            default:
                return Method::POLYGON_ID;
        }
    }

    public static function toProto(string $method): int
    {
        switch ($method) {
            case Method::IDEN3:
                return \Bloock\Method::IDEN3;
            case Method::POLYGON_ID:
                return \Bloock\Method::POLYGON_ID;
            default:
                return \Bloock\Method::POLYGON_ID;
        }
    }
}