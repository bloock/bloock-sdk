<?php

namespace Bloock\Entity\Integrity;

/**
 * Represents a proof anchor.
 */
class ProofAnchor
{
    private int $anchorId;
    private array $networks;
    private string $root;
    private string $status;

    /**
     * Constructs a ProofAnchor object with the specified parameters.
     * @param int $anchorId
     * @param array $networks
     * @param string $root
     * @param string $status
     */
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
     * Gets the networks of the anchor proof
     * @return array
     */
    public function getNetworks(): array
    {
        return $this->networks;
    }

    /**
     * Gets the anchor id of the anchor proof.
     * @return int
     */
    public function getAnchorId(): int
    {
        return $this->anchorId;
    }

    /**
     * Gets the root of the anchor proof.
     * @return string
     */
    public function getRoot(): string
    {
        return $this->root;
    }

    /**
     * Gets the status of the anchor proof.
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