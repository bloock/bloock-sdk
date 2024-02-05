<?php

namespace Bloock\Entity\Integrity;

use Google\Protobuf\Internal\RepeatedField;

/**
 * Represents information about an anchor.
 */
class Anchor
{
    private int $id;
    private RepeatedField $blockRoots;
    private RepeatedField $networks;
    private string $root;
    private string $status;

    /**
     * Constructs an Anchor object with the specified parameters.
     * @param int $id
     * @param RepeatedField $blockRoots
     * @param RepeatedField $networks
     * @param string $root
     * @param string $status
     */
    public function __construct(int $id, RepeatedField $blockRoots, RepeatedField $networks, string $root, string $status)
    {
        $this->id = $id;
        $this->blockRoots = $blockRoots;
        $this->networks = $networks;
        $this->root = $root;
        $this->status = $status;
    }

    public static function fromProto(\Bloock\Anchor $anchor): Anchor
    {
        return new Anchor($anchor->getId(), $anchor->getBlockRoots(), $anchor->getNetworks(), $anchor->getRoot(), $anchor->getStatus());
    }

    /**
     * Gets id from the anchor.
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Gets block roots from the anchor.
     * @return RepeatedField
     */
    public function getBlockRoots(): RepeatedField
    {
        return $this->blockRoots;
    }

    /**
     * Gets networks from the anchor.
     * @return RepeatedField
     */
    public function getNetworks(): RepeatedField
    {
        return $this->networks;
    }

    /**
     * Gets root from the anchor.
     * @return string
     */
    public function getRoot(): string
    {
        return $this->root;
    }

    /**
     * Get status from the anchor.
     * @return string
     */
    public function getStatus(): string
    {
        return $this->status;
    }

    public function toProto(): \Bloock\Anchor
    {
        $p = new \Bloock\Anchor();
        $p->setId($this->id);
        $p->setBlockRoots($this->blockRoots);

        $n = [];
        foreach ($this->networks->getIterator() as $network) {
            $n[] = $network->toProto();
        }
        $p->setNetworks($n);
        return $p;
    }
}