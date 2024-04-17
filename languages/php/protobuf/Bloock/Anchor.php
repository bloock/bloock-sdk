<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: integrity_entities.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.Anchor</code>
 */
class Anchor extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>int64 id = 1;</code>
     */
    protected $id = 0;
    /**
     * Generated from protobuf field <code>repeated string block_roots = 2;</code>
     */
    private $block_roots;
    /**
     * Generated from protobuf field <code>repeated .bloock.AnchorNetwork networks = 3;</code>
     */
    private $networks;
    /**
     * Generated from protobuf field <code>string root = 4;</code>
     */
    protected $root = '';
    /**
     * Generated from protobuf field <code>string status = 5;</code>
     */
    protected $status = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type int|string $id
     *     @type array<string>|\Google\Protobuf\Internal\RepeatedField $block_roots
     *     @type array<\Bloock\AnchorNetwork>|\Google\Protobuf\Internal\RepeatedField $networks
     *     @type string $root
     *     @type string $status
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\IntegrityEntities::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>int64 id = 1;</code>
     * @return int|string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Generated from protobuf field <code>int64 id = 1;</code>
     * @param int|string $var
     * @return $this
     */
    public function setId($var)
    {
        GPBUtil::checkInt64($var);
        $this->id = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated string block_roots = 2;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getBlockRoots()
    {
        return $this->block_roots;
    }

    /**
     * Generated from protobuf field <code>repeated string block_roots = 2;</code>
     * @param array<string>|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setBlockRoots($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::STRING);
        $this->block_roots = $arr;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.AnchorNetwork networks = 3;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getNetworks()
    {
        return $this->networks;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.AnchorNetwork networks = 3;</code>
     * @param array<\Bloock\AnchorNetwork>|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setNetworks($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Bloock\AnchorNetwork::class);
        $this->networks = $arr;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string root = 4;</code>
     * @return string
     */
    public function getRoot()
    {
        return $this->root;
    }

    /**
     * Generated from protobuf field <code>string root = 4;</code>
     * @param string $var
     * @return $this
     */
    public function setRoot($var)
    {
        GPBUtil::checkString($var, True);
        $this->root = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string status = 5;</code>
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Generated from protobuf field <code>string status = 5;</code>
     * @param string $var
     * @return $this
     */
    public function setStatus($var)
    {
        GPBUtil::checkString($var, True);
        $this->status = $var;

        return $this;
    }

}

