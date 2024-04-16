<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class IdentityCoreServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\CreateCoreCredentialRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function CreateCoreCredential(\Bloock\CreateCoreCredentialRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityCoreService/CreateCoreCredential',
        $argument,
        ['\Bloock\CreateCoreCredentialResponse', 'decode'],
        $metadata, $options);
    }

}
