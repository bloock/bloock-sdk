<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class RecordServiceClient extends \Bloock\Bridge\Connection {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\RecordBuilderFromStringRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function BuildRecordFromString(\Bloock\RecordBuilderFromStringRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/BuildRecordFromString',
        $argument,
        ['\Bloock\RecordBuilderResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\RecordBuilderFromHexRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function BuildRecordFromHex(\Bloock\RecordBuilderFromHexRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/BuildRecordFromHex',
        $argument,
        ['\Bloock\RecordBuilderResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\RecordBuilderFromJSONRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function BuildRecordFromJson(\Bloock\RecordBuilderFromJSONRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/BuildRecordFromJson',
        $argument,
        ['\Bloock\RecordBuilderResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\RecordBuilderFromFileRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function BuildRecordFromFile(\Bloock\RecordBuilderFromFileRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/BuildRecordFromFile',
        $argument,
        ['\Bloock\RecordBuilderResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\RecordBuilderFromBytesRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function BuildRecordFromBytes(\Bloock\RecordBuilderFromBytesRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/BuildRecordFromBytes',
        $argument,
        ['\Bloock\RecordBuilderResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\RecordBuilderFromRecordRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function BuildRecordFromRecord(\Bloock\RecordBuilderFromRecordRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/BuildRecordFromRecord',
        $argument,
        ['\Bloock\RecordBuilderResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\RecordBuilderFromLoaderRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function BuildRecordFromLoader(\Bloock\RecordBuilderFromLoaderRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/BuildRecordFromLoader',
        $argument,
        ['\Bloock\RecordBuilderResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetDetailsRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetDetails(\Bloock\GetDetailsRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/GetDetails',
        $argument,
        ['\Bloock\GetDetailsResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetHashRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetHash(\Bloock\GetHashRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/GetHash',
        $argument,
        ['\Bloock\GetHashResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetPayloadRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetPayload(\Bloock\GetPayloadRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/GetPayload',
        $argument,
        ['\Bloock\GetPayloadResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\SetProofRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function SetProof(\Bloock\SetProofRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.RecordService/SetProof',
        $argument,
        ['\Bloock\SetProofResponse', 'decode'],
        $metadata, $options);
    }

}
