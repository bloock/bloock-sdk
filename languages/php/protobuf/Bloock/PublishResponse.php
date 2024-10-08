<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_availability.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.PublishResponse</code>
 */
class PublishResponse extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>string id = 1;</code>
     */
    protected $id = '';
    /**
     * Generated from protobuf field <code>optional .bloock.IpnsKey ipns_key = 2;</code>
     */
    protected $ipns_key = null;
    /**
     * Generated from protobuf field <code>optional .bloock.Error error = 3;</code>
     */
    protected $error = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $id
     *     @type \Bloock\IpnsKey $ipns_key
     *     @type \Bloock\Error $error
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\BloockAvailability::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>string id = 1;</code>
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Generated from protobuf field <code>string id = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setId($var)
    {
        GPBUtil::checkString($var, True);
        $this->id = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>optional .bloock.IpnsKey ipns_key = 2;</code>
     * @return \Bloock\IpnsKey|null
     */
    public function getIpnsKey()
    {
        return $this->ipns_key;
    }

    public function hasIpnsKey()
    {
        return isset($this->ipns_key);
    }

    public function clearIpnsKey()
    {
        unset($this->ipns_key);
    }

    /**
     * Generated from protobuf field <code>optional .bloock.IpnsKey ipns_key = 2;</code>
     * @param \Bloock\IpnsKey $var
     * @return $this
     */
    public function setIpnsKey($var)
    {
        GPBUtil::checkMessage($var, \Bloock\IpnsKey::class);
        $this->ipns_key = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>optional .bloock.Error error = 3;</code>
     * @return \Bloock\Error|null
     */
    public function getError()
    {
        return $this->error;
    }

    public function hasError()
    {
        return isset($this->error);
    }

    public function clearError()
    {
        unset($this->error);
    }

    /**
     * Generated from protobuf field <code>optional .bloock.Error error = 3;</code>
     * @param \Bloock\Error $var
     * @return $this
     */
    public function setError($var)
    {
        GPBUtil::checkMessage($var, \Bloock\Error::class);
        $this->error = $var;

        return $this;
    }

}

