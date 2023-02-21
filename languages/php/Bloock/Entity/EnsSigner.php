<?php

namespace Bloock\Entity;

use Bloock\SignerAlg;

class EnsSigner implements Signer
{
    public int $alg;
    public SignerArgs $args;

    public function __construct(string $privateKey) {
        $this->alg = SignerAlg::ENS;
        $this->args = new SignerArgs($privateKey);
    }

    public function toProto(): \Bloock\Signer {
        $s = new \Bloock\Signer();
        $s->setAlg($this->alg);
        $s->setArgs($this->args->toProto());
        return $s;
    }
}