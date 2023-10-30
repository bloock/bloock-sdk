<?php

namespace Bloock\Entity\Authenticity;

use Bloock\SignerAlg;

class Signer
{
    public SignerArgs $args;

    public function __construct(SignerArgs $args)
    {
        $this->args = $args;
    }

    public function toProto(): \Bloock\Signer
    {
        $s = new \Bloock\Signer();

        if ($this->args->localKey != null) {
            $s->setLocalKey($this->args->localKey->toProto());
        }

        if ($this->args->managedKey != null) {
            $s->setManagedKey($this->args->managedKey->toProto());
        }

        if ($this->args->managedCertificate != null) {
            $s->setManagedCertificate($this->args->managedCertificate->toProto());
        }

        if ($this->args->localCertificate != null) {
            $s->setLocalCertificate($this->args->localCertificate->toProto());
        }

        if ($this->args->commonName != null) {
            $s->setCommonName($this->args->commonName);
        }

        return $s;
    }
}