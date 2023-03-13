<?php

namespace Bloock\Entity\Identity;

class CredentialReceipt
{
    private string $id;
    private int $anchorId;

    /**
     * @param string $id
     * @param int $anchorId
     */
    public function __construct(string $id, int $anchorId)
    {
        $this->id = $id;
        $this->anchorId = $anchorId;
    }

    public static function fromProto(\Bloock\CredentialReceipt $res): CredentialReceipt
    {
        return new CredentialReceipt($res->getId(), $res->getAnchorId());
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return int
     */
    public function getAnchorId(): int
    {
        return $this->anchorId;
    }

    public function toProto(): \Bloock\CredentialReceipt
    {
        $p = new \Bloock\CredentialReceipt();
        $p->setId($this->id);
        $p->setAnchorId($this->anchorId);
        return $p;
    }
}