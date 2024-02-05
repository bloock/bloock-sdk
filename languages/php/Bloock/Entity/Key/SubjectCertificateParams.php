<?php

namespace Bloock\Entity\Key;

/**
 * Represents parameters for generating a subject certificate.
 */
class SubjectCertificateParams
{
    /**
     * Is the common name (CN) for the certificate. Required.
     * @var string
     */
    public string $commonName;
    /**
     * Is the organization (O) for the certificate. (Optional)
     * @var string|null
     */
    public ?string $organization;
    /**
     * Is the organizational unit (OU) for the certificate. (Optional)
     * @var string|null
     */
    public ?string $organizationUnit;
    /**
     * Is the location (L) for the certificate. (Optional)
     * @var string|null
     */
    public ?string $location;
    /**
     * Is the state or province (ST) for the certificate. (Optional)
     * @var string|null
     */
    public ?string $state;
    /**
     * Is the country (C) for the certificate. (Optional)
     * @var string|null
     */
    public ?string $country;

    /**
     * Constructs a SubjectCertificateParams object with the specified parameters.
     * @param string $commonName
     * @param string|null $organization
     * @param string|null $organizationUnit
     * @param string|null $location
     * @param string|null $state
     * @param string|null $country
     */
    public function __construct(string $commonName, string $organization = null, string $organizationUnit = null, string $location = null, string $state = null, string $country = null)
    {
        $this->commonName = $commonName;
        $this->organization = $organization;
        $this->organizationUnit = $organizationUnit;
        $this->location = $location;
        $this->state = $state;
        $this->country = $country;
    }

    public static function fromProto(\Bloock\CertificateSubject $res): SubjectCertificateParams
    {
        return new SubjectCertificateParams(
            $res->getCommonName(),
            $res->getOrganization(),
            $res->getOrganizationalUnit(),
            $res->getLocation(),
            $res->getState(),
            $res->getCountry(),
        );
    }

    public function toProto(): \Bloock\CertificateSubject
    {
        $p = new \Bloock\CertificateSubject();

        if ($this->commonName != null) {
            $p->setCommonName($this->commonName);
        }

        if ($this->organization != null) {
            $p->setOrganization($this->organization);
        }

        if ($this->organizationUnit != null) {
            $p->setOrganizationalUnit($this->organizationUnit);
        }

        if ($this->location != null) {
            $p->setLocation($this->location);
        }

        if ($this->state != null) {
            $p->setState($this->state);
        }

        if ($this->country != null) {
            $p->setCountry($this->country);
        }

        return $p;
    }
}
