<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_record_entities.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.RecordHeader</code>
 */
class RecordHeader extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>string ty = 1;</code>
     */
    protected $ty = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type string $ty
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\BloockRecordEntities::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>string ty = 1;</code>
     * @return string
     */
    public function getTy()
    {
        return $this->ty;
    }

    /**
     * Generated from protobuf field <code>string ty = 1;</code>
     * @param string $var
     * @return $this
     */
    public function setTy($var)
    {
        GPBUtil::checkString($var, True);
        $this->ty = $var;

        return $this;
    }

}

