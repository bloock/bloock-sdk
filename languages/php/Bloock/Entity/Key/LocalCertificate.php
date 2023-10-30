<?php

namespace Bloock\Entity\Key;

class LocalCertificate
{
    public array $pkcs12;
    public string $password;

    /**
     * @param array $pkcs12
     * @param string $password
     */
    public function __construct(array $pkcs12, string $password)
    {
        $this->pkcs12 = $pkcs12;
        $this->password = $password;
    }

    public static function fromProto(\Bloock\LocalCertificate $res): LocalCertificate
    {
        return new LocalCertificate(unpack('C*', $res->getPkcs12()), $res->getPassword());
    }

    public function toProto(): \Bloock\LocalCertificate
    {
        $p = new \Bloock\LocalCertificate();
        $p->setPkcs12(implode(array_map("chr", $this->pkcs12)));
        $p->setPassword($this->password);
        return $p;
    }
}
