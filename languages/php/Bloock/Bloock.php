<?php

namespace Bloock;

/**
 * Provides a centralized configuration for the Bloock SDK library. For information about Bloock SDK in Go, see https://bloock.com.
 */
class Bloock
{
    /**
     * Is a string variable representing the API key used for authentication with the Bloock SDK, create [here](https://dashboard.bloock.com/login).
     * @var string
     */
    public static string $apiKey = "";
    /**
     * Is a string variable used to force a specific environment configuration, it allows developers to set a predefined environment for the Bloock SDK.
     * @var string
     */
    public static string $forceEnv = "";
    /**
     * Is a string variable representing the host URL used for Identity Managed API, required to be set for identity-related features of the Bloock SDK.
     * @var string
     */
    public static string $identityApiHost = "";
    /**
     * Is a string variable representing the host URL used for API communication with the Bloock SDK.
     * @var string
     */
    public static string $apiHost = "";
    /**
     * Is a boolean variable that, when set to true, disables the analytics feature in the Bloock SDK.
     * @var bool
     */
    public static bool $disableAnalytics = false;
    /**
     * Is an array variable that holds network configurations associated with specific network IDs in the Bloock SDK.
     * @var array
     */
    public static array $networkConfig = [];

    /**
     * Sets the HTTP provider for the specified network in the Bloock SDK configuration.
     * @param Network $network
     * @param string $provider
     * @return void
     */
    public static function setProvider(Network $network, string $provider)
    {
        if (Bloock::$networkConfig[Network::value($network)] != null) {
            Bloock::$networkConfig[Network::value($network)] =
                Bloock::$networkConfig[Network::value($network)]->setHttpProvider($provider);
        } else {
            $n = new NetworkConfig();
            $n->setHttpProvider($provider);
            Bloock::$networkConfig[Network::value($network)] = $n;
        }
    }

    /**
     * Sets the contract address for the specified network in the Bloock SDK configuration.
     * @param Network $network
     * @param string $contractAddress
     * @return void
     */
    public static function setContractAddress(Network $network, string $contractAddress)
    {
        if (Bloock::$networkConfig[Network::value($network)] != null) {
            Bloock::$networkConfig[Network::value($network)] =
                Bloock::$networkConfig[Network::value($network)]->setContractAddress($contractAddress);
        } else {
            $n = new NetworkConfig();
            $n->setContractAddress($contractAddress);
            Bloock::$networkConfig[Network::value($network)] = $n;
        }
    }
}