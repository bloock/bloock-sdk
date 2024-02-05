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
use Bloock\Entity\IdentityV2\PublishIntervalParams;
use Bloock\GetIssuerByKeyRequest;
use Bloock\GetCredentialProofRequest;
use Bloock\GetSchemaRequestV2;
use Bloock\GetVerificationStatusRequest;
use Bloock\PublishIssuerStateRequest;
use Bloock\RevokeCredentialRequestV2;
use Bloock\WaitVerificationRequest;
use Exception;

/**
 * Represents a client for interacting with the [Bloock Identity service](https://dashboard.bloock.com/login).
 */
class IdentityClient
{
    private $bridge;
    private $config;

    /**
     * Creates a new instance of the IdentityClient with the provided configuration.
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
     * Creates a new identity.
     * @param IdentityKey $identityKey
     * @param DidParams|null $didParams
     * @return string
     * @throws Exception
     */
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

    /**
     * Creates a new issuer on the Bloock Identity service.
     * @param IdentityKey $issuerKey
     * @param int $publishInterval
     * @param DidParams|null $didParams
     * @param string|null $name
     * @param string|null $description
     * @param string|null $image
     * @return string
     * @throws Exception
     */
    public function createIssuer(IdentityKey $issuerKey, int $publishInterval, DidParams $didParams = null, string $name = null, string $description = null, string $image = null): string
    {
        $req = new CreateIssuerRequest();
        $req->setIssuerKey($issuerKey->toProto());
        $req->setPublishInterval(PublishIntervalParams::toProto($publishInterval));
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

        $res = $this->bridge->identityV2->CreateIssuer($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getDid();
    }

    /**
     * Gets the DID of an issuer based on the issuer key.
     * @param IdentityKey $issuerKey
     * @param DidParams|null $didParams
     * @return string
     * @throws Exception
     */
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

    /**
     * Creates a new schema builder for defining a schema on the Bloock Identity service.
     * @param string $displayName
     * @param string $schemaType
     * @param string $version
     * @param string $description
     * @return SchemaBuilder
     */
    public function buildSchema(string $displayName, string $schemaType, string $version, string $description): SchemaBuilder
    {
        return new SchemaBuilder($displayName, $schemaType, $version, $description, $this->config);
    }

    /**
     * Gets a schema from the Bloock Identity service based on the schema ID (ex: Qma1t4uzbnB93E4rasNdu5UWMDh5qg3wMkPm68cnEyfnoM).
     * @param string $id
     * @return Schema
     * @throws Exception
     */
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

    /**
     * Creates a new credential builder for defining a credential on the Bloock Identity service.
     * @param string $schemaId
     * @param string $issuerDid
     * @param string $holderDid
     * @param int $expiration
     * @param int $version
     * @return CredentialBuilder
     */
    public function buildCredential(string $schemaId, string $issuerDid, string $holderDid, int $expiration, int $version): CredentialBuilder
    {
        return new CredentialBuilder($schemaId, $issuerDid, $holderDid, $expiration, $version, $this->config);
    }

    /**
     * Publishes the state of an issuer on the Bloock Identity service.
     * @param string $issuerDid
     * @param Signer $signer
     * @return IssuerStateReceipt
     * @throws Exception
     */
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

    /**
     * Gets the proof of a credential on the Bloock Identity service.
     * @param string $issuerDid
     * @param string $credentialId
     * @return CredentialProof
     * @throws Exception
     */
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

    /**
     * Revokes a credential on the Bloock Identity service.
     * @param Credential $credential
     * @param Signer $signer
     * @return bool
     * @throws Exception
     */
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

    /**
     * Creates a new verification session on the identity managed API provided.
     * @param String $proofRequest
     * @return VerificationReceipt
     * @throws Exception
     */
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

    /**
     * Waits for the completion of a verification session on the identity managed API provided.
     * @param int $sessionID
     * @param int $timeout
     * @return bool
     * @throws Exception
     */
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

    /**
     * Gets the status of a verification session on the identity managed API provided.
     * @param int $sessionID
     * @return bool
     * @throws Exception
     */
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
