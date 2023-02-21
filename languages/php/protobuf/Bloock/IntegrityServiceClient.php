<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class IntegrityServiceClient extends \Bloock\Bridge\Connection {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\SendRecordsRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function SendRecords(\Bloock\SendRecordsRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IntegrityService/SendRecords',
        $argument,
        ['\Bloock\SendRecordsResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetAnchorRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetAnchor(\Bloock\GetAnchorRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IntegrityService/GetAnchor',
        $argument,
        ['\Bloock\GetAnchorResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\WaitAnchorRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function WaitAnchor(\Bloock\WaitAnchorRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IntegrityService/WaitAnchor',
        $argument,
        ['\Bloock\WaitAnchorResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetProofRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetProof(\Bloock\GetProofRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IntegrityService/GetProof',
        $argument,
        ['\Bloock\GetProofResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\ValidateRootRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function ValidateRoot(\Bloock\ValidateRootRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IntegrityService/ValidateRoot',
        $argument,
        ['\Bloock\ValidateRootResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\VerifyProofRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function VerifyProof(\Bloock\VerifyProofRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IntegrityService/VerifyProof',
        $argument,
        ['\Bloock\VerifyProofResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\VerifyRecordsRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function VerifyRecords(\Bloock\VerifyRecordsRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IntegrityService/VerifyRecords',
        $argument,
        ['\Bloock\VerifyRecordsResponse', 'decode'],
        $metadata, $options);
    }

}
