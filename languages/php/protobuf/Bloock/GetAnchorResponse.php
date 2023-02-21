<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: integrity.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.GetAnchorResponse</code>
 */
class GetAnchorResponse extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>optional .bloock.Anchor anchor = 1;</code>
     */
    protected $anchor = null;
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
     *     @type \Bloock\Anchor $anchor
     *     @type \Bloock\Error $error
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Integrity::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>optional .bloock.Anchor anchor = 1;</code>
     * @return \Bloock\Anchor|null
     */
    public function getAnchor()
    {
        return $this->anchor;
    }

    public function hasAnchor()
    {
        return isset($this->anchor);
    }

    public function clearAnchor()
    {
        unset($this->anchor);
    }

    /**
     * Generated from protobuf field <code>optional .bloock.Anchor anchor = 1;</code>
     * @param \Bloock\Anchor $var
     * @return $this
     */
    public function setAnchor($var)
    {
        GPBUtil::checkMessage($var, \Bloock\Anchor::class);
        $this->anchor = $var;

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

