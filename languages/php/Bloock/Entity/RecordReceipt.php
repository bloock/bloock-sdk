<?php

namespace Bloock\Entity;

class RecordReceipt
{
    private int $anchor;
    private string $client;
    private string $record;
    private string $status;

    public function __construct(int $anchor, string $client, string $record, string $status) {
        $this->anchor = $anchor;
        $this->client = $client;
        $this->record = $record;
        $this->status = $status;
    }

    public static function fromProto(\Bloock\RecordReceipt $receipt): RecordReceipt {
        return new RecordReceipt($receipt->getAnchor(), $receipt->getClient(), $receipt->getRecord(), $receipt->getStatus());
    }

    public function toProto(): \Bloock\RecordReceipt {
        $p = new \Bloock\RecordReceipt();
        $p->setAnchor($this->anchor);
        $p->setClient($this->client);
        $p->setRecord($this->record);
        $p->setStatus($this->status);
        return $p;
    }

    /**
     * @return int
     */
    public function getAnchor(): int
    {
        return $this->anchor;
    }

    /**
     * @return string
     */
    public function getClient(): string
    {
        return $this->client;
    }

    /**
     * @return string
     */
    public function getRecord(): string
    {
        return $this->record;
    }

    /**
     * @return string
     */
    public function getStatus(): string
    {
        return $this->status;
    }
}