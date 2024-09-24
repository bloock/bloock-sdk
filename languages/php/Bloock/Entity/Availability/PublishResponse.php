<?php

namespace Bloock\Entity\Availability;

use Exception;

/**
 * Represents an object with a the publish response attributes.
 */
class PublishResponse
{
    public string $id;
    public ?IpnsKey $ipnsKey = null;

    /**
     * Constructs a PublishResponse object with the specified parameters.
     * @param $id
     * @param $ipnsKey
     * @throws Exception
     */
    public function __construct(string $id, ?IpnsKey $ipnsKey = null)
    {
        $this->id = $id;
        $this->ipnsKey = $ipnsKey; 
    }

    public static function fromProto(\Bloock\PublishResponse $res): PublishResponse
    {
        return new PublishResponse($res->getId(), IpnsKey::fromProto($res->getIpnsKey()));
    }
}