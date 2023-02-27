<?php

namespace Bloock\Entity\Encryption;

class EncrypterArgs
{
    public $key;

    public function __construct(string $key) {
        $this->key = $key;
    }

    public function toProto(): \Bloock\EncrypterArgs {
        $p = new \Bloock\EncrypterArgs();
        $p->setKey($this->key);
        return $p;
    }
}