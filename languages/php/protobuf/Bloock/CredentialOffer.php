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
     * Generated from protobuf field <code>string json = 1;</code>
     */
    protected $json = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $json
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\IdentityEntities::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>string json = 1;</code>
     * @return string
     */
    public function getJson()
    {
        return $this->json;
    }

    /**
     * Generated from protobuf field <code>string json = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setJson($var)
    {
        GPBUtil::checkString($var, True);
        $this->json = $var;

        return $this;
    }

}

