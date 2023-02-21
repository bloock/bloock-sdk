<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\DecryptRequest;
use Bloock\EncryptionAlgRequest;
use Bloock\EncryptRequest;
use Bloock\Entity\Decrypter;
use Bloock\Entity\EciesKeyPair;
use Bloock\Entity\Encrypter;
use Bloock\Entity\EncryptionAlg;
use Bloock\Entity\Record;
use Bloock\Entity\RsaKeyPair;
use Bloock\GenerateEciesKeyPairRequest;
use Bloock\GenerateRsaKeyPairRequest;

class EncryptionClient
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

    public function generateRsaKeyPair(): RsaKeyPair {
        $req = new GenerateRsaKeyPairRequest();
        $req->setConfigData($this->config);

        $res = $this->bridge->encryption->GenerateRsaKeyPair($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return RsaKeyPair::fromProto($res);
    }

    public function generateEciesKeyPair(): EciesKeyPair {
        $req = new GenerateEciesKeyPairRequest();
        $req->setConfigData($this->config);

        $res = $this->bridge->encryption->GenerateEciesKeyPair($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return EciesKeyPair::fromProto($res);
    }

    public function encrypt(Record $record, Encrypter $encrypter): Record {
        $req = new EncryptRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto())->setEncrypter($encrypter->toProto());

        $res = $this->bridge->encryption->Encrypt($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Record::fromProto($res->getRecord(), $this->config);
    }

    public function decrypt(Record $record, Decrypter $decrypter): Record {
        $req = new DecryptRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto())->setDecrypter($decrypter->toProto());

        $res = $this->bridge->encryption->Decrypt($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Record::fromProto($res->getRecord(), $this->config);
    }

    public function getEncryptionAlg(Record $record): string {
        $req = new EncryptionAlgRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto());

        $res = $this->bridge->encryption->GetEncryptionAlg($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return EncryptionAlg::fromProto($res->getAlg());
    }
}