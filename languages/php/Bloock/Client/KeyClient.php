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

/**
 * Provides functionality to interact with the [Bloock Keys service](https://dashboard.bloock.com/login).
 */
class KeyClient
{
    private $bridge;
    private $config;

    /**
     * Creates a new KeyClient with the given configuration.
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
     * Generates a new local key of the specified type.
     * @param string $keyType
     * @return LocalKey
     * @throws Exception
     */
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

    /**
     * Loads a local key of the specified type from a public key string.
     * @param string $keyType
     * @param string $key
     * @return LocalKey
     * @throws Exception
     */
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

    /**
     * Generates a new managed key with the specified parameters.
     * @param ManagedKeyParams $params
     * @return ManagedKey
     * @throws Exception
     */
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

    /**
     * Loads a managed key by its ID (ex: 51d22546-68f1-4340-b94b-2a80e60b8933).
     * @param string $id
     * @return ManagedKey
     * @throws Exception
     */
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

    /**
     * Generates a new local certificate with the specified parameters.
     * @param LocalCertificateArgs $params
     * @return LocalCertificate
     * @throws Exception
     */
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

    /**
     * Loads a local certificate from a PKCS12 file.
     * @param array $pkcs12
     * @param string $password
     * @return LocalCertificate
     * @throws Exception
     */
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

    /**
     * Generates a new managed certificate with the specified parameters.
     * @param ManagedCertificateParams $params
     * @return ManagedCertificate
     * @throws Exception
     */
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

    /**
     * Loads a managed certificate by its ID (ex: ceef5b02-af17-43d8-ae7b-31d9bdf8027f).
     * @param string $id
     * @return ManagedCertificate
     * @throws Exception
     */
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

    /**
     * Imports a managed certificate with the specified parameters, supported types: .pem, .pfx.
     * @param string $certificateType
     * @param array $certificate
     * @param ImportCertificateParams $params
     * @return ManagedCertificate
     * @throws Exception
     */
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

    /**
     * Sets up TOTP-based access control for the given managed key or managed certificate.
     * @param Managed $key
     * @return TotpAccessControlReceipt
     * @throws Exception
     */
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

    /**
     * Recovers TOTP-based access control for the given managed key or managed certificate using a recovery code.
     * @param Managed $key
     * @param string $code
     * @return TotpAccessControlReceipt
     * @throws Exception
     */
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

    /**
     * Sets up secret-based access control for the given managed key or managed certificate.
     * @param Managed $key
     * @param string $secret
     * @param string $email
     * @return void
     * @throws Exception
     */
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
