<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_record.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.SetProofResponse</code>
 */
class SetProofResponse extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>optional .bloock.Error error = 1;</code>
     */
    protected $error = null;
    /**
     * Generated from protobuf field <code>optional .bloock.Record record = 2;</code>
     */
    protected $record = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\Error $error
     *     @type \Bloock\Record $record
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\BloockRecord::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>optional .bloock.Error error = 1;</code>
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
     * Generated from protobuf field <code>optional .bloock.Error error = 1;</code>
     * @param \Bloock\Error $var
     * @return $this
     */
    public function setError($var)
    {
        GPBUtil::checkMessage($var, \Bloock\Error::class);
        $this->error = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>optional .bloock.Record record = 2;</code>
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
     * Generated from protobuf field <code>optional .bloock.Record record = 2;</code>
     * @param \Bloock\Record $var
     * @return $this
     */
    public function setRecord($var)
    {
        GPBUtil::checkMessage($var, \Bloock\Record::class);
        $this->record = $var;

        return $this;
    }

}

