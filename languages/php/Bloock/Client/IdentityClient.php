<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\CreateIdentityV2Request;
use Bloock\CreateIssuerRequest;
use Bloock\CreateVerificationRequest;
use Bloock\Entity\Authenticity\Signer;
use Bloock\GetIssuerListRequest;
use Bloock\Entity\IdentityV2\Credential;
use Bloock\Entity\IdentityV2\Schema;
use Bloock\Entity\IdentityV2\CredentialBuilder;
use Bloock\Entity\IdentityV2\CredentialProof;
use Bloock\Entity\IdentityV2\DidParams;
use Bloock\Entity\IdentityV2\IdentityKey;
use Bloock\Entity\IdentityV2\IssuerStatePublisher;
use Bloock\Entity\IdentityV2\IssuerStateReceipt;
use Bloock\Entity\IdentityV2\SchemaBuilder;
use Bloock\Entity\IdentityV2\VerificationReceipt;
use Bloock\GetIssuerByKeyRequest;
use Bloock\GetCredentialProofRequest;
use Bloock\GetSchemaRequestV2;
use Bloock\GetVerificationStatusRequest;
use Bloock\PublishIssuerStateRequest;
use Bloock\RevokeCredentialRequestV2;
use Bloock\WaitVerificationRequest;
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

    public function createIdentity(IdentityKey $identityKey, DidParams $didParams = null): string
    {
        $req = new CreateIdentityV2Request();
        $req->setIssuerKey($identityKey->toProto());
        $req->setConfigData($this->config);

        if ($didParams != null) {
            $req->setDidParams($didParams->toProto());
        }

        $res = $this->bridge->identityV2->CreateIdentity($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getDid();
    }

    public function createIssuer(IdentityKey $issuerKey, DidParams $didParams = null, string $name = null, string $description = null, string $image = null, int $publishInterval = null): string
    {
        $req = new CreateIssuerRequest();
        $req->setIssuerKey($issuerKey->toProto());
        $req->setConfigData($this->config);

        if ($didParams != null) {
            $req->setIssuerParams($didParams->toProto());
        }

        if ($name != null) {
            $req->setName($name);
        }

        if ($description != null) {
            $req->setDescription($description);
        }

        if ($image != null) {
            $req->setImage($image);
        }

        if ($publishInterval != null) {
            $req->setPublishInterval($publishInterval);
        }

        $res = $this->bridge->identityV2->CreateIssuer($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getDid();
    }

    public function getIssuerByKey(IdentityKey $issuerKey, DidParams $didParams = null): string
    {
        $req = new GetIssuerByKeyRequest();
        $req->setIssuerKey($issuerKey->toProto());
        $req->setConfigData($this->config);
        if ($didParams != null) {
            $req->setIssuerParams($didParams->toProto());
        }

        $res = $this->bridge->identityV2->GetIssuerByKey($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getDid();
    }

    public function buildSchema(string $displayName, string $schemaType, string $version, string $description, $issuerDid): SchemaBuilder
    {
        return new SchemaBuilder($displayName, $schemaType, $version, $description, $issuerDid, $this->config);
    }

    public function getSchema(string $id): Schema
    {
        $req = new GetSchemaRequestV2();
        $req->setConfigData($this->config)->setId($id);

        $res = $this->bridge->identityV2->GetSchema($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Schema::fromProto($res->getSchema());
    }

    public function buildCredential(string $schemaId, string $issuerDid, string $holderDid, int $expiration, int $version): CredentialBuilder
    {
        return new CredentialBuilder($schemaId, $issuerDid, $holderDid, $expiration, $version, $this->config);
    }

    public function publishIssuerState(string $issuerDid, Signer $signer): IssuerStateReceipt
    {
        $req = new PublishIssuerStateRequest();
        $req->setConfigData($this->config);
        $req->setIssuerDid($issuerDid);
        $req->setSigner($signer->toProto());

        $res = $this->bridge->identityV2->PublishIssuerState($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return IssuerStateReceipt::fromProto($res->getStateReceipt());
    }

    public function getCredentialProof(string $issuerDid, string $credentialId): CredentialProof
    {
        $req = new GetCredentialProofRequest();
        $req->setIssuerDid($issuerDid);
        $req->setCredentialId($credentialId);
        $req->setConfigData($this->config);

        $res = $this->bridge->identityV2->getCredentialProof($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return CredentialProof::fromProto($res->getProof());
    }

    public function revokeCredential(Credential $credential, Signer $signer): bool
    {
        $req = new RevokeCredentialRequestV2();
        $req->setConfigData($this->config);
        $req->setCredential($credential->toProto());
        $req->setSigner($signer->toProto());

        $res = $this->bridge->identityV2->RevokeCredential($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getResult()->getSuccess();
    }

    public function createVerification(String $proofRequest): VerificationReceipt
    {
        $req = new CreateVerificationRequest();
        $req->setConfigData($this->config);
        $req->setProofRequest($proofRequest);

        $res = $this->bridge->identityV2->CreateVerification($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return VerificationReceipt::fromProto($res->getResult());
    }

    public function waitVerification(int $sessionID, int $timeout = 120000): bool
    {
        $req = new WaitVerificationRequest();
        $req->setConfigData($this->config);
        $req->setSessionId($sessionID);
        $req->setTimeout($timeout);

        $res = $this->bridge->identityV2->WaitVerification($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getStatus();
    }

    public function getVerificationStatus(int $sessionID): bool
    {
        $req = new GetVerificationStatusRequest();
        $req->setConfigData($this->config);
        $req->setSessionId($sessionID);

        $res = $this->bridge->identityV2->GetVerificationStatus($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getStatus();
    }
}
