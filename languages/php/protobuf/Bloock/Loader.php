<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: availability_entities.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.Loader</code>
 */
class Loader extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.DataAvailabilityType type = 1;</code>
     */
    protected $type = 0;
    /**
     * Generated from protobuf field <code>.bloock.LoaderArgs args = 2;</code>
     */
    protected $args = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type int $type
     *     @type \Bloock\LoaderArgs $args
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\AvailabilityEntities::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.bloock.DataAvailabilityType type = 1;</code>
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Generated from protobuf field <code>.bloock.DataAvailabilityType type = 1;</code>
     * @param int $var
     * @return $this
     */
    public function setType($var)
    {
        GPBUtil::checkEnum($var, \Bloock\DataAvailabilityType::class);
        $this->type = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.bloock.LoaderArgs args = 2;</code>
     * @return \Bloock\LoaderArgs|null
     */
    public function getArgs()
    {
        return $this->args;
    }

    public function hasArgs()
    {
        return isset($this->args);
    }

    public function clearArgs()
    {
        unset($this->args);
    }

    /**
     * Generated from protobuf field <code>.bloock.LoaderArgs args = 2;</code>
     * @param \Bloock\LoaderArgs $var
     * @return $this
     */
    public function setArgs($var)
    {
        GPBUtil::checkMessage($var, \Bloock\LoaderArgs::class);
        $this->args = $var;

        return $this;
    }

}

