<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_encryption.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.EncryptionAlgResponse</code>
 */
class EncryptionAlgResponse extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.EncryptionAlg alg = 1;</code>
     */
    protected $alg = 0;
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
     *     @type int $alg
     *     @type \Bloock\Error $error
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\BloockEncryption::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.bloock.EncryptionAlg alg = 1;</code>
     * @return int
     */
    public function getAlg()
    {
        return $this->alg;
    }

    /**
     * Generated from protobuf field <code>.bloock.EncryptionAlg alg = 1;</code>
     * @param int $var
     * @return $this
     */
    public function setAlg($var)
    {
        GPBUtil::checkEnum($var, \Bloock\EncryptionAlg::class);
        $this->alg = $var;

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

