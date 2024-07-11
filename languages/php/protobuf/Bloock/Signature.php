<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_authenticity_entities.proto

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
     * Generated from protobuf field <code>optional string subject = 5;</code>
     */
    protected $subject = null;
    /**
     * Generated from protobuf field <code>optional string hash_alg = 6;</code>
     */
    protected $hash_alg = null;

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
     *     @type string $subject
     *     @type string $hash_alg
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\BloockAuthenticityEntities::initOnce();
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

    /**
     * Generated from protobuf field <code>optional string subject = 5;</code>
     * @return string
     */
    public function getSubject()
    {
        return isset($this->subject) ? $this->subject : '';
    }

    public function hasSubject()
    {
        return isset($this->subject);
    }

    public function clearSubject()
    {
        unset($this->subject);
    }

    /**
     * Generated from protobuf field <code>optional string subject = 5;</code>
     * @param string $var
     * @return $this
     */
    public function setSubject($var)
    {
        GPBUtil::checkString($var, True);
        $this->subject = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>optional string hash_alg = 6;</code>
     * @return string
     */
    public function getHashAlg()
    {
        return isset($this->hash_alg) ? $this->hash_alg : '';
    }

    public function hasHashAlg()
    {
        return isset($this->hash_alg);
    }

    public function clearHashAlg()
    {
        unset($this->hash_alg);
    }

    /**
     * Generated from protobuf field <code>optional string hash_alg = 6;</code>
     * @param string $var
     * @return $this
     */
    public function setHashAlg($var)
    {
        GPBUtil::checkString($var, True);
        $this->hash_alg = $var;

        return $this;
    }

}

