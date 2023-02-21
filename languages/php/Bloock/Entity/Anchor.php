<?php

namespace Bloock\Entity;

use Google\Protobuf\Internal\RepeatedField;

class Anchor
{
    private int $id;
    private RepeatedField $blockRoots;
    private RepeatedField $networks;
    private string $root;
    private string $status;

    public function __construct(int $id, RepeatedField $blockRoots, RepeatedField $networks, string $root, string $status) {
        $this->id = $id;
        $this->blockRoots = $blockRoots;
        $this->networks = $networks;
        $this->root = $root;
        $this->status = $status;
    }

    public static function fromProto(\Bloock\Anchor $anchor): Anchor {
        return new Anchor($anchor->getId(), $anchor->getBlockRoots(), $anchor->getNetworks(), $anchor->getRoot(), $anchor->getStatus());
    }

    public function toProto(): \Bloock\Anchor {
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

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return RepeatedField
     */
    public function getBlockRoots(): RepeatedField
    {
        return $this->blockRoots;
    }

    /**
     * @return RepeatedField
     */
    public function getNetworks(): RepeatedField
    {
        return $this->networks;
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
}