<?php

namespace Bloock\Entity\Authenticity;

use Bloock\SignerAlg;

class EcdsaSigner implements Signer
{
    public int $alg;
    public SignerArgs $args;

    public function __construct(string $privateKey, $commonName = "") {
        $this->alg = SignerAlg::ES256K;
        $this->args = new SignerArgs($privateKey, $commonName);
    }

    public function toProto(): \Bloock\Signer {
        $s = new \Bloock\Signer();
        $s->setAlg($this->alg);
        $s->setArgs($this->args->toProto());
        return $s;
    }
}