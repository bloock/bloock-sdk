<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\CreateIdentityRequest;
use Bloock\CredentialOfferRedeemRequest;
use Bloock\Entity\Identity\Credential;
use Bloock\Entity\Identity\CredentialOffer;
use Bloock\Entity\Identity\CredentialOfferBuilder;
use Bloock\Entity\Identity\CredentialVerification;
use Bloock\Entity\Identity\Identity;
use Bloock\Entity\Identity\Schema;
use Bloock\Entity\Identity\SchemaBuilder;
use Bloock\GetSchemaRequest;
use Bloock\LoadIdentityRequest;
use Bloock\RevokeCredentialRequest;
use Bloock\VerifyCredentialRequest;
use Exception;

class IdentityClient
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

    public function createIdentity(): Identity
    {
        $req = new CreateIdentityRequest();
        $req->setConfigData($this->config);

        $res = $this->bridge->identity->CreateIdentity($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Identity::fromProto($res->getIdentity());
    }

    public function loadIdentity(string $mnemonic): Identity
    {
        $req = new LoadIdentityRequest();
        $req->setConfigData($this->config)->setMnemonic($mnemonic);

        $res = $this->bridge->identity->LoadIdentity($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Identity::fromProto($res->getIdentity());
    }

    public function buildSchema(string $displayName, string $technicalName): SchemaBuilder
    {
        return new SchemaBuilder($displayName, $technicalName, $this->config);
    }

    public function getSchema(string $id): Schema
    {
        $req = new GetSchemaRequest();
        $req->setConfigData($this->config)->setId($id);

        $res = $this->bridge->identity->GetSchema($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Schema::fromProto($res->getSchema());
    }

    public function buildOffer(string $schemaId, string $holderKey): CredentialOfferBuilder
    {
        return new CredentialOfferBuilder($schemaId, $holderKey, $this->config);
    }

    public function redeemOffer(CredentialOffer $offer, string $holderPrivateKey): Credential
    {
        $req = new CredentialOfferRedeemRequest();
        $req->setConfigData($this->config)->setCredentialOffer($offer->toProto())->setIdentityPrivateKey($holderPrivateKey);

        $res = $this->bridge->identity->CredentialOfferRedeem($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Credential::fromProto($res->getCredential());
    }

    public function verifyCredential(Credential $credential): CredentialVerification
    {
        $req = new VerifyCredentialRequest();
        $req->setConfigData($this->config)->setCredential($credential->toProto());

        $res = $this->bridge->identity->VerifyCredential($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return CredentialVerification::fromProto($res->getResult());
    }

    public function revokeCredential(Credential $credential): int
    {
        $req = new RevokeCredentialRequest();
        $req->setConfigData($this->config)->setCredential($credential->toProto());

        $res = $this->bridge->identity->RevokeCredential($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getResult()->getTimestamp();
    }
}