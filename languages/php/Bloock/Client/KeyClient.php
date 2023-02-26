<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\Integrity\Anchor;
use Bloock\Entity\Integrity\Network;
use Bloock\Entity\Integrity\Proof;
use Bloock\Entity\Integrity\RecordReceipt;
use Bloock\Entity\Key\KeyType;
use Bloock\Entity\Key\LocalKey;
use Bloock\Entity\Key\ManagedKey;
use Bloock\Entity\Key\ManagedKeyParams;
use Bloock\GenerateLocalKeyRequest;
use Bloock\GenerateManagedKeyRequest;
use Bloock\GetAnchorRequest;
use Bloock\GetProofRequest;
use Bloock\SendRecordsRequest;
use Bloock\ValidateRootRequest;
use Bloock\VerifyProofRequest;
use Bloock\VerifyRecordsRequest;
use Bloock\WaitAnchorRequest;

class KeyClient
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

    public function newLocalKey(string $keyType): LocalKey {
        $req = new GenerateLocalKeyRequest();
        $req->setConfigData($this->config)->setKeyType(KeyType::toProto($keyType));

        $res = $this->bridge->key->GenerateLocalKey($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return LocalKey::fromProto($res->getLocalKey());
    }

    public function newManagedKey(ManagedKeyParams $params): ManagedKey {
        $req = new GenerateManagedKeyRequest();
        $req->setConfigData($this->config)->setParams($params->toProto());

        $res = $this->bridge->key->GenerateManagedKey($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return ManagedKey::fromProto($res->getManagedKey());
    }
}