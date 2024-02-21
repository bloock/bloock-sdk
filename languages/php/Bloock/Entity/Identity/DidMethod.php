<?php

namespace Bloock\Entity\Identity;

/**
 * Represents the type of method did.
 */
class DidMethod
{
    /**
     * Represents the polygon id method did.
     */
    const PolygonID = "PolygonID";
    /**
     * Represents the polygon id test method did.
     */
    const PolygonIDTest = "PolygonIDTest";

    public static function toProto(string $method): int
    {
        switch ($method) {
            case DidMethod::PolygonID:
                return \Bloock\DidMethod::POLYGON_ID;
            case DidMethod::PolygonIDTest:
                return \Bloock\DidMethod::POLYGON_ID_TEST;
            default:
                return \Bloock\DidMethod::POLYGON_ID;
        }
    }

    public static function fromProto(int $method): string
    {
        switch ($method) {
            case \Bloock\DidMethod::POLYGON_ID:
                return DidMethod::PolygonID;
            case \Bloock\DidMethod::POLYGON_ID_TEST:
                return DidMethod::PolygonIDTest;
            default:
                return DidMethod::PolygonID;
        }
    }
}
