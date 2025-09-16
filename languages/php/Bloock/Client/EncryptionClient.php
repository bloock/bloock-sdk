<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\DecryptRequest;
use Bloock\EncryptionAlgRequest;
use Bloock\EncryptRequest;
use Bloock\Entity\Encryption\Encrypter;
use Bloock\Entity\Encryption\EncryptionAlg;
use Bloock\Entity\Key\RsaKeyPair;
use Bloock\Entity\Record\Record;
use Bloock\GenerateLocalKeyRequest;
use Bloock\KeyType;
use Exception;

/**
 * Represents a client for interacting with the [Bloock Encryption service](https://dashboard.bloock.com/login).
 */
class EncryptionClient
{
    private $bridge;
    private $config;

    /**
     * Creates a new instance of the EncryptionClient with the provided configuration.
     * @param ConfigData|null $config
     */
    public function __construct(?ConfigData $config = null)
    {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }
    }

    /**
     * GenerateRsaKeyPair generates an RSA key pair for encryption.
     * @deprecated Will be deleted in future versions. Use KeyClient.newLocalKey function instead.
     */
    public function generateRsaKeyPair(): RsaKeyPair
    {
        $req = new GenerateLocalKeyRequest();
        $req->setConfigData($this->config);
        $req->setKeyType(KeyType::Rsa2048);

        $res = $this->bridge->key->GenerateLocalKey($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return RsaKeyPair::fromProto($res);
    }

    /**
     * Encrypts a Bloock record using the specified encrypter.
     * @param Record $record
     * @param Encrypter $encrypter
     * @return Record
     * @throws Exception
     */
    public function encrypt(Record $record, Encrypter $encrypter): Record
    {
        $req = new EncryptRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto())->setEncrypter($encrypter->toProto());

        $res = $this->bridge->encryption->Encrypt($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Record::fromProto($res->getRecord(), $this->config);
    }

    /**
     * Decrypts a Bloock record using the specified decrypter.
     * @param Record $record
     * @param Encrypter $decrypter
     * @return Record
     * @throws Exception
     */
    public function decrypt(Record $record, Encrypter $decrypter): Record
    {
        $req = new DecryptRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto())->setDecrypter($decrypter->toProto());

        $res = $this->bridge->encryption->Decrypt($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Record::fromProto($res->getRecord(), $this->config);
    }

    /**
     * Gets the encryption algorithm used for a Bloock record.
     * @param Record $record
     * @return string
     * @throws Exception
     */
    public function getEncryptionAlg(Record $record): string
    {
        $req = new EncryptionAlgRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto());

        $res = $this->bridge->encryption->GetEncryptionAlg($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return EncryptionAlg::fromProto($res->getAlg());
    }
}
