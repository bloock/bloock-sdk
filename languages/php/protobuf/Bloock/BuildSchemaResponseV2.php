<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity_v2.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.BuildSchemaResponseV2</code>
 */
class BuildSchemaResponseV2 extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.SchemaV2 schema = 1;</code>
     */
    protected $schema = null;
    /**
     * Generated from protobuf field <code>optional .bloock.Error error = 2;</code>
     */
    protected $error = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\SchemaV2 $schema
     *     @type \Bloock\Error $error
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\IdentityV2::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.bloock.SchemaV2 schema = 1;</code>
     * @return \Bloock\SchemaV2|null
     */
    public function getSchema()
    {
        return $this->schema;
    }

    public function hasSchema()
    {
        return isset($this->schema);
    }

    public function clearSchema()
    {
        unset($this->schema);
    }

    /**
     * Generated from protobuf field <code>.bloock.SchemaV2 schema = 1;</code>
     * @param \Bloock\SchemaV2 $var
     * @return $this
     */
    public function setSchema($var)
    {
        GPBUtil::checkMessage($var, \Bloock\SchemaV2::class);
        $this->schema = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>optional .bloock.Error error = 2;</code>
     * @return \Bloock\Error|null
     */
    public function getError()
    {
        return $this->error;
    }

    public function hasError()
    {
        return isset($this->error);
    }

    public function clearError()
    {
        unset($this->error);
    }

    /**
     * Generated from protobuf field <code>optional .bloock.Error error = 2;</code>
     * @param \Bloock\Error $var
     * @return $this
     */
    public function setError($var)
    {
        GPBUtil::checkMessage($var, \Bloock\Error::class);
        $this->error = $var;

        return $this;
    }

}

