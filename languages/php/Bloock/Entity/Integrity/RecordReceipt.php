<?php

namespace Bloock\Entity\Integrity;

/**
 * Represents a receipt for a record, including anchor ID, client, record, and status information.
 */
class RecordReceipt
{
    private int $anchor;
    private string $client;
    private string $record;
    private string $status;

    /**
     * Constructs a RecordReceipt object with the specified parameters.
     * @param int $anchor
     * @param string $client
     * @param string $record
     * @param string $status
     */
    public function __construct(int $anchor, string $client, string $record, string $status)
    {
        $this->anchor = $anchor;
        $this->client = $client;
        $this->record = $record;
        $this->status = $status;
    }

    public static function fromProto(\Bloock\RecordReceipt $receipt): RecordReceipt
    {
        return new RecordReceipt($receipt->getAnchor(), $receipt->getClient(), $receipt->getRecord(), $receipt->getStatus());
    }

    /**
     * Gets the anchor of the record receipt.
     * @return int
     */
    public function getAnchor(): int
    {
        return $this->anchor;
    }

    /**
     * Gets the client of the record receipt.
     * @return string
     */
    public function getClient(): string
    {
        return $this->client;
    }

    /**
     * Gets the record of the record receipt.
     * @return string
     */
    public function getRecord(): string
    {
        return $this->record;
    }

    /**
     * Gets the status of the record receipt.
     * @return string
     */
    public function getStatus(): string
    {
        return $this->status;
    }

    public function toProto(): \Bloock\RecordReceipt
    {
        $p = new \Bloock\RecordReceipt();
        $p->setAnchor($this->anchor);
        $p->setClient($this->client);
        $p->setRecord($this->record);
        $p->setStatus($this->status);
        return $p;
    }
}