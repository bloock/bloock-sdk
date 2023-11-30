<?php

namespace Bloock\Entity\Record;

use Bloock\Entity\Encryption\EncryptionAlg;

class EncryptionDetails
{
    private ?string $alg;
    private ?string $key;
    private ?string $subject;

    public function __construct(?string $alg, ?string $key, ?string $subject)
    {
        $this->alg = $alg;
        $this->key = $key;
        $this->subject = $subject;
    }

    /**
     * @return string
     */
    public function getAlg(): ?string
    {
        return $this->alg;
    }

    /**
     * @return string
     */
    public function getKey(): ?string
    {
        return $this->key;
    }

    /**
     * @return string
     */
    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public static function fromProto(\Bloock\EncryptionDetails $details): EncryptionDetails
    {
        $alg = null;
        if ($details->hasAlg()) {
            $alg = EncryptionAlg::fromProto($details->getAlg());
        }

        $key = null;
        if ($details->hasKey()) {
            $key = $details->getKey();
        }

        $subject = null;
        if ($details->hasSubject()) {
            $subject = $details->getSubject();
        }
        return new EncryptionDetails($alg, $key, $subject);
    }

    public function toProto(): \Bloock\EncryptionDetails
    {
        $p = new \Bloock\EncryptionDetails();
        $p->setAlg($this->alg);
        $p->setKey($this->key);
        $p->setSubject($this->subject);
        return $p;
    }
}
