<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\Identity\CredentialCoreBuilder;
use Bloock\Entity\Identity\Issuer;

/**
 * Represents a client for interacting with the [Bloock Identity service](https://dashboard.bloock.com/login).
 */
class IdentityCoreClient
{
    private $bridge;
    private $config;

    /**
     * Creates a new instance of the IdentityCoreClient with the provided configuration.
     * @param ConfigData|null $config
     */
    public function __construct(ConfigData $config = null)
    {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }
    }

    /**
     * Creates a new credential builder for defining a credential on the Bloock Identity service.
     * @param Issuer $issuer
     * @param string $schemaId
     * @param string $holderDid
     * @param int $expiration
     * @param int $version
     * @return CredentialCoreBuilder
     */
    public function buildCredential(Issuer $issuer, string $schemaId, string $holderDid, int $expiration, int $version): CredentialCoreBuilder
    {
        return new CredentialCoreBuilder($issuer, $schemaId, $holderDid, $expiration, $version, $this->config);
    }
}
