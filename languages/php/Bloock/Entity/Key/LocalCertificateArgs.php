<?php

namespace Bloock\Entity\Key;

class LocalCertificateArgs
{
    public string $keyType;
    public SubjectCertificateParams $subjectParams;
    public string $password;
    public int $expiration;

    /**
     * @param string $keyType
     * @param SubjectCertficateParams $params
     * @param string $password
     * @param int $expiration
     */
    public function __construct(string $keyType, SubjectCertificateParams $params, string $password, int $expiration)
    {
        $this->keyType = $keyType;
        $this->subjectParams = $params;
        $this->password = $password;
        $this->expiration = $expiration;
    }

    public static function fromProto(\Bloock\LocalCertificateParams $res): LocalCertificateArgs
    {
        return new LocalCertificateArgs(
            $res->getKeyType(),
            SubjectCertificateParams::fromProto($res->getSubject()),
            $res->getPassword(),
            $res->getExpiration()
        );
    }

    public function toProto(): \Bloock\LocalCertificateParams
    {
        $p = new \Bloock\LocalCertificateParams();
        $p->setKeyType(KeyType::toProto($this->keyType));
        $p->setSubject($this->subjectParams->toProto());
        $p->setPassword($this->password);
        $p->setExpiration($this->expiration);

        return $p;
    }
}
