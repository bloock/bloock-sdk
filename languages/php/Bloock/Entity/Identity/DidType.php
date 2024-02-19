<?php

namespace Bloock\Entity\Identity;

/**
 * Represents parameters used for generating DIDs.
 */
class DidType
{
    private ?string $method;
    private ?string $blockchain;
    private ?string $network;

    /**
     * Constructs a DidType object with the specified parameters.
     * @param string|null $method
     * @param string|null $blockchain
     * @param string|null $network
     */
    public function __construct(string $method = null, string $blockchain = null, string $network = null)
    {
        $this->method = $method;
        $this->blockchain = $blockchain;
        $this->network = $network;
    }

    public function toProto(): \Bloock\DidType
    {
        $s = new \Bloock\DidType();
        $s->setMethod(Method::toProto($this->method));
        $s->setBlockchain(Blockchain::toProto($this->blockchain));
        $s->setNetworkId(Network::toProto($this->network));

        return $s;
    }
}
