<?php

namespace Bloock\Entity\Key;

use Exception;

/**
 * Represents a managed entity that can be either a ManagedKey or a ManagedCertificate.
 */
class Managed
{
    public ?ManagedKey $managedKey = null;
    public ?ManagedCertificate $managedCertificate = null;

    /**
     * Constructs a Managed object for a given managed key or managed certificate object.
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
}
