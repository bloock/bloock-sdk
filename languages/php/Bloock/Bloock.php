<?php

namespace Bloock;

class Bloock
{
    public static string $apiKey = "";
    public static string $apiHost = "";
    public static bool $disableAnalytics = false;
    public static array $networkConfig = [];

    public static function setProvider(Network $network, string $provider) {
        if (Bloock::$networkConfig[Network::value($network)] != null) {
            Bloock::$networkConfig[Network::value($network)] =
                Bloock::$networkConfig[Network::value($network)]->setHttpProvider($provider);
        } else {
            $n = new NetworkConfig();
            $n->setHttpProvider($provider);
            Bloock::$networkConfig[Network::value($network)] = $n;
        }
    }

    public static function setContractAddress(Network $network, string $contractAddress) {
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