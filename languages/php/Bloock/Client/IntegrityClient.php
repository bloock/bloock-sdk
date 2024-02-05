<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\Integrity\Anchor;
use Bloock\Entity\Integrity\Network;
use Bloock\Entity\Integrity\Proof;
use Bloock\Entity\Integrity\RecordReceipt;
use Bloock\GetAnchorRequest;
use Bloock\GetProofRequest;
use Bloock\SendRecordsRequest;
use Bloock\ValidateRootRequest;
use Bloock\VerifyProofRequest;
use Bloock\VerifyRecordsRequest;
use Bloock\WaitAnchorRequest;
use Exception;

/**
 * Provides functionality to interact with the [Bloock Integrity service](https://dashboard.bloock.com/login).
 */
class IntegrityClient
{
    private $bridge;
    private $config;

    /**
     * Creates a new IntegrityClient with the given configuration.
     * @param ConfigData|null $config
     */
    public function __construct(ConfigData $config = null)
    {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }
    }

    /**
     * Sends records to the Bloock Integrity service for certification.
     * @param array $records
     * @return array
     * @throws Exception
     */
    public function sendRecords(array $records): array
    {
        $req = new SendRecordsRequest();
        $r = [];
        foreach ($records as $record) {
            $r[] = $record->toProto();
        }
        $req->setConfigData($this->config)->setRecords($r);

        $res = $this->bridge->integrity->SendRecords($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }
        $receipts = [];
        foreach ($res->getRecords() as $item) {
            $receipts[] = RecordReceipt::fromProto($item);
        }
        return $receipts;
    }

    /**
     * Gets an anchor by its ID from the Bloock Integrity service.
     * @param int $id
     * @param int $timeout
     * @return Anchor
     * @throws Exception
     */
    public function waitAnchor(int $id, int $timeout = 120000): Anchor
    {
        $req = new WaitAnchorRequest();
        $req->setConfigData($this->config)->setAnchorId($id)->setTimeout($timeout);

        $res = $this->bridge->integrity->WaitAnchor($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Anchor::fromProto($res->getAnchor());
    }

    /**
     * Waits for the completion of an anchor on the Bloock Integrity service.
     * @param int $id
     * @return Anchor
     * @throws Exception
     */
    public function getAnchor(int $id): Anchor
    {
        $req = new GetAnchorRequest();
        $req->setConfigData($this->config)->setAnchorId($id);

        $res = $this->bridge->integrity->GetAnchor($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Anchor::fromProto($res);
    }

    /**
     * Gets a proof for a set of records from the Bloock Integrity service.
     * @param array $records
     * @return Proof
     * @throws Exception
     */
    public function getProof(array $records): Proof
    {
        $req = new GetProofRequest();
        $r = [];
        foreach ($records as $record) {
            $r[] = $record->toProto();
        }
        $req->setConfigData($this->config)->setRecords($r);

        $res = $this->bridge->integrity->GetProof($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Proof::fromProto($res->getProof());
    }

    /**
     * Verifies the integrity of a proof.
     * @param Proof $proof
     * @return string
     * @throws Exception
     */
    public function verifyProof(Proof $proof): string
    {
        $req = new VerifyProofRequest();
        $req->setConfigData($this->config)->setProof($proof->toProto());

        $res = $this->bridge->integrity->VerifyProof($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getRecord();
    }

    /**
     * Verifies the integrity of a set of records.
     * @param array $records
     * @param string|null $network
     * @return int
     * @throws Exception
     */
    public function verifyRecords(array $records, string $network = null): int
    {
        $req = new VerifyRecordsRequest();
        $r = [];
        foreach ($records as $record) {
            $r[] = $record->toProto();
        }
        $req->setConfigData($this->config)->setRecords($r);

        if ($network != null) {
            $req->setNetwork(Network::toProto($network));
        }

        $res = $this->bridge->integrity->VerifyRecords($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getTimestamp();
    }

    /**
     * Validates the integrity of a merkle root proof on blockchain.
     * @param string $root
     * @param string $network
     * @return int
     * @throws Exception
     */
    public function validateRoot(string $root, string $network): int
    {
        $req = new ValidateRootRequest();
        $req->setConfigData($this->config)->setRoot($root)->setNetwork(Network::toProto($network));

        $res = $this->bridge->integrity->ValidateRoot($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getTimestamp();
    }
}