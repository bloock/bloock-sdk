<?php

namespace Bloock\Entity\Key;

class LocalCertificateArgs
{
    public string $keyType;
    public SubjectCertificateParams $subjectParams;
    public string $password;

    /**
     * @param string $keyType
     * @param SubjectCertficateParams $params
     * @param string $password
     */
    public function __construct(string $keyType, SubjectCertificateParams $params, string $password)
    {
        $this->keyType = $keyType;
        $this->subjectParams = $params;
        $this->password = $password;
    }

    public static function fromProto(\Bloock\LocalCertificateParams $res): LocalCertificateArgs
    {
        return new LocalCertificateArgs(
            $res->getKeyType(),
            SubjectCertificateParams::fromProto($res->getSubject()),
            $res->getPassword()
        );
    }

    public function toProto(): \Bloock\LocalCertificateParams
    {
        $p = new \Bloock\LocalCertificateParams();
        $p->setKeyType(KeyType::toProto($this->keyType));
        $p->setSubject($this->subjectParams->toProto());
        $p->setPassword($this->password);

        return $p;
    }
}
