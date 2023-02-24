<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity.proto

namespace Bloock;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>bloock.BuildSchemaRequest</code>
 */
class BuildSchemaRequest extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     */
    protected $config_data = null;
    /**
     * Generated from protobuf field <code>string display_name = 2;</code>
     */
    protected $display_name = '';
    /**
     * Generated from protobuf field <code>string technical_name = 3;</code>
     */
    protected $technical_name = '';
    /**
     * Generated from protobuf field <code>repeated .bloock.BooleanAttributeDefinition boolean_attributes = 4;</code>
     */
    private $boolean_attributes;
    /**
     * Generated from protobuf field <code>repeated .bloock.DateAttributeDefinition date_attributes = 5;</code>
     */
    private $date_attributes;
    /**
     * Generated from protobuf field <code>repeated .bloock.DateTimeAttributeDefinition datetime_attributes = 6;</code>
     */
    private $datetime_attributes;
    /**
     * Generated from protobuf field <code>repeated .bloock.MultiChoiceAttributeDefinition multichoice_attributes = 7;</code>
     */
    private $multichoice_attributes;
    /**
     * Generated from protobuf field <code>repeated .bloock.NumberAttributeDefinition number_attributes = 8;</code>
     */
    private $number_attributes;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \Bloock\ConfigData $config_data
     *     @type string $display_name
     *     @type string $technical_name
     *     @type array<\Bloock\BooleanAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $boolean_attributes
     *     @type array<\Bloock\DateAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $date_attributes
     *     @type array<\Bloock\DateTimeAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $datetime_attributes
     *     @type array<\Bloock\MultiChoiceAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $multichoice_attributes
     *     @type array<\Bloock\NumberAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $number_attributes
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Identity::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     * @return \Bloock\ConfigData|null
     */
    public function getConfigData()
    {
        return $this->config_data;
    }

    public function hasConfigData()
    {
        return isset($this->config_data);
    }

    public function clearConfigData()
    {
        unset($this->config_data);
    }

    /**
     * Generated from protobuf field <code>.bloock.ConfigData config_data = 1;</code>
     * @param \Bloock\ConfigData $var
     * @return $this
     */
    public function setConfigData($var)
    {
        GPBUtil::checkMessage($var, \Bloock\ConfigData::class);
        $this->config_data = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string display_name = 2;</code>
     * @return string
     */
    public function getDisplayName()
    {
        return $this->display_name;
    }

    /**
     * Generated from protobuf field <code>string display_name = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setDisplayName($var)
    {
        GPBUtil::checkString($var, True);
        $this->display_name = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string technical_name = 3;</code>
     * @return string
     */
    public function getTechnicalName()
    {
        return $this->technical_name;
    }

    /**
     * Generated from protobuf field <code>string technical_name = 3;</code>
     * @param string $var
     * @return $this
     */
    public function setTechnicalName($var)
    {
        GPBUtil::checkString($var, True);
        $this->technical_name = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.BooleanAttributeDefinition boolean_attributes = 4;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getBooleanAttributes()
    {
        return $this->boolean_attributes;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.BooleanAttributeDefinition boolean_attributes = 4;</code>
     * @param array<\Bloock\BooleanAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setBooleanAttributes($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Bloock\BooleanAttributeDefinition::class);
        $this->boolean_attributes = $arr;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.DateAttributeDefinition date_attributes = 5;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getDateAttributes()
    {
        return $this->date_attributes;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.DateAttributeDefinition date_attributes = 5;</code>
     * @param array<\Bloock\DateAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setDateAttributes($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Bloock\DateAttributeDefinition::class);
        $this->date_attributes = $arr;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.DateTimeAttributeDefinition datetime_attributes = 6;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getDatetimeAttributes()
    {
        return $this->datetime_attributes;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.DateTimeAttributeDefinition datetime_attributes = 6;</code>
     * @param array<\Bloock\DateTimeAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setDatetimeAttributes($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Bloock\DateTimeAttributeDefinition::class);
        $this->datetime_attributes = $arr;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.MultiChoiceAttributeDefinition multichoice_attributes = 7;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getMultichoiceAttributes()
    {
        return $this->multichoice_attributes;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.MultiChoiceAttributeDefinition multichoice_attributes = 7;</code>
     * @param array<\Bloock\MultiChoiceAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setMultichoiceAttributes($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Bloock\MultiChoiceAttributeDefinition::class);
        $this->multichoice_attributes = $arr;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.NumberAttributeDefinition number_attributes = 8;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getNumberAttributes()
    {
        return $this->number_attributes;
    }

    /**
     * Generated from protobuf field <code>repeated .bloock.NumberAttributeDefinition number_attributes = 8;</code>
     * @param array<\Bloock\NumberAttributeDefinition>|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setNumberAttributes($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Bloock\NumberAttributeDefinition::class);
        $this->number_attributes = $arr;

        return $this;
    }

}

