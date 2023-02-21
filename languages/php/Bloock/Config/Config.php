<?php

namespace Bloock\Config;

use Bloock\Bloock;
use Bloock\ConfigData;
use Bloock\Configuration;

class Config
{
    public static function newConfigDataDefault(): ConfigData {
        $configuration = new Configuration();
        $configuration->setLibraryName("PHP");
        $configuration->setHost(Bloock::$apiHost);
        $configuration->setApiKey(Bloock::$apiKey);
        $configuration->setDisableAnalytics(Bloock::$disableAnalytics);

        $config = new ConfigData();
        $config->setConfig($configuration);
        $config->setNetworksConfig(Bloock::$networkConfig);

        return $config;
    }

    public static function newConfigData(ConfigData $configData): ConfigData {
        return $configData;
    }
}