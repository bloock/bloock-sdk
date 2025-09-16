<?php

namespace Bloock\Entity\Key;

/**
 * Represents parameters for creating a managed certificate.
 */
class ManagedCertificateParams
{
    /**
     * Is the type of the key.
     * @var string
     */
    public string $keyType;
    /**
     * Represents the subject details of the certificate.
     * @var SubjectCertificateParams
     */
    public SubjectCertificateParams $subjectParams;
    /**
     * Is the number of months until the certificate expiration.
     * @var int
     */
    public int $expiration;

    /**
     * Constructs a ManagedCertificateParams object with the specified parameters.
     * @param string $keyType
     * @param SubjectCertificateParams $params
     * @param int $expiration
     */
    public function __construct(string $keyType, SubjectCertificateParams $params, int $expiration)
    {
        $this->keyType = $keyType;
        $this->subjectParams = $params;
        $this->expiration = $expiration;
    }

    public static function fromProto(\Bloock\ManagedCertificateParams $res): ManagedCertificateParams
    {
        return new ManagedCertificateParams(
            $res->getKeyType(),
            SubjectCertificateParams::fromProto($res->getSubject()),
            $res->getExpiration()
        );
    }

    public function toProto(): \Bloock\ManagedCertificateParams
    {
        $p = new \Bloock\ManagedCertificateParams();
        $p->setKeyType(KeyType::toProto($this->keyType));
        $p->setSubject($this->subjectParams->toProto());
        $p->setExpiration($this->expiration);

        return $p;
    }
}

/**
 * Represents the parameters for importing a certificate.
 */
class ImportCertificateParams
{
    public ?string $password;

    /**
     * Constructs a new ImportCertificateParams object with the specified or not password.
     * @param ?string $keyType
     */
    public function __construct(?string $password = null)
    {
        $this->password = $password;
    }
}
