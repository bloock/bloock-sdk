<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Bloock;

/**
 */
class IdentityServiceV2Client extends \Bloock\Bridge\Connection {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Bloock\CreateIdentityV2Request $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CreateIdentity(\Bloock\CreateIdentityV2Request $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/CreateIdentity',
        $argument,
        ['\Bloock\CreateIdentityV2Response', 'decode'],
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
        return $this->_simpleRequest('/bloock.IdentityServiceV2/CreateIssuer',
        $argument,
        ['\Bloock\CreateIssuerResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetIssuerListRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetIssuerList(\Bloock\GetIssuerListRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/GetIssuerList',
        $argument,
        ['\Bloock\GetIssuerListResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetIssuerByKeyRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetIssuerByKey(\Bloock\GetIssuerByKeyRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/GetIssuerByKey',
        $argument,
        ['\Bloock\GetIssuerByKeyResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\BuildSchemaRequestV2 $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function BuildSchema(\Bloock\BuildSchemaRequestV2 $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/BuildSchema',
        $argument,
        ['\Bloock\BuildSchemaResponseV2', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GetSchemaRequestV2 $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetSchema(\Bloock\GetSchemaRequestV2 $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/GetSchema',
        $argument,
        ['\Bloock\GetSchemaResponseV2', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CreateCredentialRequestV2 $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CreateCredential(\Bloock\CreateCredentialRequestV2 $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/CreateCredential',
        $argument,
        ['\Bloock\CreateCredentialResponseV2', 'decode'],
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
        return $this->_simpleRequest('/bloock.IdentityServiceV2/GetCredentialProof',
        $argument,
        ['\Bloock\GetCredentialProofResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\RevokeCredentialRequestV2 $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function RevokeCredential(\Bloock\RevokeCredentialRequestV2 $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/RevokeCredential',
        $argument,
        ['\Bloock\RevokeCredentialResponseV2', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CredentialToJsonRequestV2 $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CredentialToJson(\Bloock\CredentialToJsonRequestV2 $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/CredentialToJson',
        $argument,
        ['\Bloock\CredentialToJsonResponseV2', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CredentialFromJsonRequestV2 $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CredentialFromJson(\Bloock\CredentialFromJsonRequestV2 $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/CredentialFromJson',
        $argument,
        ['\Bloock\CredentialFromJsonResponseV2', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\PublishIssuerStateRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function PublishIssuerState(\Bloock\PublishIssuerStateRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityServiceV2/PublishIssuerState',
        $argument,
        ['\Bloock\PublishIssuerStateResponse', 'decode'],
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
        return $this->_simpleRequest('/bloock.IdentityServiceV2/CreateVerification',
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
        return $this->_simpleRequest('/bloock.IdentityServiceV2/WaitVerification',
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
        return $this->_simpleRequest('/bloock.IdentityServiceV2/GetVerificationStatus',
        $argument,
        ['\Bloock\GetVerificationStatusResponse', 'decode'],
        $metadata, $options);
    }

}
