<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\VerifyWebhookSignatureRequest;
use Exception;

/**
 * Provides functionality for interacting with [Bloock webhooks](https://dashboard.bloock.com/login).
 */
class WebhookClient
{
    private $bridge;
    private $config;

    /**
     * Creates a new WebhookClient with the provided configuration.
     * @param ConfigData|null $config
     */
    public function __construct(?ConfigData $config = null)
    {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }
    }

    /**
     * Verifies the signature of a webhook payload using the provided parameters.
     * @param string $payload
     * @param string $header
     * @param string $secretKey
     * @param bool $enforceTolerance
     * @return bool
     * @throws Exception
     */
    public function verifyWebhookSignature(string $payload, string $header, string $secretKey, bool $enforceTolerance): bool
    {
        $req = new VerifyWebhookSignatureRequest();
        $req->setConfigData($this->config)
            ->setPayload($payload)
            ->setHeader($header)
            ->setSecretKey($secretKey)
            ->setEnforceTolerance($enforceTolerance);

        $res = $this->bridge->webhook->VerifyWebhookSignature($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return $res->getIsValid();
    }
}