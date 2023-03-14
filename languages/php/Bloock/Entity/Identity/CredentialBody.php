<?php

namespace Bloock\Entity\Identity;

use Google\Protobuf\Internal\RepeatedField;

class CredentialBody
{
    private RepeatedField $context;
    private string $id;
    private RepeatedField $type;
    private string $issuanceDate;
    private $credentialSubject;
    private CredentialStatus $credentialStatus;
    private string $issuer;
    private CredentialSchema $credentialSchema;
    private CredentialProof $credentialProof;

    /**
     * @param RepeatedField $context
     * @param string $id
     * @param RepeatedField $type
     * @param string $issuanceDate
     * @param $credentialSubject
     * @param CredentialStatus $credentialStatus
     * @param string $issuer
     * @param CredentialSchema $credentialSchema
     * @param CredentialProof $credentialProof
     */
    public function __construct(RepeatedField $context, string $id, RepeatedField $type, string $issuanceDate, $credentialSubject, CredentialStatus $credentialStatus, string $issuer, CredentialSchema $credentialSchema, CredentialProof $credentialProof)
    {
        $this->context = $context;
        $this->id = $id;
        $this->type = $type;
        $this->issuanceDate = $issuanceDate;
        $this->credentialSubject = $credentialSubject;
        $this->credentialStatus = $credentialStatus;
        $this->issuer = $issuer;
        $this->credentialSchema = $credentialSchema;
        $this->credentialProof = $credentialProof;
    }

    public static function fromProto(\Bloock\CredentialBody $res): CredentialBody
    {
        return new CredentialBody(
            $res->getContext(),
            $res->getId(),
            $res->getType(),
            $res->getIssuanceDate(),
            $res->getCredentialSubject(),
            CredentialStatus::fromProto($res->getCredentialStatus()),
            $res->getIssuer(),
            CredentialSchema::fromProto($res->getCredentialSchema()),
            CredentialProof::fromProto($res->getProof())
        );
    }

    /**
     * @return RepeatedField
     */
    public function getContext(): RepeatedField
    {
        return $this->context;
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return RepeatedField
     */
    public function getType(): RepeatedField
    {
        return $this->type;
    }

    /**
     * @return string
     */
    public function getIssuanceDate(): string
    {
        return $this->issuanceDate;
    }

    /**
     * @return mixed
     */
    public function getCredentialSubject()
    {
        return $this->credentialSubject;
    }

    /**
     * @return CredentialStatus
     */
    public function getCredentialStatus(): CredentialStatus
    {
        return $this->credentialStatus;
    }

    /**
     * @return string
     */
    public function getIssuer(): string
    {
        return $this->issuer;
    }

    /**
     * @return CredentialSchema
     */
    public function getCredentialSchema(): CredentialSchema
    {
        return $this->credentialSchema;
    }

    public function toProto(): \Bloock\CredentialBody
    {
        $p = new \Bloock\CredentialBody();
        $p->setContext($this->context);
        $p->setId($this->id);
        $p->setType($this->type);
        $p->setIssuanceDate($this->issuanceDate);
        $p->setCredentialSubject($this->credentialSubject);
        $p->setCredentialStatus($this->credentialStatus->toProto());
        $p->setIssuer($this->issuer);
        $p->setCredentialSchema($this->credentialSchema->toProto());
        $p->setProof($this->credentialProof->toProto());
        return $p;
    }

    /**
     * @return CredentialProof
     */
    public function getCredentialProof(): CredentialProof
    {
        return $this->credentialProof;
    }
}