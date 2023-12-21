<?php

namespace Bloock\Entity\IdentityV2;

class DidParams
{
    private string $method;
    private string $blockchain;
    private string $network;

    public function __construct(string $method = null, string $blockchain = null, string $network = null)
    {
        $this->method = $method;
        $this->blockchain = $blockchain;
        $this->network = $network;
    }

    public function toProto(): \Bloock\DidParams
    {
        $s = new \Bloock\DidParams();
        $s->setMethod(Method::toProto($this->method));
        $s->setBlockchain(Blockchain::toProto($this->blockchain));
        $s->setNetworkId(Network::toProto($this->network));

        return $s;
    }
}
