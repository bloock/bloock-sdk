<?php

namespace Bloock\Entity;

class DecrypterArgs
{
    public $key;

    public function __construct(string $key) {
        $this->key = $key;
    }

    public function toProto(): \Bloock\DecrypterArgs {
        $p = new \Bloock\DecrypterArgs();
        $p->setKey($this->key);
        return $p;
    }
}