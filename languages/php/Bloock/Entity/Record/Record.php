<?php

namespace Bloock\Entity\Record;

use Bloock\Bridge\Bridge;
use Bloock\ConfigData;
use Bloock\Entity\Integrity\Proof;
use Bloock\GetHashRequest;
use Bloock\GetPayloadRequest;
use Bloock\SetProofRequest;
use Exception;

/**
 * Represents a record with payload, hash, and configuration data.
 */
class Record
{
    private string $payload;
    private string $hash;
    private ConfigData $configData;

    /**
     * Constructs a Record object with the specified parameters.
     * @param string $payload
     * @param string $hash
     * @param ConfigData $configData
     */
    public function __construct(string $payload, string $hash, ConfigData $configData)
    {
        $this->payload = $payload;
        $this->hash = $hash;
        $this->configData = $configData;
    }

    public static function fromProto(\Bloock\Record $record, ConfigData $configData): Record
    {
        return new Record($record->getPayload(), $record->getHash(), $configData);
    }

    /**
     * Retrieves the hash of the record.
     * @return string
     * @throws Exception
     */
    public function getHash(): string
    {
        $bridge = new Bridge();
        $req = new GetHashRequest();
        $req->setConfigData($this->configData)->setRecord($this->toProto());
        $res = $bridge->record->GetHash($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getHash();
    }

    /**
     * Retrieves the payload of the record.
     * @return array
     * @throws Exception
     */
    public function getPayload(): array
    {
        $bridge = new Bridge();
        $req = new GetPayloadRequest();
        $req->setConfigData($this->configData)->setRecord($this->toProto());
        $res = $bridge->record->GetPayload($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getPayload();
    }

    public function toProto(): \Bloock\Record
    {
        $p = new \Bloock\Record();
        $p->setConfigData($this->configData);
        $p->setPayload($this->payload);
        $p->setHash($this->hash);
        return $p;
    }

    /**
     * Returns the payload of the record.
     * @return array
     */
    public function retrieve(): array
    {
        return unpack("C*", $this->payload);
    }

    /**
     * Sets the proof for a record.
     * @param Proof $proof
     * @return void
     * @throws Exception
     */
    public function setProof(Proof $proof)
    {
        $bridge = new Bridge();
        $req = new SetProofRequest();
        $req->setConfigData($this->configData)->setRecord($this->toProto())->setProof($proof->toProto());
        $res = $bridge->record->SetProof($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        $this->payload = $res->getRecord()->getPayload();
    }
}
