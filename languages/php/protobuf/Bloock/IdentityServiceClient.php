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
     * @param \Bloock\CreateIdentityRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CreateIdentity(\Bloock\CreateIdentityRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CreateIdentity',
        $argument,
        ['\Bloock\CreateIdentityResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\LoadIdentityRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function LoadIdentity(\Bloock\LoadIdentityRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/LoadIdentity',
        $argument,
        ['\Bloock\LoadIdentityResponse', 'decode'],
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
     * @param \Bloock\GetOfferRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GetOffer(\Bloock\GetOfferRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/GetOffer',
        $argument,
        ['\Bloock\GetOfferResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\WaitOfferRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function WaitOffer(\Bloock\WaitOfferRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/WaitOffer',
        $argument,
        ['\Bloock\WaitOfferResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CredentialOfferToJsonRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CredentialOfferToJson(\Bloock\CredentialOfferToJsonRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CredentialOfferToJson',
        $argument,
        ['\Bloock\CredentialOfferToJsonResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CredentialOfferFromJsonRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CredentialOfferFromJson(\Bloock\CredentialOfferFromJsonRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CredentialOfferFromJson',
        $argument,
        ['\Bloock\CredentialOfferFromJsonResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\CredentialOfferRedeemRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function CredentialOfferRedeem(\Bloock\CredentialOfferRedeemRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/CredentialOfferRedeem',
        $argument,
        ['\Bloock\CredentialOfferRedeemResponse', 'decode'],
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
     * @param \Bloock\VerifyCredentialRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function VerifyCredential(\Bloock\VerifyCredentialRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.IdentityService/VerifyCredential',
        $argument,
        ['\Bloock\VerifyCredentialResponse', 'decode'],
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

}
