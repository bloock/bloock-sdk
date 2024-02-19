<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class IdentityServiceClient extends \Bloock\Bridge\Connection {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\CreateHolderRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CreateHolder(\Bloock\CreateHolderRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CreateHolder',
        $argument,
        ['\Bloock\CreateHolderResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CreateIssuerRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CreateIssuer(\Bloock\CreateIssuerRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CreateIssuer',
        $argument,
        ['\Bloock\CreateIssuerResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\ImportIssuerRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function ImportIssuer(\Bloock\ImportIssuerRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/ImportIssuer',
        $argument,
        ['\Bloock\ImportIssuerResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\BuildSchemaRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function BuildSchema(\Bloock\BuildSchemaRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/BuildSchema',
        $argument,
        ['\Bloock\BuildSchemaResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetSchemaRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetSchema(\Bloock\GetSchemaRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/GetSchema',
        $argument,
        ['\Bloock\GetSchemaResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CreateCredentialRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CreateCredential(\Bloock\CreateCredentialRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CreateCredential',
        $argument,
        ['\Bloock\CreateCredentialResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetCredentialProofRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetCredentialProof(\Bloock\GetCredentialProofRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/GetCredentialProof',
        $argument,
        ['\Bloock\GetCredentialProofResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\RevokeCredentialRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function RevokeCredential(\Bloock\RevokeCredentialRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/RevokeCredential',
        $argument,
        ['\Bloock\RevokeCredentialResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CredentialToJsonRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CredentialToJson(\Bloock\CredentialToJsonRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CredentialToJson',
        $argument,
        ['\Bloock\CredentialToJsonResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CredentialFromJsonRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CredentialFromJson(\Bloock\CredentialFromJsonRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CredentialFromJson',
        $argument,
        ['\Bloock\CredentialFromJsonResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\ForcePublishIssuerStateRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function ForcePublishIssuerState(\Bloock\ForcePublishIssuerStateRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/ForcePublishIssuerState',
        $argument,
        ['\Bloock\ForcePublishIssuerStateResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CreateVerificationRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CreateVerification(\Bloock\CreateVerificationRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CreateVerification',
        $argument,
        ['\Bloock\CreateVerificationResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\WaitVerificationRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function WaitVerification(\Bloock\WaitVerificationRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/WaitVerification',
        $argument,
        ['\Bloock\WaitVerificationResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetVerificationStatusRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetVerificationStatus(\Bloock\GetVerificationStatusRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/GetVerificationStatus',
        $argument,
        ['\Bloock\GetVerificationStatusResponse', 'decode'],
        $metadata, $options);
    }

}
