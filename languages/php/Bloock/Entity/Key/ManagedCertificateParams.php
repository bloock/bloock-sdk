<?php

namespace Bloock\Entity\Key;

class ManagedCertificateParams
{
    public string $keyType;
    public SubjectCertificateParams $subjectParams;
    public int $expiration;

    /**
     * @param string $keyType
     * @param SubjectCertficateParams $params
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
            new SubjectCertificateParams(
                $res->getCn(),
                $res->getC(),
                $res->getOu(),
                $res->getO()
            ),
            $res->getExpiration()
        );
    }

    public function toProto(): \Bloock\ManagedCertificateParams
    {
        $p = new \Bloock\ManagedCertificateParams();
        $p->setKeyType(KeyType::toProto($this->keyType));
        $p->setCn($this->subjectParams->cn);
        $p->setC($this->subjectParams->c);
        $p->setOu($this->subjectParams->ou);
        $p->setO($this->subjectParams->o);
        $p->setExpiration($this->expiration);

        return $p;
    }
}

class ImportCertificateParams
{
    public ?string $password;

    /**
     * @param ?string $keyType
     */
    public function __construct(string $password = null)
    {
        $this->password = $password;
    }
}
