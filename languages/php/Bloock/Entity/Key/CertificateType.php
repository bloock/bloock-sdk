<?php

namespace Bloock\Entity\Key;

/**
 * Represents the type of certificate.
 */
class CertificateType
{
    const PEM = "PEM";
    const PFX = "PFX";
    const UNRECOGNIZED = "UNRECOGNIZED";

    public static function toProto(string $type): int
    {
        switch ($type) {
            case CertificateType::PEM:
                return \Bloock\CertificateType::PEM;
            case CertificateType::PFX:
                return \Bloock\CertificateType::PFX;
            default:
                return \Bloock\CertificateType::PEM;
        }
    }

    public static function fromProto(int $type): string
    {
        switch ($type) {
            case \Bloock\CertificateType::PEM:
                return CertificateType::PEM;
            case \Bloock\CertificateType::PFX:
                return CertificateType::PFX;
            default:
                return CertificateType::UNRECOGNIZED;
        }
    }
}
