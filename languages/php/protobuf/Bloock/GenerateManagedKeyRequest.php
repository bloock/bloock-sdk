<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: keys.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.GenerateManagedKeyRequest</code>
 */
class GenerateManagedKeyRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     */
    protected $config_data = null;
    /**
     * Generated from protobuf field <code>.bloock.ManagedKeyParams params = 2;</code>
     */
    protected $params = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\ConfigData $config_data
     *     @type \Bloock\ManagedKeyParams $params
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Keys::initOnce();
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
     * Generated from protobuf field <code>.bloock.ManagedKeyParams params = 2;</code>
     * @return \Bloock\ManagedKeyParams|null
     */
    public function getParams()
    {
        return $this->params;
    }

    public function hasParams()
    {
        return isset($this->params);
    }

    public function clearParams()
    {
        unset($this->params);
    }

    /**
     * Generated from protobuf field <code>.bloock.ManagedKeyParams params = 2;</code>
     * @param \Bloock\ManagedKeyParams $var
     * @return $this
     */
    public function setParams($var)
    {
        GPBUtil::checkMessage($var, \Bloock\ManagedKeyParams::class);
        $this->params = $var;

        return $this;
    }

}

