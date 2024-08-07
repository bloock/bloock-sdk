<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_record.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.GetDetailsResponse</code>
 */
class GetDetailsResponse extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.RecordDetails details = 1;</code>
     */
    protected $details = null;
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
     *     @type \Bloock\RecordDetails $details
     *     @type \Bloock\Error $error
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\BloockRecord::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.bloock.RecordDetails details = 1;</code>
     * @return \Bloock\RecordDetails|null
     */
    public function getDetails()
    {
        return $this->details;
    }

    public function hasDetails()
    {
        return isset($this->details);
    }

    public function clearDetails()
    {
        unset($this->details);
    }

    /**
     * Generated from protobuf field <code>.bloock.RecordDetails details = 1;</code>
     * @param \Bloock\RecordDetails $var
     * @return $this
     */
    public function setDetails($var)
    {
        GPBUtil::checkMessage($var, \Bloock\RecordDetails::class);
        $this->details = $var;

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

