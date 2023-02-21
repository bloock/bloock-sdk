<?php

namespace Bloock\Entity;

class AesEncrypter implements Encrypter
{
    public $alg;
    public $args;

    public function __construct(string $password) {
        $this->alg = \Bloock\EncryptionAlg::A256GCM;
        $this->args = new EncrypterArgs($password);
    }

    public function toProto(): \Bloock\Encrypter {
        $p = new \Bloock\Encrypter();
        $p->setAlg($this->alg);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}