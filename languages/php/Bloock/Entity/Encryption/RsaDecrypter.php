<?php

namespace Bloock\Entity\Encryption;

class RsaDecrypter implements Decrypter
{
    public int $alg;
    public DecrypterArgs $args;

    public function __construct(DecrypterArgs $args)
    {
        $this->alg = \Bloock\EncryptionAlg::RSA;
        $this->args = $args;
    }

    public function toProto(): \Bloock\Decrypter
    {
        $p = new \Bloock\Decrypter();
        $p->setAlg($this->alg);

        if ($this->args->localKey != null) {
            $p->setLocalKey($this->args->localKey->toProto());
        }

        if ($this->args->managedKey != null) {
            $p->setManagedKey($this->args->managedKey->toProto());
        }

        return $p;
    }
}