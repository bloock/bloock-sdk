<?php

namespace Bloock\Entity\Integrity;

class ProofAnchor
{
    private int $anchorId;
    private array $networks;
    private string $root;
    private string $status;

    public function __construct(int $anchorId, array $networks, string $root, string $status)
    {
        $this->anchorId = $anchorId;
        $this->networks = $networks;
        $this->root = $root;
        $this->status = $status;
    }

    public static function fromProto(\Bloock\ProofAnchor $proofAnchor): ProofAnchor
    {
        $networks = [];
        foreach ($proofAnchor->getNetworks() as $network) {
            $networks[] = AnchorNetwork::fromProto($network);
        }
        return new ProofAnchor($proofAnchor->getAnchorId(), $networks, $proofAnchor->getRoot(), $proofAnchor->getStatus());
    }

    /**
     * @return array
     */
    public function getNetworks(): array
    {
        return $this->networks;
    }

    /**
     * @return int
     */
    public function getAnchorId(): int
    {
        return $this->anchorId;
    }

    /**
     * @return string
     */
    public function getRoot(): string
    {
        return $this->root;
    }

    /**
     * @return string
     */
    public function getStatus(): string
    {
        return $this->status;
    }

    public function toProto(): \Bloock\ProofAnchor
    {
        $p = new \Bloock\ProofAnchor();
        $p->setAnchorId($this->anchorId);
        $p->setRoot($this->root);
        $p->setStatus($this->status);

        $networks = [];
        foreach ($this->networks as $network) {
            $networks[] = $network->toProto();
        }
        $p->setNetworks($networks);
        return $p;
    }
}