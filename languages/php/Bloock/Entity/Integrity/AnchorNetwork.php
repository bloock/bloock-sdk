<?php

namespace Bloock\Entity\Integrity;

class AnchorNetwork
{
    private string $name;
    private string $state;
    private string $txHash;
    private ?string $root;

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
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getState(): string
    {
        return $this->state;
    }

    /**
     * @return string
     */
    public function getTxHash(): string
    {
        return $this->txHash;
    }

    /**
     * @return ?string
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
