<?php

namespace Bloock\Entity\Integrity;

class Proof
{
    private array $leaves;
    private array $nodes;
    private string $depth;
    private string $bitmap;
    private ProofAnchor $anchor;

    public function __construct(array $leaves, array $nodes, string $depth, string $bitmap, ProofAnchor $anchor)
    {
        $this->leaves = $leaves;
        $this->nodes = $nodes;
        $this->depth = $depth;
        $this->bitmap = $bitmap;
        $this->anchor = $anchor;
    }

    public static function fromProto(\Bloock\Proof $proof): Proof
    {
        $leaves = [];
        foreach ($proof->getLeaves()->getIterator() as $item) {
            $leaves[] = $item;
        }

        $nodes = [];
        foreach ($proof->getNodes()->getIterator() as $item) {
            $nodes[] = $item;
        }
        return new Proof($leaves, $nodes, $proof->getDepth(), $proof->getBitmap(), ProofAnchor::fromProto($proof->getAnchor()));
    }

    /**
     * @return array
     */
    public function getLeaves(): array
    {
        return $this->leaves;
    }

    /**
     * @return array
     */
    public function getNodes(): array
    {
        return $this->nodes;
    }

    /**
     * @return string
     */
    public function getDepth(): string
    {
        return $this->depth;
    }

    /**
     * @return string
     */
    public function getBitmap(): string
    {
        return $this->bitmap;
    }

    /**
     * @return ProofAnchor
     */
    public function getAnchor(): ProofAnchor
    {
        return $this->anchor;
    }

    public function toProto(): \Bloock\Proof
    {
        $p = new \Bloock\Proof();
        $p->setLeaves($this->leaves);
        $p->setNodes($this->nodes);
        $p->setDepth($this->depth);
        $p->setBitmap($this->bitmap);
        $p->setAnchor($this->anchor->toProto());
        return $p;
    }
}