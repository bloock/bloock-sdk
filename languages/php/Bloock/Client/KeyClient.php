<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\Key\CertificateType;
use Bloock\Entity\Key\ImportCertificateParams;
use Bloock\Entity\Key\KeyType;
use Bloock\Entity\Key\LocalKey;
use Bloock\Entity\Key\ManagedCertificate;
use Bloock\Entity\Key\ManagedCertificateParams;
use Bloock\Entity\Key\ManagedKey;
use Bloock\Entity\Key\ManagedKeyParams;
use Bloock\Entity\Key\LocalCertificate;
use Bloock\Entity\Key\LocalCertificateArgs;
use Bloock\Entity\Key\Managed;
use Bloock\Entity\Key\TotpAccessControlReceipt;
use Bloock\GenerateLocalKeyRequest;
use Bloock\GenerateManagedKeyRequest;
use Bloock\LoadLocalKeyRequest;
use Bloock\LoadManagedKeyRequest;
use Bloock\GenerateManagedCertificateRequest;
use Bloock\GenerateLocalCertificateRequest;
use Bloock\LoadManagedCertificateRequest;
use Bloock\LoadLocalCertificateRequest;
use Bloock\ImportManagedCertificateRequest;
use Bloock\RecoverTotpAccessControlRequest;
use Bloock\SetupSecretAccessControlRequest;
use Bloock\SetupTotpAccessControlRequest;
use Exception;

class KeyClient
{
    private $bridge;
    private $config;

    public function __construct(ConfigData $config = null)
    {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }
    }

    public function newLocalKey(string $keyType): LocalKey
    {
        $req = new GenerateLocalKeyRequest();
        $req->setConfigData($this->config)->setKeyType(KeyType::toProto($keyType));

        $res = $this->bridge->key->GenerateLocalKey($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return LocalKey::fromProto($res->getLocalKey());
    }

    public function loadLocalKey(string $keyType, string $key): LocalKey
    {
        $req = new LoadLocalKeyRequest();
        $req->setConfigData($this->config)
            ->setKeyType(KeyType::toProto($keyType))
            ->setKey($key);

        $res = $this->bridge->key->LoadLocalKey($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return LocalKey::fromProto($res->getLocalKey());
    }

    public function newManagedKey(ManagedKeyParams $params): ManagedKey
    {
        $req = new GenerateManagedKeyRequest();
        $req->setConfigData($this->config)->setParams($params->toProto());

        $res = $this->bridge->key->GenerateManagedKey($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return ManagedKey::fromProto($res->getManagedKey());
    }

    public function loadManagedKey(string $id): ManagedKey
    {
        $req = new LoadManagedKeyRequest();
        $req->setConfigData($this->config)->setId($id);

        $res = $this->bridge->key->LoadManagedKey($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return ManagedKey::fromProto($res->getManagedKey());
    }

    public function newLocalCertificate(LocalCertificateArgs $params): LocalCertificate
    {
        $req = new GenerateLocalCertificateRequest();
        $req->setConfigData($this->config)->setParams($params->toProto());

        $res = $this->bridge->key->GenerateLocalCertificate($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return LocalCertificate::fromProto($res->getLocalCertificate());
    }

    public function loadLocalCertificate(array $pkcs12, string $password): LocalCertificate
    {
        $req = new LoadLocalCertificateRequest();
        $req->setConfigData($this->config)->setPkcs12(implode(array_map("chr", $pkcs12)))->setPassword($password);

        $res = $this->bridge->key->LoadLocalCertificate($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return LocalCertificate::fromProto($res->getLocalCertificate());
    }

    public function newManagedCertificate(ManagedCertificateParams $params): ManagedCertificate
    {
        $req = new GenerateManagedCertificateRequest();
        $req->setConfigData($this->config)->setParams($params->toProto());

        $res = $this->bridge->key->GenerateManagedCertificate($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return ManagedCertificate::fromProto($res->getManagedCertificate());
    }

    public function loadManagedCertificate(string $id): ManagedCertificate
    {
        $req = new LoadManagedCertificateRequest();
        $req->setConfigData($this->config)->setId($id);

        $res = $this->bridge->key->LoadManagedCertificate($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return ManagedCertificate::fromProto($res->getManagedCertificate());
    }

    public function importManagedCertificate(string $certificateType, array $certificate, ImportCertificateParams $params): ManagedCertificate
    {
        $req = new ImportManagedCertificateRequest();
        $req->setConfigData($this->config)
            ->setCertificate(implode(array_map("chr", $certificate)))
            ->setCertificateType(CertificateType::toProto($certificateType));

        if ($params->password != null) {
            $req->setPassword($params->password);
        }


        $res = $this->bridge->key->ImportManagedCertificate($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return ManagedCertificate::fromProto($res->getManagedCertificate());
    }

    public function setupTotpAccessControl(Managed $key): TotpAccessControlReceipt
    {
        $req = new SetupTotpAccessControlRequest();
        $req->setConfigData($this->config);

        if ($key->managedKey != null) {
            $req->setManagedKey($key->managedKey->toProto());
        }

        if ($key->managedCertificate != null) {
            $req->setManagedCertificate($key->managedCertificate->toProto());
        }

        $res = $this->bridge->key->SetupTotpAccessControl($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return new TotpAccessControlReceipt($res->getSecret(), $res->getSecretQr(), $res->getRecoveryCodes());
    }

    public function recoverTotpAccessControl(Managed $key, string $code): TotpAccessControlReceipt
    {
        $req = new RecoverTotpAccessControlRequest();
        $req->setConfigData($this->config);
        $req->setCode($code);

        if ($key->managedKey != null) {
            $req->setManagedKey($key->managedKey->toProto());
        }

        if ($key->managedCertificate != null) {
            $req->setManagedCertificate($key->managedCertificate->toProto());
        }

        $res = $this->bridge->key->RecoverTotpAccessControl($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return new TotpAccessControlReceipt($res->getSecret(), $res->getSecretQr(), $res->getRecoveryCodes());
    }

    public function setupSecretAccessControl(Managed $key, string $secret, string $email)
    {
        $req = new SetupSecretAccessControlRequest();
        $req->setConfigData($this->config);
        $req->setSecret($secret);
        $req->setEmail($email);

        if ($key->managedKey != null) {
            $req->setManagedKey($key->managedKey->toProto());
        }

        if ($key->managedCertificate != null) {
            $req->setManagedCertificate($key->managedCertificate->toProto());
        }

        $res = $this->bridge->key->SetupSecretAccessControl($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }
    }
}
