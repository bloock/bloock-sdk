<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: encryption.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.DecryptResponse</code>
 */
class DecryptResponse extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.Record record = 1;</code>
     */
    protected $record = null;
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
     *     @type \Bloock\Record $record
     *     @type \Bloock\Error $error
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Encryption::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.bloock.Record record = 1;</code>
     * @return \Bloock\Record|null
     */
    public function getRecord()
    {
        return $this->record;
    }

    public function hasRecord()
    {
        return isset($this->record);
    }

    public function clearRecord()
    {
        unset($this->record);
    }

    /**
     * Generated from protobuf field <code>.bloock.Record record = 1;</code>
     * @param \Bloock\Record $var
     * @return $this
     */
    public function setRecord($var)
    {
        GPBUtil::checkMessage($var, \Bloock\Record::class);
        $this->record = $var;

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
