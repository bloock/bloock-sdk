<?php

namespace Bloock\Entity\Availability;

use Exception;
use Bloock\Entity\Key\LocalKey;
use Bloock\Entity\Key\ManagedKey;
use Bloock\Entity\Key\LocalCertificate;
use Bloock\Entity\Key\ManagedCertificate;
use Bloock\Entity\Authenticity\HashAlg;
use Bloock\Entity\Key\AccessControl;

/**
 * Represents an object with various key types.
 */
class IpnsKey
{
    public ?ManagedKey $managedKey = null;
    public ?ManagedCertificate $managedCertificate = null;

    /**
     * Creates an IpnsKey instance with a managed key.
     * @param $key
     * @throws Exception
     */
    public function __construct($key)
    {
        if ($key instanceof ManagedKey) {
            $this->managedKey = $key;
        } else if ($key instanceof ManagedCertificate) {
            $this->managedCertificate = $key;
        } else {
            throw new Exception("Invalid key provided");
        }
    }

    public function toProto(): \Bloock\IpnsKey
    {
        $s = new \Bloock\IpnsKey();

        if ($this->managedKey != null) {
            $s->setManagedKey($this->managedKey->toProto());
        }

        if ($this->managedCertificate != null) {
            $s->setManagedCertificate($this->managedCertificate->toProto());
        }

        return $s;
    }
}