<?php

namespace Bloock\Entity\Authenticity;

use Exception;
use Bloock\Entity\Key\LocalKey;
use Bloock\Entity\Key\ManagedKey;
use Bloock\Entity\Key\LocalCertificate;
use Bloock\Entity\Key\ManagedCertificate;
use Bloock\Entity\Authenticity\HashAlg;

class Signer
{
    public ?LocalKey $localKey = null;
    public ?ManagedKey $managedKey = null;
    public ?ManagedCertificate $managedCertificate = null;
    public ?LocalCertificate $localCertificate = null;

    public ?string $hashAlg = null;

    /**
     * @throws Exception
     */
    public function __construct($key, ?string $hashAlg = null)
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

        if ($hashAlg != null) {
            $this->hashAlg = $hashAlg;
        }
    }

    public function toProto(): \Bloock\Signer
    {
        $s = new \Bloock\Signer();

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

        if ($this->hashAlg != null) {
            $s->setHashAlg(HashAlg::toProto($this->hashAlg));
        }

        return $s;
    }
}
