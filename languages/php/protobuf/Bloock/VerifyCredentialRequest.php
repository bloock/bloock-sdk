<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.VerifyCredentialRequest</code>
 */
class VerifyCredentialRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     */
    protected $config_data = null;
    /**
     * Generated from protobuf field <code>.bloock.Credential credential = 2;</code>
     */
    protected $credential = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\ConfigData $config_data
     *     @type \Bloock\Credential $credential
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
     * Generated from protobuf field <code>.bloock.Credential credential = 2;</code>
     * @return \Bloock\Credential|null
     */
    public function getCredential()
    {
        return $this->credential;
    }

    public function hasCredential()
    {
        return isset($this->credential);
    }

    public function clearCredential()
    {
        unset($this->credential);
    }

    /**
     * Generated from protobuf field <code>.bloock.Credential credential = 2;</code>
     * @param \Bloock\Credential $var
     * @return $this
     */
    public function setCredential($var)
    {
        GPBUtil::checkMessage($var, \Bloock\Credential::class);
        $this->credential = $var;

        return $this;
    }

}

