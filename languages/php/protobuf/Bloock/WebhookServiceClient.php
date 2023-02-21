<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class WebhookServiceClient extends \Bloock\Bridge\Connection {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\VerifyWebhookSignatureRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function VerifyWebhookSignature(\Bloock\VerifyWebhookSignatureRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.WebhookService/VerifyWebhookSignature',
        $argument,
        ['\Bloock\VerifyWebhookSignatureResponse', 'decode'],
        $metadata, $options);
    }

}
