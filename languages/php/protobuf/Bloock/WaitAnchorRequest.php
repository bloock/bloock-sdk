<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: integrity.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.WaitAnchorRequest</code>
 */
class WaitAnchorRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     */
    protected $config_data = null;
    /**
     * Generated from protobuf field <code>int64 anchor_id = 2;</code>
     */
    protected $anchor_id = 0;
    /**
     * Generated from protobuf field <code>int64 timeout = 3;</code>
     */
    protected $timeout = 0;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\ConfigData $config_data
     *     @type int|string $anchor_id
     *     @type int|string $timeout
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Integrity::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     * @return \Bloock\ConfigData|null
     */
    public function getConfigData()
    {
        return $this->config_data;
    }

    public function hasConfigData()
    {
        return isset($this->config_data);
    }

    public function clearConfigData()
    {
        unset($this->config_data);
    }

    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     * @param \Bloock\ConfigData $var
     * @return $this
     */
    public function setConfigData($var)
    {
        GPBUtil::checkMessage($var, \Bloock\ConfigData::class);
        $this->config_data = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>int64 anchor_id = 2;</code>
     * @return int|string
     */
    public function getAnchorId()
    {
        return $this->anchor_id;
    }

    /**
     * Generated from protobuf field <code>int64 anchor_id = 2;</code>
     * @param int|string $var
     * @return $this
     */
    public function setAnchorId($var)
    {
        GPBUtil::checkInt64($var);
        $this->anchor_id = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>int64 timeout = 3;</code>
     * @return int|string
     */
    public function getTimeout()
    {
        return $this->timeout;
    }

    /**
     * Generated from protobuf field <code>int64 timeout = 3;</code>
     * @param int|string $var
     * @return $this
     */
    public function setTimeout($var)
    {
        GPBUtil::checkInt64($var);
        $this->timeout = $var;

        return $this;
    }

}

