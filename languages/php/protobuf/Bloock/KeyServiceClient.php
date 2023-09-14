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

    /**
     * @param \Bloock\LoadLocalKeyRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function LoadLocalKey(\Bloock\LoadLocalKeyRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.KeyService/LoadLocalKey',
        $argument,
        ['\Bloock\LoadLocalKeyResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\LoadManagedKeyRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function LoadManagedKey(\Bloock\LoadManagedKeyRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.KeyService/LoadManagedKey',
        $argument,
        ['\Bloock\LoadManagedKeyResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GenerateLocalCertificateRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GenerateLocalCertificate(\Bloock\GenerateLocalCertificateRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.KeyService/GenerateLocalCertificate',
        $argument,
        ['\Bloock\GenerateLocalCertificateResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\GenerateManagedCertificateRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function GenerateManagedCertificate(\Bloock\GenerateManagedCertificateRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.KeyService/GenerateManagedCertificate',
        $argument,
        ['\Bloock\GenerateManagedCertificateResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\LoadLocalCertificateRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function LoadLocalCertificate(\Bloock\LoadLocalCertificateRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.KeyService/LoadLocalCertificate',
        $argument,
        ['\Bloock\LoadLocalCertificateResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\LoadManagedCertificateRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function LoadManagedCertificate(\Bloock\LoadManagedCertificateRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.KeyService/LoadManagedCertificate',
        $argument,
        ['\Bloock\LoadManagedCertificateResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Bloock\ImportManagedCertificateRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return mixed
     */
    public function ImportManagedCertificate(\Bloock\ImportManagedCertificateRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/bloock.KeyService/ImportManagedCertificate',
        $argument,
        ['\Bloock\ImportManagedCertificateResponse', 'decode'],
        $metadata, $options);
    }

}
