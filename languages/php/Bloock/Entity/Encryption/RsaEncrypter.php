<?php

namespace Bloock\Entity\Encryption;

class RsaEncrypter implements Encrypter
{
    public int $alg;
    public EncrypterArgs $args;

    public function __construct(EncrypterArgs $args)
    {
        $this->alg = \Bloock\EncryptionAlg::RSA;
        $this->args = $args;
    }

    public function toProto(): \Bloock\Encrypter
    {
        $p = new \Bloock\Encrypter();
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