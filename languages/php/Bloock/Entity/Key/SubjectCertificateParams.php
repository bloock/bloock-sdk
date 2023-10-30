<?php

namespace Bloock\Entity\Key;

class SubjectCertificateParams
{
    public string $commonName;
    public ?string $organization;
    public ?string $organizationUnit;
    public ?string $location;
    public ?string $state;
    public ?string $country;

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
