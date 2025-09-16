<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\Availability\Loader;
use Bloock\Entity\Record\Record;
use Bloock\RecordTypes;

/**
 * Provides functionality for creating records using various data sources and to interact with the [Bloock Record service](https://dashboard.bloock.com/login).
 */
class RecordClient
{
    private $bridge;
    private $config;

    /**
     * Creates a new RecordClient with the provided configuration.
     * @param ConfigData|null $config
     */
    public function __construct(?ConfigData $config = null)
    {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }
    }

    /**
     * Creates a RecordBuilder from an existing record.
     * @param Record $record
     * @return RecordBuilder
     */
    public function fromRecord(Record $record): RecordBuilder
    {
        return new RecordBuilder($record->toProto(), RecordTypes::RECORD, $this->config);
    }

    /**
     * Creates a RecordBuilder from a string payload.
     * @param string $str
     * @return RecordBuilder
     */
    public function fromString(string $str): RecordBuilder
    {
        return new RecordBuilder($str, RecordTypes::STRING, $this->config);
    }

    /**
     * Creates a RecordBuilder from a hexadecimal string payload.
     * @param string $hex
     * @return RecordBuilder
     */
    public function fromHex(string $hex): RecordBuilder
    {
        return new RecordBuilder($hex, RecordTypes::HEX, $this->config);
    }

    /**
     * Creates a RecordBuilder from a JSON string payload.
     * @param string $json
     * @return RecordBuilder
     */
    public function fromJson(string $json): RecordBuilder
    {
        return new RecordBuilder($json, RecordTypes::JSON, $this->config);
    }

    /**
     * Creates a RecordBuilder from a byte slice representing a file.
     * @param array $file
     * @return RecordBuilder
     */
    public function fromFile(array $file): RecordBuilder
    {
        return new RecordBuilder($file, RecordTypes::FILE, $this->config);
    }

    /**
     * Creates a RecordBuilder from a byte slice payload.
     * @param array $bytes
     * @return RecordBuilder
     */
    public function fromBytes(array $bytes): RecordBuilder
    {
        return new RecordBuilder($bytes, RecordTypes::BYTES, $this->config);
    }

    /**
     * Creates a RecordBuilder from a data loader.
     * @param Loader $loader
     * @return RecordBuilder
     */
    public function fromLoader(Loader $loader): RecordBuilder
    {
        return new RecordBuilder($loader->toProto(), RecordTypes::LOADER, $this->config);
    }
}