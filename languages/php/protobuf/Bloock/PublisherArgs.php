<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_availability_entities.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.PublisherArgs</code>
 */
class PublisherArgs extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>optional .bloock.IpnsKey ipns_key = 1;</code>
     */
    protected $ipns_key = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\IpnsKey $ipns_key
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\BloockAvailabilityEntities::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>optional .bloock.IpnsKey ipns_key = 1;</code>
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
     * Generated from protobuf field <code>optional .bloock.IpnsKey ipns_key = 1;</code>
     * @param \Bloock\IpnsKey $var
     * @return $this
     */
    public function setIpnsKey($var)
    {
        GPBUtil::checkMessage($var, \Bloock\IpnsKey::class);
        $this->ipns_key = $var;

        return $this;
    }

}

