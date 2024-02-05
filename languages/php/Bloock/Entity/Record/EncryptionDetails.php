<?php

namespace Bloock\Entity\Record;

use Bloock\Entity\Encryption\EncryptionAlg;

/**
 * Represents details related to the encryption of a record, including algorithm, key, and subject.
 */
class EncryptionDetails
{
    private ?string $alg;
    private ?string $key;
    private ?string $subject;

    /**
     * Constructs a EncryptionDetails object with the specified parameters.
     * @param string|null $alg
     * @param string|null $key
     * @param string|null $subject
     */
    public function __construct(?string $alg, ?string $key, ?string $subject)
    {
        $this->alg = $alg;
        $this->key = $key;
        $this->subject = $subject;
    }

    /**
     * Gets the algorithm of the encryption.
     * @return string|null
     */
    public function getAlg(): ?string
    {
        return $this->alg;
    }

    /**
     * Gets the public key of the encryption.
     * @return string|null
     */
    public function getKey(): ?string
    {
        return $this->key;
    }

    /**
     * Gets the subject of the subject.
     * @return string|null
     */
    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public static function fromProto(\Bloock\EncryptionDetails $details): EncryptionDetails
    {
        $alg = null;
        if ($details->hasAlg()) {
            $alg = $details->getAlg();
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
