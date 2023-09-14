<?php

namespace Bloock\Entity\Authenticity;

use Bloock\Entity\Key\LocalKey;
use Bloock\Entity\Key\ManagedCertificate;
use Bloock\Entity\Key\ManagedKey;
use Exception;

class SignerArgs
{
    public ?LocalKey $localKey = null;
    public ?ManagedKey $managedKey = null;
    public ?ManagedCertificate $managedCertificate = null;
    public string $commonName;

    /**
     * @throws Exception
     */
    public function __construct($key, string $commonName = "")
    {
        if ($key instanceof LocalKey) {
            $this->localKey = $key;
        } else if ($key instanceof ManagedKey) {
            $this->managedKey = $key;
        } else if ($key instanceof ManagedCertificate) {
            $this->managedCertificate = $key;
        } else {
            throw new Exception("Invalid $key provided. Must be of type LocalKey or ManagedKey");
        }

        $this->commonName = $commonName;
    }
}
