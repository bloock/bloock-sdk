<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\EcdsaKeyPair;
use Bloock\Entity\Record;
use Bloock\Entity\Signature;
use Bloock\Entity\Signer;
use Bloock\GenerateEcdsaKeysRequest;
use Bloock\GetSignaturesRequest;
use Bloock\SignatureCommonNameRequest;
use Bloock\SignRequest;
use Bloock\VerifyRequest;

class AuthenticityClient
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

    public function generateEcdsaKeyPair(): EcdsaKeyPair {
        $req = new GenerateEcdsaKeysRequest();
        $req->setConfigData($this->config);

        $res = $this->bridge->authenticity->GenerateEcdsaKeys($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return EcdsaKeyPair::fromProto($res);
    }

    public function sign(Record $record, Signer $signer): Signature {
        $req = new SignRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto())->setSigner($signer->toProto());

        $res = $this->bridge->authenticity->Sign($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Signature::fromProto($res->getSignature());
    }

    public function verify(Record $record): bool {
        $req = new VerifyRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto());

        $res = $this->bridge->authenticity->Verify($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return $res->getValid();
    }

    public function getSignatures(Record $record): array {
        $req = new GetSignaturesRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto());

        $res = $this->bridge->authenticity->GetSignatures($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        $signatures = [];
        foreach ($res->getSignatures() as $signature) {
            $signatures[] = Signature::fromProto($signature);
        }
        return $signatures;
    }

    public function getSignatureCommonName(Signature $signature): string {
        $req = new SignatureCommonNameRequest();
        $req->setConfigData($this->config);
        $req->setSignature($signature->toProto());

        $res = $this->bridge->authenticity->GetSignatureCommonName($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return $res->getCommonName();
    }
}