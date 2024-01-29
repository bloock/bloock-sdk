<?php

namespace Bloock\Entity\Encryption;

use Bloock\Entity\Key\AccessControl;
use Exception;
use Bloock\Entity\Key\LocalKey;
use Bloock\Entity\Key\ManagedKey;
use Bloock\Entity\Key\LocalCertificate;
use Bloock\Entity\Key\ManagedCertificate;

class Encrypter
{
    public ?LocalKey $localKey = null;
    public ?ManagedKey $managedKey = null;
    public ?ManagedCertificate $managedCertificate = null;
    public ?LocalCertificate $localCertificate = null;
    public ?AccessControl $accessControl = null;

    /**
     * @throws Exception
     */
    public function __construct($key, ?AccessControl $accessControl = null)
    {
        if ($key instanceof LocalKey) {
            $this->localKey = $key;
        } else if ($key instanceof ManagedKey) {
            $this->managedKey = $key;
        } else if ($key instanceof ManagedCertificate) {
            $this->managedCertificate = $key;
        } else if ($key instanceof LocalCertificate) {
            $this->localCertificate = $key;
        } else {
            throw new Exception("Invalid key provided");
        }

        if ($accessControl != null) {
            $this->accessControl = $accessControl;
        }
    }

    public function toProto(): \Bloock\Encrypter
    {
        $s = new \Bloock\Encrypter();

        if ($this->localKey != null) {
            $s->setLocalKey($this->localKey->toProto());
        }

        if ($this->managedKey != null) {
            $s->setManagedKey($this->managedKey->toProto());
        }

        if ($this->managedCertificate != null) {
            $s->setManagedCertificate($this->managedCertificate->toProto());
        }

        if ($this->localCertificate != null) {
            $s->setLocalCertificate($this->localCertificate->toProto());
        }

        if ($this->accessControl != null) {
            $s->setAccessControl($this->accessControl->toProto());
        }

        return $s;
    }
}
