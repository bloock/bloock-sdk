<?php

namespace Bloock\Entity\IdentityV2;

class IssuerStateReceipt
{
    private string $txHash;

    /**
     * @param string $txHash
     */
    public function __construct(string $txHash)
    {
        $this->txHash = $txHash;
    }

    public static function fromProto(\Bloock\IssuerStateReceipt $res): IssuerStateReceipt
    {
        return new IssuerStateReceipt($res->getTxHash());
    }

    /**
     * @return string
     */
    public function getTxHash(): string
    {
        return $this->txHash;
    }

    public function toProto(): \Bloock\IssuerStateReceipt
    {
        $p = new \Bloock\IssuerStateReceipt();
        $p->setTxHash($this->txHash);
        return $p;
    }
}