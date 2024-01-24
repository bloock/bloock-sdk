use crate::{
    error::BridgeError,
    items::{
        Error, GenerateLocalCertificateRequest, GenerateLocalCertificateResponse,
        GenerateLocalKeyRequest, GenerateLocalKeyResponse, GenerateManagedCertificateRequest,
        GenerateManagedCertificateResponse, GenerateManagedKeyRequest, GenerateManagedKeyResponse,
        ImportManagedCertificateRequest, ImportManagedCertificateResponse,
        LoadLocalCertificateRequest, LoadLocalCertificateResponse, LoadLocalKeyRequest,
        LoadLocalKeyResponse, LoadManagedCertificateRequest, LoadManagedCertificateResponse,
        LoadManagedKeyRequest, LoadManagedKeyResponse, RecoverTotpAccessControlRequest,
        RecoverTotpAccessControlResponse, SetupTotpAccessControlRequest,
        SetupTotpAccessControlResponse, SetupSecretAccessControlRequest,
        SetupSecretAccessControlResponse,
    },
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<GenerateLocalKeyRequest> for GenerateLocalKeyResponse {
    fn build_error(err: String) -> Self {
        Self {
            local_key: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GenerateManagedKeyRequest> for GenerateManagedKeyResponse {
    fn build_error(err: String) -> Self {
        Self {
            managed_key: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<LoadLocalKeyRequest> for LoadLocalKeyResponse {
    fn build_error(err: String) -> Self {
        Self {
            local_key: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<LoadManagedKeyRequest> for LoadManagedKeyResponse {
    fn build_error(err: String) -> Self {
        Self {
            managed_key: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GenerateLocalCertificateRequest> for GenerateLocalCertificateResponse {
    fn build_error(err: String) -> Self {
        Self {
            local_certificate: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GenerateManagedCertificateRequest> for GenerateManagedCertificateResponse {
    fn build_error(err: String) -> Self {
        Self {
            managed_certificate: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<LoadLocalCertificateRequest> for LoadLocalCertificateResponse {
    fn build_error(err: String) -> Self {
        Self {
            local_certificate: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<LoadManagedCertificateRequest> for LoadManagedCertificateResponse {
    fn build_error(err: String) -> Self {
        Self {
            managed_certificate: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<ImportManagedCertificateRequest> for ImportManagedCertificateResponse {
    fn build_error(err: String) -> Self {
        Self {
            managed_certificate: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<SetupTotpAccessControlRequest> for SetupTotpAccessControlResponse {
    fn build_error(err: String) -> Self {
        Self {
            secret: String::default(),
            secret_qr: String::default(),
            recovery_codes: Vec::default(),
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<SetupSecretAccessControlRequest> for SetupSecretAccessControlResponse {
    fn build_error(err: String) -> Self {
        Self {
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<RecoverTotpAccessControlRequest> for RecoverTotpAccessControlResponse {
    fn build_error(err: String) -> Self {
        Self {
            secret: String::default(),
            secret_qr: String::default(),
            recovery_codes: Vec::default(),
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}
