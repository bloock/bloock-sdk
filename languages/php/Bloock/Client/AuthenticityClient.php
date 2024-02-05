<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\Authenticity\Signature;
use Bloock\Entity\Authenticity\Signer;
use Bloock\Entity\Key\EcdsaKeyPair;
use Bloock\Entity\Record\Record;
use Bloock\GenerateLocalKeyRequest;
use Bloock\GetSignaturesRequest;
use Bloock\KeyType;
use Bloock\SignatureCommonNameRequest;
use Bloock\SignRequest;
use Bloock\VerifyRequest;
use Exception;

/**
 * Represents a client for interacting with the [Bloock Authenticity service](https://dashboard.bloock.com/login).
 */
class AuthenticityClient
{
    private $bridge;
    private $config;

    /**
     * Creates a new instance of the AuthenticityClient with default configuration.
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
     * Generates ECDSA key pair for signing records.
     * @deprecated Will be deleted in future versions. Use KeyClient.newLocalKey function instead.
     */
    public function generateEcdsaKeyPair(): EcdsaKeyPair
    {
        $req = new GenerateLocalKeyRequest();
        $req->setConfigData($this->config);
        $req->setKeyType(KeyType::EcP256k);

        $res = $this->bridge->key->GenerateLocalKey($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return EcdsaKeyPair::fromProto($res);
    }

    /**
     * Signs a Bloock record using the specified signer.
     * @param Record $record
     * @param Signer $signer
     * @return Signature
     * @throws Exception
     */
    public function sign(Record $record, Signer $signer): Signature
    {
        $req = new SignRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto())->setSigner($signer->toProto());

        $res = $this->bridge->authenticity->Sign($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Signature::fromProto($res->getSignature());
    }

    /**
     * Verifies the authenticity of a Bloock record.
     * @param Record $record
     * @return bool
     * @throws Exception
     */
    public function verify(Record $record): bool
    {
        $req = new VerifyRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto());

        $res = $this->bridge->authenticity->Verify($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getValid();
    }

    /**
     * Gets the signatures associated with a Bloock record.
     * @param Record $record
     * @return array
     * @throws Exception
     */
    public function getSignatures(Record $record): array
    {
        $req = new GetSignaturesRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto());

        $res = $this->bridge->authenticity->GetSignatures($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        $signatures = [];
        foreach ($res->getSignatures() as $signature) {
            $signatures[] = Signature::fromProto($signature);
        }
        return $signatures;
    }
}