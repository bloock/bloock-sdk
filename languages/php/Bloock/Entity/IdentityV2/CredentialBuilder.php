<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\Bridge\Bridge;
use Bloock\ConfigData;
use Bloock\CreateCredentialRequestV2;
use Bloock\Signer as SingerProto;
use Bloock\Entity\Authenticity\Signer;
use DateTime;
use Exception;

class CredentialBuilder
{
    private string $schemaId;
    private string $issuerDid;
    private string $holderDid;
    private int $expiration;
    private int $version;
    private SingerProto $signer;
    private string $apiManagedHost;
    private array $proofType;
    private ConfigData $configData;

    private array $stringAttributes;
    private array $integerAttributes;
    private array $decimalAttributes;
    private array $booleanAttributes;
    private array $dateAttributes;
    private array $datetimeAttributes;

    public function __construct(string $schemaId, string $issuerDid, string $holderDid, int $expiration, int $version, string $apiManagedHost, ConfigData $configData)
    {
        $this->schemaId = $schemaId;
        $this->issuerDid = $issuerDid;
        $this->holderDid = $holderDid;
        $this->expiration = $expiration;
        $this->version = $version;
        $this->apiManagedHost = $apiManagedHost;
        $this->signer = null;
        $this->proofType = [];
        $this->configData = $configData;

        $this->stringAttributes = [];
        $this->integerAttributes = [];
        $this->decimalAttributes = [];
        $this->booleanAttributes = [];
        $this->dateAttributes = [];
        $this->datetimeAttributes = [];
    }

    public function withStringAttribute(string $key, string $value): CredentialBuilder
    {
        $attribute = new StringAttribute($key, $value);
        $this->stringAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withIntegerAttribute(string $key, int $value): CredentialBuilder
    {
        $attribute = new IntegerAttribute($key, $value);
        $this->integerAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withDecimalAttribute(string $key, float $value): CredentialBuilder
    {
        $attribute = new DecimalAttribute($key, $value);
        $this->decimalAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withBooleanAttribute(string $key, bool $value): CredentialBuilder
    {
        $attribute = new BooleanAttribute($key, $value);
        $this->booleanAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withDateAttribute(string $key, DateTime $value): CredentialBuilder
    {
        $attribute = new DateAttribute($key, $value);
        $this->dateAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withDatetimeAttribute(string $key, DateTime $value): CredentialBuilder
    {
        $attribute = new DatetimeAttribute($key, $value);
        $this->datetimeAttributes[] = $attribute->toProto();
        return $this;
    }

    public function withSigner(Signer $signer): CredentialBuilder
    {
        $this->signer = $signer->toProto();
        return $this;
    }

    public function withProofType(array $proofs): CredentialBuilder
    {
        foreach ($proofs as $value) {
            $this->proofType[] = ProofType::toProto($value);
        }
        $this->proofType = $proofs;
        return $this;
    }

    public function build(): CredentialReceipt
    {
        $bridge = new Bridge();

        $req = new CreateCredentialRequestV2();
        $req->setConfigData($this->configData);
        $req->setSchemaId($this->schemaId);
        $req->setIssuerDid($this->issuerDid);
        $req->setHolderDid($this->holderDid);
        $req->setExpiration($this->expiration);
        $req->setVersion($this->version);
        $req->setApiManagedHost($this->apiManagedHost);
        $req->setSigner($this->signer);
        $req->setProofType($this->proofType);
        $req->setstringAttributes($this->stringAttributes);
        $req->setIntegerAttributes($this->integerAttributes);
        $req->setDecimalAttributes($this->decimalAttributes);
        $req->setBooleanAttributes($this->booleanAttributes);
        $req->setDateAttributes($this->dateAttributes);
        $req->setDatetimeAttributes($this->datetimeAttributes);

        $res = $bridge->identityV2->CreateCredential($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return CredentialReceipt::fromProto($res->getCredentialReceipt());
    }
}
