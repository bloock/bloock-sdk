<?php

namespace Bloock\Entity\Encryption;

class AesDecrypter implements Decrypter
{
    public $alg;
    public $args;

    public function __construct(string $password)
    {
        $this->alg = \Bloock\EncryptionAlg::A256GCM;
        $this->args = new DecrypterArgs($password);
    }

    public function toProto(): \Bloock\Decrypter
    {
        $p = new \Bloock\Decrypter();
        $p->setAlg($this->alg);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}