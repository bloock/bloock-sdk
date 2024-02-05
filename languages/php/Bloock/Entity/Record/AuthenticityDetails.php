<?php

namespace Bloock\Entity\Record;

use Bloock\Entity\Authenticity\Signature;

/**
 * Represents details related to the authenticity of a record, including signatures.
 */
class AuthenticityDetails
{
    private array $signatures;

    /**
     * Constructs a AuthenticityDetails object with the specified parameters.
     * @param array $signatures
     */
    public function __construct(array $signatures)
    {
        $this->signatures = $signatures;
    }

    /**
     * Gets the signatures of the record.
     * @return array
     */
    public function getSignatures(): array
    {
        return $this->signatures;
    }

    public static function fromProto(\Bloock\AuthenticityDetails $details): AuthenticityDetails
    {
        $signatures = [];
        foreach ($details->getSignatures() as $signature) {
            $signatures[] = Signature::fromProto($signature);
        }
        return new AuthenticityDetails($signatures);
    }

    public function toProto(): \Bloock\AuthenticityDetails
    {
        $p = new \Bloock\AuthenticityDetails();

        $signatures = [];
        foreach ($this->signatures as $signature) {
            $signatures[] = $signature->toProto();
        }
        $p->setSignatures($signatures);
        return $p;
    }
}
