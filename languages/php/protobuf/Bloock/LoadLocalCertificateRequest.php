<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: keys.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.LoadLocalCertificateRequest</code>
 */
class LoadLocalCertificateRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     */
    protected $config_data = null;
    /**
     * Generated from protobuf field <code>bytes pkcs12 = 2;</code>
     */
    protected $pkcs12 = '';
    /**
     * Generated from protobuf field <code>string password = 3;</code>
     */
    protected $password = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\ConfigData $config_data
     *     @type string $pkcs12
     *     @type string $password
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
     * Generated from protobuf field <code>bytes pkcs12 = 2;</code>
     * @return string
     */
    public function getPkcs12()
    {
        return $this->pkcs12;
    }

    /**
     * Generated from protobuf field <code>bytes pkcs12 = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setPkcs12($var)
    {
        GPBUtil::checkString($var, False);
        $this->pkcs12 = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string password = 3;</code>
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Generated from protobuf field <code>string password = 3;</code>
     * @param string $var
     * @return $this
     */
    public function setPassword($var)
    {
        GPBUtil::checkString($var, True);
        $this->password = $var;

        return $this;
    }

}

