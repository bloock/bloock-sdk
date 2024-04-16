<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class EncryptionServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\EncryptRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function Encrypt(\Bloock\EncryptRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.EncryptionService/Encrypt',
        $argument,
        ['\Bloock\EncryptResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\DecryptRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function Decrypt(\Bloock\DecryptRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.EncryptionService/Decrypt',
        $argument,
        ['\Bloock\DecryptResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\EncryptionAlgRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function GetEncryptionAlg(\Bloock\EncryptionAlgRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.EncryptionService/GetEncryptionAlg',
        $argument,
        ['\Bloock\EncryptionAlgResponse', 'decode'],
        $metadata, $options);
    }

}
