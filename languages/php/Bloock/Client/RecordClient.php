<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\Availability\Loader;
use Bloock\Entity\Record\Record;
use Bloock\RecordTypes;

class RecordClient
{
    private $bridge;
    private $config;

    public function __construct(ConfigData $config = null) {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }
    }

    public function fromRecord(Record $record): RecordBuilder {
        return new RecordBuilder($record->toProto(), RecordTypes::RECORD, $this->config);
    }

    public function fromString(string $str): RecordBuilder {
        return new RecordBuilder($str, RecordTypes::STRING, $this->config);
    }

    public function fromHex(string $hex): RecordBuilder {
        return new RecordBuilder($hex, RecordTypes::HEX, $this->config);
    }

    public function fromJson(string $json): RecordBuilder {
        return new RecordBuilder($json, RecordTypes::JSON, $this->config);
    }

    public function fromFile(array $file): RecordBuilder {
        return new RecordBuilder($file, RecordTypes::FILE, $this->config);
    }

    public function fromBytes(array $bytes): RecordBuilder {
        return new RecordBuilder($bytes, RecordTypes::BYTES, $this->config);
    }

    public function fromLoader(Loader $loader): RecordBuilder {
        return new RecordBuilder($loader->toProto(), RecordTypes::LOADER, $this->config);
    }
}