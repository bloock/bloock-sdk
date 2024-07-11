<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_keys.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.GenerateLocalKeyRequest</code>
 */
class GenerateLocalKeyRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     */
    protected $config_data = null;
    /**
     * Generated from protobuf field <code>.bloock.KeyType key_type = 2;</code>
     */
    protected $key_type = 0;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\ConfigData $config_data
     *     @type int $key_type
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\BloockKeys::initOnce();
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
     * Generated from protobuf field <code>.bloock.KeyType key_type = 2;</code>
     * @return int
     */
    public function getKeyType()
    {
        return $this->key_type;
    }

    /**
     * Generated from protobuf field <code>.bloock.KeyType key_type = 2;</code>
     * @param int $var
     * @return $this
     */
    public function setKeyType($var)
    {
        GPBUtil::checkEnum($var, \Bloock\KeyType::class);
        $this->key_type = $var;

        return $this;
    }

}

