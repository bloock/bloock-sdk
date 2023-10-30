<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: authenticity_entities.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.Signature</code>
 */
class Signature extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>string signature = 1;</code>
     */
    protected $signature = '';
    /**
     * Generated from protobuf field <code>string alg = 2;</code>
     */
    protected $alg = '';
    /**
     * Generated from protobuf field <code>string kid = 3;</code>
     */
    protected $kid = '';
    /**
     * Generated from protobuf field <code>string message_hash = 4;</code>
     */
    protected $message_hash = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $signature
     *     @type string $alg
     *     @type string $kid
     *     @type string $message_hash
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\AuthenticityEntities::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>string signature = 1;</code>
     * @return string
     */
    public function getSignature()
    {
        return $this->signature;
    }

    /**
     * Generated from protobuf field <code>string signature = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setSignature($var)
    {
        GPBUtil::checkString($var, True);
        $this->signature = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string alg = 2;</code>
     * @return string
     */
    public function getAlg()
    {
        return $this->alg;
    }

    /**
     * Generated from protobuf field <code>string alg = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setAlg($var)
    {
        GPBUtil::checkString($var, True);
        $this->alg = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string kid = 3;</code>
     * @return string
     */
    public function getKid()
    {
        return $this->kid;
    }

    /**
     * Generated from protobuf field <code>string kid = 3;</code>
     * @param string $var
     * @return $this
     */
    public function setKid($var)
    {
        GPBUtil::checkString($var, True);
        $this->kid = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string message_hash = 4;</code>
     * @return string
     */
    public function getMessageHash()
    {
        return $this->message_hash;
    }

    /**
     * Generated from protobuf field <code>string message_hash = 4;</code>
     * @param string $var
     * @return $this
     */
    public function setMessageHash($var)
    {
        GPBUtil::checkString($var, True);
        $this->message_hash = $var;

        return $this;
    }

}

