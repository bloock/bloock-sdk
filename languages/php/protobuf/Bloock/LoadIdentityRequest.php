<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.LoadIdentityRequest</code>
 */
class LoadIdentityRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     */
    protected $config_data = null;
    /**
     * Generated from protobuf field <code>string mnemonic = 2;</code>
     */
    protected $mnemonic = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\ConfigData $config_data
     *     @type string $mnemonic
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Identity::initOnce();
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
     * Generated from protobuf field <code>string mnemonic = 2;</code>
     * @return string
     */
    public function getMnemonic()
    {
        return $this->mnemonic;
    }

    /**
     * Generated from protobuf field <code>string mnemonic = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setMnemonic($var)
    {
        GPBUtil::checkString($var, True);
        $this->mnemonic = $var;

        return $this;
    }

}

