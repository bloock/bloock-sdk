<?php

namespace Bloock\Entity;

class RsaEncrypter implements Encrypter
{
    public $alg;
    public $args;

    public function __construct(string $publicKey) {
        $this->alg = \Bloock\EncryptionAlg::RSA;
        $this->args = new EncrypterArgs($publicKey);
    }

    public function toProto(): \Bloock\Encrypter {
        $p = new \Bloock\Encrypter();
        $p->setAlg($this->alg);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}