<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity_entities.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.CredentialOffer</code>
 */
class CredentialOffer extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>string thid = 1;</code>
     */
    protected $thid = '';
    /**
     * Generated from protobuf field <code>.bloock.CredentialOfferBody body = 2;</code>
     */
    protected $body = null;
    /**
     * Generated from protobuf field <code>string from = 3;</code>
     */
    protected $from = '';
    /**
     * Generated from protobuf field <code>string to = 4;</code>
     */
    protected $to = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $thid
     *     @type \Bloock\CredentialOfferBody $body
     *     @type string $from
     *     @type string $to
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\IdentityEntities::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>string thid = 1;</code>
     * @return string
     */
    public function getThid()
    {
        return $this->thid;
    }

    /**
     * Generated from protobuf field <code>string thid = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setThid($var)
    {
        GPBUtil::checkString($var, True);
        $this->thid = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.bloock.CredentialOfferBody body = 2;</code>
     * @return \Bloock\CredentialOfferBody|null
     */
    public function getBody()
    {
        return $this->body;
    }

    public function hasBody()
    {
        return isset($this->body);
    }

    public function clearBody()
    {
        unset($this->body);
    }

    /**
     * Generated from protobuf field <code>.bloock.CredentialOfferBody body = 2;</code>
     * @param \Bloock\CredentialOfferBody $var
     * @return $this
     */
    public function setBody($var)
    {
        GPBUtil::checkMessage($var, \Bloock\CredentialOfferBody::class);
        $this->body = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string from = 3;</code>
     * @return string
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * Generated from protobuf field <code>string from = 3;</code>
     * @param string $var
     * @return $this
     */
    public function setFrom($var)
    {
        GPBUtil::checkString($var, True);
        $this->from = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string to = 4;</code>
     * @return string
     */
    public function getTo()
    {
        return $this->to;
    }

    /**
     * Generated from protobuf field <code>string to = 4;</code>
     * @param string $var
     * @return $this
     */
    public function setTo($var)
    {
        GPBUtil::checkString($var, True);
        $this->to = $var;

        return $this;
    }

}

