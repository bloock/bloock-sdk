<?php

namespace Bloock\Entity\Key;

class SubjectCertificateParams
{
    public string $cn;
    public string $c;
    public string $ou;
    public string $o;

    public function __construct(string $cn, string $c, string $ou, string $o)
    {
        $this->cn = $cn;
        $this->c = $c;
        $this->ou = $ou;
        $this->o = $o;
    }
}