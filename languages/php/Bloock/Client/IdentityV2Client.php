<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\CreateIssuerRequest;
use Bloock\GetIssuerListRequest;
use Bloock\Entity\IdentityV2\Credential;
use Bloock\Entity\IdentityV2\CredentialBuilder;
use Bloock\Entity\IdentityV2\CredentialProof;
use Bloock\Entity\IdentityV2\IssuerStatePublisher;
use Bloock\Entity\IdentityV2\SchemaBuilder;
use Bloock\Entity\IdentityV2\IssuerKey;
use Bloock\Entity\IdentityV2\IssuerParams;
use Bloock\GetIssuerByKeyRequest;
use Bloock\GetCredentialProofRequest;
use Bloock\RevokeCredentialRequestV2;
use Exception;

class IdentityV2Client
{
    private $bridge;
    private $config;
    private string $apiManagedHost;

    public function __construct(string $apiManagedHost, ConfigData $config = null)
    {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }
        $this->apiManagedHost = $apiManagedHost;
    }

    public function createIssuer(IssuerKey $issuerKey, IssuerParams $issuerParams = null): string
    {
        $req = new CreateIssuerRequest();
        $req->setIssuerKey($issuerKey->toProto());
        $req->setIssuerParams($issuerParams->toProto());
        $req->setConfigData($this->config);

        $res = $this->bridge->identityV2->CreateIssuer($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getDid();
    }

    public function getIssuerList(): array
    {
        $req = new GetIssuerListRequest();
        $req->setConfigData($this->config);

        $res = $this->bridge->identityV2->GetIssuerList($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getDid();
    }

    public function getIssuerByKey(IssuerKey $issuerKey, IssuerParams $issuerParams = null): string
    {
        $req = new GetIssuerByKeyRequest();
        $req->setIssuerKey($issuerKey->toProto());
        $req->setIssuerParams($issuerParams->toProto());
        $req->setConfigData($this->config);

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

    public function buildCredential(string $schemaId, string $issuerDid, string $holderDid, int $expiration, int $version): CredentialBuilder
    {
        return new CredentialBuilder($schemaId, $issuerDid, $holderDid, $expiration, $version, $this->apiManagedHost, $this->config);
    }

    public function buildIssuerStatePublisher(string $issuerDid): IssuerStatePublisher
    {
        return new IssuerStatePublisher($issuerDid, $this->config);
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

    public function revokeCredential(Credential $credential): bool
    {
        $req = new RevokeCredentialRequestV2();
        $req->setConfigData($this->config)->setCredential($credential->toProto());

        $res = $this->bridge->identityV2->RevokeCredential($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getResult()->getSuccess();
    }
}
