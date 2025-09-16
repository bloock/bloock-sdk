<?php

namespace Bloock\Entity\Availability;

use Exception;

/**
 * Represents an object with a key uuid identifier.
 */
class IpnsKey
{
    public string $keyID;

    /**
     * Creates an IpnsKey instance with a key uuid identifier.
     * @param $keyID
     * @throws Exception
     */
    public function __construct($keyID)
    {
        $this->keyID = $keyID;
    }

    public function toProto(): \Bloock\IpnsKey
    {
        $s = new \Bloock\IpnsKey();
        $s->setKeyId($this->keyID);
        return $s;
    }

    public static function fromProto(?\Bloock\IpnsKey $ipnsKey = null): ?IpnsKey
    {
        if ($ipnsKey != null) {
            return new IpnsKey($ipnsKey->getKeyId());
        }
        return null;       
    }
}