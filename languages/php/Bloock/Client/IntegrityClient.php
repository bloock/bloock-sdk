<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\DecryptRequest;
use Bloock\Entity\Anchor;
use Bloock\Entity\Decrypter;
use Bloock\Entity\Network;
use Bloock\Entity\Proof;
use Bloock\Entity\Record;
use Bloock\Entity\RecordReceipt;
use Bloock\GetAnchorRequest;
use Bloock\GetProofRequest;
use Bloock\SendRecordsRequest;
use Bloock\ValidateRootRequest;
use Bloock\VerifyProofRequest;
use Bloock\VerifyRecordsRequest;
use Bloock\WaitAnchorRequest;

class IntegrityClient
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

    public function sendRecords(array $records): array {
        $req = new SendRecordsRequest();
        $r = [];
        foreach ($records as $record) {
            $r[] = $record->toProto();
        }
        $req->setConfigData($this->config)->setRecords($r);

        $res = $this->bridge->integrity->SendRecords($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }
        $receipts = [];
        foreach ($res->getRecords() as $item) {
            $receipts[] = RecordReceipt::fromProto($item);
        }
        return $receipts;
    }

    public function getAnchor(int $id): Anchor {
        $req = new GetAnchorRequest();
        $req->setConfigData($this->config)->setAnchorId($id);

        $res = $this->bridge->integrity->GetAnchor($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Anchor::fromProto($res);
    }

    public function waitAnchor(int $id, int $timeout = 120000): Anchor {
        $req = new WaitAnchorRequest();
        $req->setConfigData($this->config)->setAnchorId($id)->setTimeout($timeout);

        $res = $this->bridge->integrity->WaitAnchor($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Anchor::fromProto($res->getAnchor());
    }

    public function getProof(array $records): Proof {
        $req = new GetProofRequest();
        $r = [];
        foreach ($records as $record) {
            $r[] = $record->toProto();
        }
        $req->setConfigData($this->config)->setRecords($r);

        $res = $this->bridge->integrity->GetProof($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Proof::fromProto($res->getProof());
    }

    public function verifyProof(Proof $proof): string {
        $req = new VerifyProofRequest();
        $req->setConfigData($this->config)->setProof($proof->toProto());

        $res = $this->bridge->integrity->VerifyProof($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return $res->getRecord();
    }

    public function verifyRecords(array $records, string $network = null): int {
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
            throw new \Exception($res->getError()->getMessage());
        }

        return $res->getTimestamp();
    }

    public function validateRoot(string $root, string $network): int {
        $req = new ValidateRootRequest();
        $req->setConfigData($this->config)->setRoot($root)->setNetwork(Network::toProto($network));

        $res = $this->bridge->integrity->ValidateRoot($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return $res->getTimestamp();
    }
}