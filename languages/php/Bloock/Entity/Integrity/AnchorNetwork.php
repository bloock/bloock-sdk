<?php

namespace Bloock\Entity\Integrity;

/**
 * Represents information about an anchor network.
 */
class AnchorNetwork
{
    private string $name;
    private string $state;
    private string $txHash;
    private ?string $root;

    /**
     * Constructs an AnchorNetwork object with the specified parameters.
     * @param string $name
     * @param string $state
     * @param string $txHash
     * @param string|null $root
     */
    public function __construct(string $name, string $state, string $txHash, ?string $root)
    {
        $this->name = $name;
        $this->state = $state;
        $this->txHash = $txHash;
        $this->root = $root;
    }

    public static function fromProto(\Bloock\AnchorNetwork $network): AnchorNetwork
    {
        return new AnchorNetwork($network->getName(), $network->getState(), $network->getTxHash(), $network->getRoot());
    }

    /**
     * Gets name of the anchor network.
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Gets state of the anchor network.
     * @return string
     */
    public function getState(): string
    {
        return $this->state;
    }

    /**
     * Gets transaction hash of the anchor network.
     * @return string
     */
    public function getTxHash(): string
    {
        return $this->txHash;
    }

    /**
     * Gets root of the anchor network.
     * @return string
     */
    public function getRoot(): string
    {
        return $this->root;
    }

    public function toProto(): \Bloock\AnchorNetwork
    {
        $p = new \Bloock\AnchorNetwork();
        $p->setName($this->name);
        $p->setState($this->state);
        $p->setTxHash($this->txHash);
        $p->setRoot($this->root);
        return $p;
    }
}
