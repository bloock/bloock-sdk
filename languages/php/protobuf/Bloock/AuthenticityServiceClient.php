<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class AuthenticityServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\SignRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function Sign(\Bloock\SignRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.AuthenticityService/Sign',
        $argument,
        ['\Bloock\SignResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\VerifyRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function Verify(\Bloock\VerifyRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.AuthenticityService/Verify',
        $argument,
        ['\Bloock\VerifyResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetSignaturesRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function GetSignatures(\Bloock\GetSignaturesRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.AuthenticityService/GetSignatures',
        $argument,
        ['\Bloock\GetSignaturesResponse', 'decode'],
        $metadata, $options);
    }

}
