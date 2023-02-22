<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: webhook.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.VerifyWebhookSignatureRequest</code>
 */
class VerifyWebhookSignatureRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     */
    protected $config_data = null;
    /**
     * Generated from protobuf field <code>bytes payload = 2;</code>
     */
    protected $payload = '';
    /**
     * Generated from protobuf field <code>string header = 3;</code>
     */
    protected $header = '';
    /**
     * Generated from protobuf field <code>string secretKey = 4;</code>
     */
    protected $secretKey = '';
    /**
     * Generated from protobuf field <code>bool enforceTolerance = 5;</code>
     */
    protected $enforceTolerance = false;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\ConfigData $config_data
     *     @type string $payload
     *     @type string $header
     *     @type string $secretKey
     *     @type bool $enforceTolerance
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Webhook::initOnce();
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
     * Generated from protobuf field <code>bytes payload = 2;</code>
     * @return string
     */
    public function getPayload()
    {
        return $this->payload;
    }

    /**
     * Generated from protobuf field <code>bytes payload = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setPayload($var)
    {
        GPBUtil::checkString($var, False);
        $this->payload = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string header = 3;</code>
     * @return string
     */
    public function getHeader()
    {
        return $this->header;
    }

    /**
     * Generated from protobuf field <code>string header = 3;</code>
     * @param string $var
     * @return $this
     */
    public function setHeader($var)
    {
        GPBUtil::checkString($var, True);
        $this->header = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string secretKey = 4;</code>
     * @return string
     */
    public function getSecretKey()
    {
        return $this->secretKey;
    }

    /**
     * Generated from protobuf field <code>string secretKey = 4;</code>
     * @param string $var
     * @return $this
     */
    public function setSecretKey($var)
    {
        GPBUtil::checkString($var, True);
        $this->secretKey = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>bool enforceTolerance = 5;</code>
     * @return bool
     */
    public function getEnforceTolerance()
    {
        return $this->enforceTolerance;
    }

    /**
     * Generated from protobuf field <code>bool enforceTolerance = 5;</code>
     * @param bool $var
     * @return $this
     */
    public function setEnforceTolerance($var)
    {
        GPBUtil::checkBool($var);
        $this->enforceTolerance = $var;

        return $this;
    }

}
