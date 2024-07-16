<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class AvailabilityServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\PublishRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function Publish(\Bloock\PublishRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.AvailabilityService/Publish',
        $argument,
        ['\Bloock\PublishResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\RetrieveRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function Retrieve(\Bloock\RetrieveRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.AvailabilityService/Retrieve',
        $argument,
        ['\Bloock\RetrieveResponse', 'decode'],
        $metadata, $options);
    }

}
