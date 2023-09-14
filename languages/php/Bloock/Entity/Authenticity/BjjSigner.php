<?php

namespace Bloock\Entity\Authenticity;

use Bloock\SignerAlg;

class BjjSigner implements Signer
{
    public int $alg;
    public SignerArgs $args;

    public function __construct(SignerArgs $args)
    {
        $this->alg = SignerAlg::BJJ;
        $this->args = $args;
    }

    public function toProto(): \Bloock\Signer
    {
        $s = new \Bloock\Signer();
        $s->setAlg($this->alg);

        if ($this->args->localKey != null) {
            $s->setLocalKey($this->args->localKey->toProto());
        }

        if ($this->args->managedKey != null) {
            $s->setManagedKey($this->args->managedKey->toProto());
        }

        if ($this->args->managedCertificate != null) {
            $s->setManagedCertificate($this->args->managedCertificate->toProto());
        }

        if ($this->args->commonName != null) {
            $s->setCommonName($this->args->commonName);
        }

        return $s;
    }
}
