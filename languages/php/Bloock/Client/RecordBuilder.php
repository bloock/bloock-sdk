<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\ConfigData;
use Bloock\Entity\Decrypter;
use Bloock\Entity\Encrypter;
use Bloock\Entity\Record;
use Bloock\Entity\Signer;
use Bloock\RecordBuilderFromBytesRequest;
use Bloock\RecordBuilderFromFileRequest;
use Bloock\RecordBuilderFromHexRequest;
use Bloock\RecordBuilderFromJSONRequest;
use Bloock\RecordBuilderFromLoaderRequest;
use Bloock\RecordBuilderFromRecordRequest;
use Bloock\RecordBuilderFromStringRequest;
use Bloock\RecordTypes;

class RecordBuilder
{
    private $payload;
    private int $type;
    private ConfigData $configData;
    private ?\Bloock\Signer $signer = null;
    private ?\Bloock\Encrypter $encrypter = null;
    private ?\Bloock\Decrypter $decrypter = null;

    public function __construct($payload, int $recordTypes, ConfigData $configData) {
        $this->payload = $payload;
        $this->type = $recordTypes;
        $this->configData = $configData;
    }

    public function withSigner(Signer $signer): RecordBuilder {
        $this->signer = $signer->toProto();
        return $this;
    }

    public function withEncrypter(Encrypter $encrypter): RecordBuilder {
        $this->encrypter = $encrypter->toProto();
        return $this;
    }

    public function withDecrypter(Decrypter $decrypter): RecordBuilder {
        $this->decrypter = $decrypter->toProto();
        return $this;
    }

    public function build(): Record {
        $bridge = new Bridge();

        $res = null;
        switch ($this->type) {
            case RecordTypes::BYTES:
                $req = new RecordBuilderFromBytesRequest();
                $req->setConfigData($this->configData)->setPayload(implode(array_map("chr", $this->payload)));

                if ($this->signer != null) {
                    $req->setSigner($this->signer);
                }

                if ($this->encrypter != null) {
                    $req->setEncrypter($this->encrypter);
                }

                if ($this->decrypter != null) {
                    $req->setDecrypter($this->decrypter);
                }

                $res = $bridge->record->BuildRecordFromBytes($req);
                break;
            case RecordTypes::FILE:
                $req = new RecordBuilderFromFileRequest();
                $req->setConfigData($this->configData)->setPayload(implode(array_map("chr", $this->payload)));

                if ($this->signer != null) {
                    $req->setSigner($this->signer);
                }

                if ($this->encrypter != null) {
                    $req->setEncrypter($this->encrypter);
                }

                if ($this->decrypter != null) {
                    $req->setDecrypter($this->decrypter);
                }

                $res = $bridge->record->BuildRecordFromFile($req);
                break;
            case RecordTypes::HEX:
                $req = new RecordBuilderFromHexRequest();
                $req->setConfigData($this->configData)->setPayload($this->payload);

                if ($this->signer != null) {
                    $req->setSigner($this->signer);
                }

                if ($this->encrypter != null) {
                    $req->setEncrypter($this->encrypter);
                }

                if ($this->decrypter != null) {
                    $req->setDecrypter($this->decrypter);
                }

                $res = $bridge->record->BuildRecordFromHex($req);
                break;
            case RecordTypes::JSON:
                $req = new RecordBuilderFromJSONRequest();
                $req->setConfigData($this->configData)->setPayload($this->payload);

                if ($this->signer != null) {
                    $req->setSigner($this->signer);
                }

                if ($this->encrypter != null) {
                    $req->setEncrypter($this->encrypter);
                }

                if ($this->decrypter != null) {
                    $req->setDecrypter($this->decrypter);
                }

                $res = $bridge->record->BuildRecordFromJson($req);
                break;
            case RecordTypes::RECORD:
                $req = new RecordBuilderFromRecordRequest();
                $req->setConfigData($this->configData)->setPayload($this->payload);

                if ($this->signer != null) {
                    $req->setSigner($this->signer);
                }

                if ($this->encrypter != null) {
                    $req->setEncrypter($this->encrypter);
                }

                if ($this->decrypter != null) {
                    $req->setDecrypter($this->decrypter);
                }

                $res = $bridge->record->BuildRecordFromRecord($req);
                break;
            case RecordTypes::STRING:
                $req = new RecordBuilderFromStringRequest();
                $req->setConfigData($this->configData)->setPayload($this->payload);

                if ($this->signer != null) {
                    $req->setSigner($this->signer);
                }

                if ($this->encrypter != null) {
                    $req->setEncrypter($this->encrypter);
                }

                if ($this->decrypter != null) {
                    $req->setDecrypter($this->decrypter);
                }

                $res = $bridge->record->BuildRecordFromString($req);
                break;
            case RecordTypes::LOADER:
                $req = new RecordBuilderFromLoaderRequest();
                $req->setLoader($this->payload)->setConfigData($this->configData);

                if ($this->signer != null) {
                    $req->setSigner($this->signer);
                }

                if ($this->encrypter != null) {
                    $req->setEncrypter($this->encrypter);
                }

                if ($this->decrypter != null) {
                    $req->setDecrypter($this->decrypter);
                }

                $res = $bridge->record->BuildRecordFromLoader($req);
                break;
            default:
                throw new \Exception("Invalid type");
        }

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Record::fromProto($res->getRecord(), $this->configData);
    }
}