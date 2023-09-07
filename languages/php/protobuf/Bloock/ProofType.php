<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity_entities_v2.proto

namespace Bloock;

use UnexpectedValueException;

/**
 * Protobuf type <code>bloock.ProofType</code>
 */
class ProofType
{
    /**
     * Generated from protobuf enum <code>IntegrityProofType = 0;</code>
     */
    const IntegrityProofType = 0;
    /**
     * Generated from protobuf enum <code>SparseMtProofType = 1;</code>
     */
    const SparseMtProofType = 1;

    private static $valueToName = [
        self::IntegrityProofType => 'IntegrityProofType',
        self::SparseMtProofType => 'SparseMtProofType',
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

