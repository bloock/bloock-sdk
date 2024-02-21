<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\CreateHolderRequest;
use Bloock\CreateIssuerRequest;
use Bloock\CreateVerificationRequest;
use Bloock\Entity\Identity\DidType;
use Bloock\Entity\Identity\PublishIntervalParams;
use Bloock\Entity\Identity\Credential;
use Bloock\Entity\Identity\Schema;
use Bloock\Entity\Identity\CredentialBuilder;
use Bloock\Entity\Identity\CredentialProof;
use Bloock\Entity\Identity\DidMethod;
use Bloock\Entity\Identity\Issuer;
use Bloock\Entity\Identity\Holder;
use Bloock\Entity\Identity\IssuerStateReceipt;
use Bloock\Entity\Identity\SchemaBuilder;
use Bloock\Entity\Identity\VerificationReceipt;
use Bloock\Entity\Key\Key;
use Bloock\GetCredentialProofRequest;
use Bloock\GetSchemaRequest;
use Bloock\GetVerificationStatusRequest;
use Bloock\ImportIssuerRequest;
use Bloock\ForcePublishIssuerStateRequest;
use Bloock\GetCredentialOfferRequest;
use Bloock\GetCredentialRequest;
use Bloock\RevokeCredentialRequest;
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
     * Creates a new holder identity.
     * @param Key $holderKey
     * @param string $didMethod
     * @return Holder
     * @throws Exception
     */
    public function createHolder(Key $holderKey, string $didMethod): Holder
    {
        $req = new CreateHolderRequest();
        $req->setKey($holderKey->toProto());
        $req->setConfigData($this->config);
        $req->setDidMethod(DidMethod::toProto($didMethod));

        $res = $this->bridge->identity->CreateHolder($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return new Holder($res->getDid(), new DidMethod($didMethod), $holderKey);
    }

    /**
     * Creates a new issuer on the Bloock Identity service.
     * @param Key $issuerKey
     * @param int $publishInterval
     * @param string $didMethod
     * @param string|null $name
     * @param string|null $description
     * @param string|null $image
     * @return Issuer
     * @throws Exception
     */
    public function createIssuer(Key $issuerKey, int $publishInterval, string $didMethod, string $name = null, string $description = null, string $image = null): Issuer
    {
        $req = new CreateIssuerRequest();
        $req->setKey($issuerKey->toProto());
        $req->setPublishInterval(PublishIntervalParams::toProto($publishInterval));
        $req->setConfigData($this->config);
        $req->setDidMethod(DidMethod::toProto($didMethod));

        if ($name != null) {
            $req->setName($name);
        }

        if ($description != null) {
            $req->setDescription($description);
        }

        if ($image != null) {
            $req->setImage($image);
        }

        $res = $this->bridge->identity->CreateIssuer($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return new Issuer($res->getDid(), new DidMethod($didMethod), $issuerKey);
    }

    /**
     * Gets the issuer based on the issuer key and DID method.
     * @param Key $issuerKey
     * @param string $didMethod
     * @return Issuer
     * @throws Exception
     */
    public function importIssuer(Key $issuerKey, string $didMethod): Issuer
    {
        $req = new ImportIssuerRequest();
        $req->setKey($issuerKey->toProto());
        $req->setConfigData($this->config);
        $req->setDidMethod(DidMethod::toProto($didMethod));

        $res = $this->bridge->identity->ImportIssuer($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return new Issuer($res->getDid(), new DidMethod($didMethod), $issuerKey);
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
        $req = new GetSchemaRequest();
        $req->setConfigData($this->config)->setId($id);

        $res = $this->bridge->identity->GetSchema($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Schema::fromProto($res->getSchema());
    }

    /**
     * Creates a new credential builder for defining a credential on the Bloock Identity service.
     * @param Issuer $issuer
     * @param string $schemaId
     * @param string $holderDid
     * @param int $expiration
     * @param int $version
     * @return CredentialBuilder
     */
    public function buildCredential(Issuer $issuer, string $schemaId, string $holderDid, int $expiration, int $version): CredentialBuilder
    {
        return new CredentialBuilder($issuer, $schemaId, $holderDid, $expiration, $version, $this->config);
    }

    /**
     * Retrieves the Verifiable Credential entity based on the credential ID (UUID). (ex: 1bf0c79e-55e6-4f14-aa9d-fb55619ba0cf)
     * @param string $credentialId
     * @return Credential
     */
    public function getCredential(string $credentialId): Credential
    {
        $req = new GetCredentialRequest();
        $req->setConfigData($this->config)->setCredentialId($credentialId);

        $res = $this->bridge->identity->GetCredential($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Credential::fromProto($res->getCredential());
    }

    /**
     * Retrieves the json raw offer based on the credential ID (UUID). (ex: 1bf0c79e-55e6-4f14-aa9d-fb55619ba0cf)
     * @param Issuer $issuer
     * @param string $credentialId
     */
    public function getCredentialOffer(Issuer $issuer, string $credentialId): string
    {
        $req = new GetCredentialOfferRequest();
        $req->setConfigData($this->config)->setCredentialId($credentialId)->setKey($issuer->getKey()->toProto());

        $res = $this->bridge->identity->GetCredentialOffer($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getCredentialOffer();
    }

    /**
     * Publishes the state of an issuer on the Bloock Identity service.
     * @param Issuer $issuer
     * @return IssuerStateReceipt
     * @throws Exception
     */
    public function forcePublishIssuerState(Issuer $issuer): IssuerStateReceipt
    {
        $req = new ForcePublishIssuerStateRequest();
        $req->setConfigData($this->config);
        $req->setIssuerDid($issuer->getDid()->getDid());
        $req->setKey($issuer->getKey()->toProto());

        $res = $this->bridge->identity->ForcePublishIssuerState($req);

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

        $res = $this->bridge->identity->getCredentialProof($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return CredentialProof::fromProto($res->getProof());
    }

    /**
     * Revokes a credential on the Bloock Identity service.
     * @param Credential $credential
     * @param Issuer $issuer
     * @return bool
     * @throws Exception
     */
    public function revokeCredential(Credential $credential, Issuer $issuer): bool
    {
        $req = new RevokeCredentialRequest();
        $req->setConfigData($this->config);
        $req->setCredential($credential->toProto());
        $req->setKey($issuer->getKey()->toProto());

        $res = $this->bridge->identity->RevokeCredential($req);

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

        $res = $this->bridge->identity->CreateVerification($req);

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

        $res = $this->bridge->identity->WaitVerification($req);

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

        $res = $this->bridge->identity->GetVerificationStatus($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getStatus();
    }
}
