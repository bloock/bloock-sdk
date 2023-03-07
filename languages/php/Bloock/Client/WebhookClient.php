<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\VerifyWebhookSignatureRequest;
use Exception;

class WebhookClient
{
    private $bridge;
    private $config;

    public function __construct(ConfigData $config = null)
    {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }
    }

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