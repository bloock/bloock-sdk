<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\CreateIdentityRequest;
use Bloock\CredentialOfferRedeemRequest;
use Bloock\CredentialRevocation;
use Bloock\Entity\Identity\Credential;
use Bloock\Entity\Identity\CredentialOffer;
use Bloock\Entity\Identity\CredentialOfferBuilder;
use Bloock\Entity\Identity\CredentialVerification;
use Bloock\Entity\Identity\Identity;
use Bloock\Entity\Identity\Schema;
use Bloock\Entity\Identity\SchemaBuilder;
use Bloock\Entity\Integrity\Anchor;
use Bloock\Entity\Integrity\Network;
use Bloock\Entity\Integrity\Proof;
use Bloock\Entity\Integrity\RecordReceipt;
use Bloock\GetAnchorRequest;
use Bloock\GetProofRequest;
use Bloock\GetSchemaRequest;
use Bloock\LoadIdentityRequest;
use Bloock\RevokeCredentialRequest;
use Bloock\SendRecordsRequest;
use Bloock\ValidateRootRequest;
use Bloock\VerifyCredentialRequest;
use Bloock\VerifyProofRequest;
use Bloock\VerifyRecordsRequest;
use Bloock\WaitAnchorRequest;

class IdentityClient
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

    public function createIdentity(): Identity {
        $req = new CreateIdentityRequest();
        $req->setConfigData($this->config);

        $res = $this->bridge->identity->CreateIdentity($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Identity::fromProto($res);
    }

    public function loadIdentity(string $mnemonic): Identity {
        $req = new LoadIdentityRequest();
        $req->setConfigData($this->config)->setMnemonic($mnemonic);

        $res = $this->bridge->identity->LoadIdentity($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Identity::fromProto($res);
    }

    public function buildSchema(string $displayName, string $technicalName): SchemaBuilder {
        return new SchemaBuilder($displayName, $technicalName, $this->config);
    }

    public function getSchema(string $id): Schema {
        $req = new GetSchemaRequest();
        $req->setConfigData($this->config)->setId($id);

        $res = $this->bridge->identity->GetSchema($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Schema::fromProto($res);
    }

    public function buildOffer(string $schemaId, string $holderKey): CredentialOfferBuilder {
        return new CredentialOfferBuilder($schemaId, $holderKey, $this->config);
    }

    public function redeemOffer(CredentialOffer $offer, string $holderPrivateKey): CredentialOffer {
        $req = new CredentialOfferRedeemRequest();
        $req->setConfigData($this->config)->setCredentialOffer($offer->toProto())->setIdentityPrivateKey($holderPrivateKey);

        $res = $this->bridge->identity->CredentialOfferRedeem($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return CredentialOffer::fromProto($res);
    }

    public function verifyCredential(Credential $credential): CredentialVerification {
        $req = new VerifyCredentialRequest();
        $req->setConfigData($this->config)->setCredential($credential->toProto());

        $res = $this->bridge->identity->VerifyCredential($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return CredentialVerification::fromProto($res);
    }

    public function revokeCredential(Credential $credential): int {
        $req = new RevokeCredentialRequest();
        $req->setConfigData($this->config)->setCredential($credential->toProto());

        $res = $this->bridge->identity->RevokeCredential($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return $res->getTimestamp();
    }
}