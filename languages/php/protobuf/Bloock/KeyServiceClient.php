<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class KeyServiceClient extends \Bloock\Bridge\Connection {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\GenerateLocalKeyRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GenerateLocalKey(\Bloock\GenerateLocalKeyRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.KeyService/GenerateLocalKey',
        $argument,
        ['\Bloock\GenerateLocalKeyResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GenerateManagedKeyRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GenerateManagedKey(\Bloock\GenerateManagedKeyRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.KeyService/GenerateManagedKey',
        $argument,
        ['\Bloock\GenerateManagedKeyResponse', 'decode'],
        $metadata, $options);
    }

}
