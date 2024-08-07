<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_record_entities.proto

namespace Bloock;

use UnexpectedValueException;

/**
 * Protobuf type <code>bloock.RecordTypes</code>
 */
class RecordTypes
{
    /**
     * Generated from protobuf enum <code>STRING = 0;</code>
     */
    const STRING = 0;
    /**
     * Generated from protobuf enum <code>HEX = 1;</code>
     */
    const HEX = 1;
    /**
     * Generated from protobuf enum <code>JSON = 2;</code>
     */
    const JSON = 2;
    /**
     * Generated from protobuf enum <code>BYTES = 3;</code>
     */
    const BYTES = 3;
    /**
     * Generated from protobuf enum <code>FILE = 4;</code>
     */
    const FILE = 4;
    /**
     * Generated from protobuf enum <code>RECORD = 5;</code>
     */
    const RECORD = 5;
    /**
     * Generated from protobuf enum <code>LOADER = 6;</code>
     */
    const LOADER = 6;

    private static $valueToName = [
        self::STRING => 'STRING',
        self::HEX => 'HEX',
        self::JSON => 'JSON',
        self::BYTES => 'BYTES',
        self::FILE => 'FILE',
        self::RECORD => 'RECORD',
        self::LOADER => 'LOADER',
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

