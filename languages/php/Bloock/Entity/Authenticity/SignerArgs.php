<?php

namespace Bloock\Entity\Authenticity;

class SignerArgs
{
    public string $privateKey;
    public string $commonName;

    public function __construct(string $privateKey, string $commonName = "")
    {
        $this->privateKey = $privateKey;
        $this->commonName = $commonName;
    }

    public function toProto(): \Bloock\SignerArgs
    {
        $p = new \Bloock\SignerArgs();
        $p->setPrivateKey($this->privateKey);

        if ($this->commonName != "") {
            $p->setCommonName($this->commonName);
        }

        return $p;
    }
}