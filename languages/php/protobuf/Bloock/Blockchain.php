<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity_entities.proto

namespace Bloock;

use UnexpectedValueException;

/**
 * Protobuf type <code>bloock.Blockchain</code>
 */
class Blockchain
{
    /**
     * Generated from protobuf enum <code>ETHEREUM = 0;</code>
     */
    const ETHEREUM = 0;
    /**
     * Generated from protobuf enum <code>POLYGON = 1;</code>
     */
    const POLYGON = 1;
    /**
     * Generated from protobuf enum <code>UNKNOWN_CHAIN = 2;</code>
     */
    const UNKNOWN_CHAIN = 2;
    /**
     * Generated from protobuf enum <code>NO_CHAIN = 3;</code>
     */
    const NO_CHAIN = 3;

    private static $valueToName = [
        self::ETHEREUM => 'ETHEREUM',
        self::POLYGON => 'POLYGON',
        self::UNKNOWN_CHAIN => 'UNKNOWN_CHAIN',
        self::NO_CHAIN => 'NO_CHAIN',
    ];

    public static function name($value)
    {
        if (!isset(self::$valueToName[$value])) {
            throw new UnexpectedValueException(sprintf(
                    'Enum %s has no name defined for value %s', __CLASS__, $value));
        }
        return self::$valueToName[$value];
    }


    public static function value($name)
    {
        $const = __CLASS__ . '::' . strtoupper($name);
        if (!defined($const)) {
            throw new UnexpectedValueException(sprintf(
                    'Enum %s has no value defined for name %s', __CLASS__, $name));
        }
        return constant($const);
    }
}

