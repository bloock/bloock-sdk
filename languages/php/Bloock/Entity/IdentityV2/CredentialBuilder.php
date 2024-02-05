<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\Bridge\Bridge;
use Bloock\ConfigData;
use Bloock\CreateCredentialRequestV2;
use Bloock\Signer as SingerProto;
use Bloock\Entity\Authenticity\Signer;
use DateTime;
use Exception;

/**
 * Helps construct credentials by specifying various attributes.
 */
class CredentialBuilder
{
    private string $schemaId;
    private string $issuerDid;
    private string $holderDid;
    private int $expiration;
    private int $version;
    private SingerProto $signer;
    private ConfigData $configData;

    private array $stringAttributes;
    private array $integerAttributes;
    private array $decimalAttributes;
    private array $booleanAttributes;
    private array $dateAttributes;
    private array $datetimeAttributes;

    /**
     * Creates a new CredentialBuilder instance with the specified parameters.
     * @param string $schemaId
     * @param string $issuerDid
     * @param string $holderDid
     * @param int $expiration
     * @param int $version
     * @param ConfigData $configData
     */
    public function __construct(string $schemaId, string $issuerDid, string $holderDid, int $expiration, int $version, ConfigData $configData)
    {
        $this->schemaId = $schemaId;
        $this->issuerDid = $issuerDid;
        $this->holderDid = $holderDid;
        $this->expiration = $expiration;
        $this->version = $version;
        $this->signer = new SingerProto();
        $this->configData = $configData;

        $this->stringAttributes = [];
        $this->integerAttributes = [];
        $this->decimalAttributes = [];
        $this->booleanAttributes = [];
        $this->dateAttributes = [];
        $this->datetimeAttributes = [];
    }

    /**
     * Adds a string attribute to the CredentialBuilder.
     * @param string $key
     * @param string $value
     * @return $this
     */
    public function withStringAttribute(string $key, string $value): CredentialBuilder
    {
        $attribute = new StringAttribute($key, $value);
        $this->stringAttributes[] = $attribute->toProto();
        return $this;
    }

    /**
     * Adds an integer attribute to the CredentialBuilder.
     * @param string $key
     * @param int $value
     * @return $this
     */
    public function withIntegerAttribute(string $key, int $value): CredentialBuilder
    {
        $attribute = new IntegerAttribute($key, $value);
        $this->integerAttributes[] = $attribute->toProto();
        return $this;
    }

    /**
     * Adds a decimal attribute to the CredentialBuilder.
     * @param string $key
     * @param float $value
     * @return $this
     */
    public function withDecimalAttribute(string $key, float $value): CredentialBuilder
    {
        $attribute = new DecimalAttribute($key, $value);
        $this->decimalAttributes[] = $attribute->toProto();
        return $this;
    }

    /**
     * Adds a boolean attribute to the CredentialBuilder.
     * @param string $key
     * @param bool $value
     * @return $this
     */
    public function withBooleanAttribute(string $key, bool $value): CredentialBuilder
    {
        $attribute = new BooleanAttribute($key, $value);
        $this->booleanAttributes[] = $attribute->toProto();
        return $this;
    }

    /**
     * Adds a date attribute to the CredentialBuilder.
     * @param string $key
     * @param DateTime $value
     * @return $this
     */
    public function withDateAttribute(string $key, DateTime $value): CredentialBuilder
    {
        $formated = $value->format('Y-m-d');
        $attribute = new DateAttribute($key, $formated);
        $this->dateAttributes[] = $attribute->toProto();
        return $this;
    }

    /**
     * Adds a datetime attribute to the CredentialBuilder.
     * @param string $key
     * @param DateTime $value
     * @return $this
     */
    public function withDatetimeAttribute(string $key, DateTime $value): CredentialBuilder
    {
        $formated = $value->format('Y-m-d\TH:i:sP');
        $attribute = new DatetimeAttribute($key, $formated);
        $this->datetimeAttributes[] = $attribute->toProto();
        return $this;
    }

    /**
     * Sets the signer for the CredentialBuilder.
     * @param Signer $signer
     * @return $this
     */
    public function withSigner(Signer $signer): CredentialBuilder
    {
        $this->signer = $signer->toProto();
        return $this;
    }

    /**
     * Creates and returns a Credential using the specified attributes.
     * @return CredentialReceipt
     * @throws Exception
     */
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
        $req->setSigner($this->signer);
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
