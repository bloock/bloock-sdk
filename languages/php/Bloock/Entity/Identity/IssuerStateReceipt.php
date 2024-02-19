<?php

namespace Bloock\Entity\Identity;

/**
 * Represents a receipt for the issuer's state.
 */
class IssuerStateReceipt
{
    private string $txHash;

    /**
     * Constructs an IssuerStateReceipt object with the specified parameters.
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
     * Gets the transaction hash of the issuer state receipt.
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