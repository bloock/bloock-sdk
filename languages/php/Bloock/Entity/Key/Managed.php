<?php

namespace Bloock\Entity\Key;

use Exception;

class Managed
{
    public ?ManagedKey $managedKey = null;
    public ?ManagedCertificate $managedCertificate = null;

    /**
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
