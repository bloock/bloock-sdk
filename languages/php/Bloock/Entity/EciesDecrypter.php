<?php

namespace Bloock\Entity;

class EciesDecrypter implements Decrypter
{
    public $alg;
    public $args;

    public function __construct(string $publicKey) {
        $this->alg = \Bloock\EncryptionAlg::ECIES;
        $this->args = new DecrypterArgs($publicKey);
    }

    public function toProto(): \Bloock\Decrypter {
        $p = new \Bloock\Decrypter();
        $p->setAlg($this->alg);
        $p->setArgs($this->args->toProto());
        return $p;
    }
}