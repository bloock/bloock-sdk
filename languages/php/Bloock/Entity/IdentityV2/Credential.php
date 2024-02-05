<?php

namespace Bloock\Entity\IdentityV2;

use Google\Protobuf\Internal\RepeatedField;
use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\CredentialFromJsonRequestV2;
use Bloock\CredentialToJsonRequestV2;
use Exception;

/**
 * Represents a verifiable credential with its associated information. [Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model-2.0/).
 */
class Credential
{
    private RepeatedField $context;
    private string $id;
    private RepeatedField $type;
    private string $issuanceDate;
    private string $expiration;
    private $credentialSubject;
    private CredentialStatus $credentialStatus;
    private string $issuer;
    private CredentialSchema $credentialSchema;
    private CredentialProof $credentialProof;

    /**
     * Creates a new Credential instance with the provided details.
     * @param RepeatedField $context
     * @param string $id
     * @param RepeatedField $type
     * @param string $issuanceDate
     * @param string $expiration
     * @param $credentialSubject
     * @param CredentialStatus $credentialStatus
     * @param string $issuer
     * @param CredentialSchema $credentialSchema
     * @param CredentialProof $credentialProof
     */
    public function __construct(RepeatedField $context, string $id, RepeatedField $type, string $issuanceDate, string $expiration, $credentialSubject, CredentialStatus $credentialStatus, string $issuer, CredentialSchema $credentialSchema, CredentialProof $credentialProof)
    {
        $this->context = $context;
        $this->id = $id;
        $this->type = $type;
        $this->issuanceDate = $issuanceDate;
        $this->expiration = $expiration;
        $this->credentialSubject = $credentialSubject;
        $this->credentialStatus = $credentialStatus;
        $this->issuer = $issuer;
        $this->credentialSchema = $credentialSchema;
        $this->credentialProof = $credentialProof;
    }

    public static function fromProto(\Bloock\CredentialV2 $res): Credential
    {
        return new Credential(
            $res->getContext(),
            $res->getId(),
            $res->getType(),
            $res->getIssuanceDate(),
            $res->getExpiration(),
            $res->getCredentialSubject(),
            CredentialStatus::fromProto($res->getCredentialStatus()),
            $res->getIssuer(),
            CredentialSchema::fromProto($res->getCredentialSchema()),
            CredentialProof::fromProto($res->getProof())
        );
    }

    /**
     * Creates a Credential instance from a JSON string representation.
     * @param string $json
     * @return Credential
     * @throws Exception
     */
    public static function fromJson(string $json): Credential
    {
        $bridge = new Bridge();

        $req = new CredentialFromJsonRequestV2();
        $req->setConfigData(Config::newConfigDataDefault());
        $req->setJson($json);

        $res = $bridge->identityV2->CredentialFromJson($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Credential::fromProto($res->getCredential());
    }

    /**
     * Converts the Credential instance to its JSON string representation.
     * @return string
     * @throws Exception
     */
    public function toJson(): string
    {
        $bridge = new Bridge();

        $req = new CredentialToJsonRequestV2();
        $req->setConfigData(Config::newConfigDataDefault());
        $req->setCredential($this->toProto());

        $res = $bridge->identityV2->CredentialToJson($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getJson();
    }

    /**
     * Gets the context associated with the credential.
     * @return RepeatedField
     */
    public function getContext(): RepeatedField
    {
        return $this->context;
    }

    /**
     * Gets the ID associated with the credential.
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * Gets the types associated with the credential.
     * @return RepeatedField
     */
    public function getType(): RepeatedField
    {
        return $this->type;
    }

    /**
     * Gets the issuance date of the credential.
     * @return string
     */
    public function getIssuanceDate(): string
    {
        return $this->issuanceDate;
    }

    /**
     * Gets the expiration date of the credential.
     * @return string
     */
    public function getExpiration(): string
    {
        return $this->expiration;
    }

    /**
     * Gets the subject of the credential.
     * @return mixed
     */
    public function getCredentialSubject()
    {
        return $this->credentialSubject;
    }

    /**
     * Gets the status of the credential.
     * @return CredentialStatus
     */
    public function getCredentialStatus(): CredentialStatus
    {
        return $this->credentialStatus;
    }

    /**
     * Gets the issuer of the credential.
     * @return string
     */
    public function getIssuer(): string
    {
        return $this->issuer;
    }

    /**
     * Gets the schema associated with the credential.
     * @return CredentialSchema
     */
    public function getCredentialSchema(): CredentialSchema
    {
        return $this->credentialSchema;
    }

    /**
     * Gets the proof associated with the credential.
     * @return CredentialProof
     */
    public function getCredentialProof(): CredentialProof
    {
        return $this->credentialProof;
    }

    public function toProto(): \Bloock\CredentialV2
    {
        $p = new \Bloock\CredentialV2();
        $p->setContext($this->context);
        $p->setId($this->id);
        $p->setType($this->type);
        $p->setIssuanceDate($this->issuanceDate);
        $p->setExpiration($this->expiration);
        $p->setCredentialSubject($this->credentialSubject);
        $p->setCredentialStatus($this->credentialStatus->toProto());
        $p->setIssuer($this->issuer);
        $p->setCredentialSchema($this->credentialSchema->toProto());
        $p->setProof($this->credentialProof->toProto());
        return $p;
    }
}
