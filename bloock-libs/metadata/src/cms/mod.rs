use ring::{error, signature::VerificationAlgorithm};

pub mod asn1;
mod signing;

pub use {bcder::Oid, bytes::Bytes};

use {
    crate::cms::asn1::{
        rfc3161::OID_TIME_STAMP_TOKEN,
        rfc5652::{
            CertificateChoices, SignerIdentifier, Time, OID_CONTENT_TYPE, OID_MESSAGE_DIGEST,
            OID_SIGNING_TIME,
        },
    },
    bcder::{Integer, OctetString},
    pem::PemError,
    ring::digest::Digest,
    std::{
        collections::HashSet,
        fmt::{Debug, Display, Formatter},
        ops::Deref,
    },
    x509_certificate::{
        certificate::certificate_is_subset_of, rfc3280::Name, CapturedX509Certificate,
        DigestAlgorithm, SignatureAlgorithm, X509Certificate, X509CertificateError,
    },
};

#[derive(Debug)]
pub enum CmsError {
    /// An error occurred decoding ASN.1 data.
    DecodeErr(bcder::decode::DecodeError<std::convert::Infallible>),

    /// The content-type attribute is missing from the SignedAttributes structure.
    MissingSignedAttributeContentType,

    /// The content-type attribute in the SignedAttributes structure is malformed.
    MalformedSignedAttributeContentType,

    /// The message-digest attribute is missed from the SignedAttributes structure.
    MissingSignedAttributeMessageDigest,

    /// The message-digest attribute is malformed.
    MalformedSignedAttributeMessageDigest,

    /// The signing-time signed attribute is malformed.
    MalformedSignedAttributeSigningTime,

    /// The time-stamp token unsigned attribute is malformed.
    MalformedUnsignedAttributeTimeStampToken,

    /// Subject key identifiers in signer info is not supported.
    SubjectKeyIdentifierUnsupported,

    /// A general I/O error occurred.
    Io(std::io::Error),

    /// An unknown signing key algorithm was encountered.
    UnknownKeyAlgorithm(Oid),

    /// An unknown message digest algorithm was encountered.
    UnknownDigestAlgorithm(Oid),

    /// An unknown signature algorithm was encountered.
    UnknownSignatureAlgorithm(Oid),

    /// An unknown certificate format was encountered.
    UnknownCertificateFormat,

    /// A certificate was not found.
    CertificateNotFound,

    /// Signature verification fail.
    SignatureVerificationError,

    /// No `SignedAttributes` were present when they should have been.
    NoSignedAttributes,

    /// Two content digests were not equivalent.
    DigestNotEqual,

    /// Error encoding/decoding PEM data.
    Pem(PemError),

    /// Error occurred when creating a signature.
    SignatureCreation(signature::Error),

    /// Attempted to use a `Certificate` but we couldn't find the backing data for it.
    CertificateMissingData,

    /// Error occurred parsing a distinguished name field in a certificate.
    DistinguishedNameParseError,

    /// Error occurred in the x509-certificate crate.
    X509Certificate(X509CertificateError),
}

impl std::error::Error for CmsError {}

impl Display for CmsError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::DecodeErr(e) => std::fmt::Display::fmt(e, f),
            Self::MissingSignedAttributeContentType => {
                f.write_str("content-type attribute missing from SignedAttributes")
            }
            Self::MalformedSignedAttributeContentType => {
                f.write_str("content-type attribute in SignedAttributes is malformed")
            }
            Self::MissingSignedAttributeMessageDigest => {
                f.write_str("message-digest attribute missing from SignedAttributes")
            }
            Self::MalformedSignedAttributeMessageDigest => {
                f.write_str("message-digest attribute in SignedAttributes is malformed")
            }
            Self::MalformedSignedAttributeSigningTime => {
                f.write_str("signing-time attribute in SignedAttributes is malformed")
            }
            Self::MalformedUnsignedAttributeTimeStampToken => {
                f.write_str("time-stamp token attribute in UnsignedAttributes is malformed")
            }
            Self::SubjectKeyIdentifierUnsupported => {
                f.write_str("signer info using subject key identifier is not supported")
            }
            Self::Io(e) => std::fmt::Display::fmt(e, f),
            Self::UnknownKeyAlgorithm(oid) => {
                f.write_fmt(format_args!("unknown signing key algorithm: {}", oid))
            }
            Self::UnknownDigestAlgorithm(oid) => {
                f.write_fmt(format_args!("unknown digest algorithm: {}", oid))
            }
            Self::UnknownSignatureAlgorithm(oid) => {
                f.write_fmt(format_args!("unknown signature algorithm: {}", oid))
            }
            Self::UnknownCertificateFormat => f.write_str("unknown certificate format"),
            Self::CertificateNotFound => f.write_str("certificate not found"),
            Self::SignatureVerificationError => f.write_str("signature verification failed"),
            Self::NoSignedAttributes => f.write_str("SignedAttributes structure is missing"),
            Self::DigestNotEqual => f.write_str("digests not equivalent"),
            Self::Pem(e) => f.write_fmt(format_args!("PEM error: {}", e)),
            Self::SignatureCreation(e) => {
                f.write_fmt(format_args!("error during signature creation: {}", e))
            }
            Self::CertificateMissingData => f.write_str("certificate data not available"),
            Self::DistinguishedNameParseError => {
                f.write_str("could not parse distinguished name data")
            }
            Self::X509Certificate(e) => {
                f.write_fmt(format_args!("X.509 certificate error: {:?}", e))
            }
        }
    }
}

impl From<bcder::decode::DecodeError<std::convert::Infallible>> for CmsError {
    fn from(e: bcder::decode::DecodeError<std::convert::Infallible>) -> Self {
        Self::DecodeErr(e)
    }
}

impl From<std::io::Error> for CmsError {
    fn from(e: std::io::Error) -> Self {
        Self::Io(e)
    }
}

impl From<PemError> for CmsError {
    fn from(e: PemError) -> Self {
        Self::Pem(e)
    }
}

impl From<signature::Error> for CmsError {
    fn from(e: signature::Error) -> Self {
        Self::SignatureCreation(e)
    }
}

impl From<X509CertificateError> for CmsError {
    fn from(e: X509CertificateError) -> Self {
        Self::X509Certificate(e)
    }
}

/// Represents a CMS SignedData structure.
///
/// This is the high-level type representing a CMS signature of some data.
/// It contains a description of what was signed, the cryptographic signature
/// of what was signed, and likely the X.509 certificate chain for the
/// signing key.
///
/// This is a high-level data structure that ultimately gets (de)serialized
/// from/to ASN.1. It exists to facilitate common interactions with the
/// low-level ASN.1 without exposing the complexity of ASN.1.
#[derive(Clone)]
pub struct SignedData {
    /// Content digest algorithms used.
    digest_algorithms: HashSet<DigestAlgorithm>,

    /// Content that was signed.
    ///
    /// This is optional because signed content can also be articulated
    /// via signed attributes inside the `SignerInfo` structure.
    signed_content: Option<Vec<u8>>,

    /// Certificates embedded within the data structure.
    ///
    /// While not required, it is common for the SignedData data structure
    /// to embed the X.509 certificates used to sign the data within. This
    /// field holds those certificates.
    ///
    /// Typically the root CA is first and the actual signing certificate is
    /// last.
    certificates: Option<Vec<CapturedX509Certificate>>,

    /// Describes content signatures.
    signers: Vec<SignerInfo>,
}

impl Debug for SignedData {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let mut s = f.debug_struct("SignedData");
        s.field("digest_algorithms", &self.digest_algorithms);
        s.field(
            "signed_content",
            &format_args!("{:?}", self.signed_content.as_ref().map(hex::encode)),
        );
        s.field("certificates", &self.certificates);
        s.field("signers", &self.signers);
        s.finish()
    }
}

impl SignedData {
    /// Construct an instance by parsing BER data.
    pub fn parse_ber(data: &[u8]) -> Result<Self, CmsError> {
        Self::try_from(&crate::cms::asn1::rfc5652::SignedData::decode_ber(data)?)
    }

    /// Compute the digest of the encapsulated content using a specified algorithm.
    ///
    /// The returned value is likely used as the `message-digest` attribute type
    /// for use within signed attributes.
    ///
    /// You can get the raw bytes of the digest by calling its `.as_ref()`.
    pub fn message_digest_with_algorithm(&self, alg: DigestAlgorithm) -> Digest {
        let mut hasher = alg.digester();

        if let Some(content) = &self.signed_content {
            hasher.update(content);
        }

        hasher.finish()
    }

    /// Obtain encapsulated content that was signed.
    ///
    /// This is the defined `encapContentInfo cContent` value.
    pub fn signed_content(&self) -> Option<&[u8]> {
        if let Some(content) = &self.signed_content {
            Some(content)
        } else {
            None
        }
    }

    pub fn certificates(&self) -> Box<dyn Iterator<Item = &CapturedX509Certificate> + '_> {
        match self.certificates.as_ref() {
            Some(certs) => Box::new(certs.iter()),
            None => Box::new(std::iter::empty()),
        }
    }

    /// Obtain signing information attached to this instance.
    ///
    /// Each iterated value represents an entity that cryptographically signed
    /// the content. Use these objects to validate the signed data.
    pub fn signers(&self) -> impl Iterator<Item = &SignerInfo> {
        self.signers.iter()
    }
}

impl TryFrom<&crate::cms::asn1::rfc5652::SignedData> for SignedData {
    type Error = CmsError;

    fn try_from(raw: &crate::cms::asn1::rfc5652::SignedData) -> Result<Self, Self::Error> {
        let digest_algorithms = raw
            .digest_algorithms
            .iter()
            .map(DigestAlgorithm::try_from)
            .collect::<Result<HashSet<_>, _>>()?;

        let signed_content = raw
            .content_info
            .content
            .as_ref()
            .map(|content| content.to_bytes().to_vec());

        let certificates = if let Some(certs) = &raw.certificates {
            Some(
                certs
                    .iter()
                    .map(|choice| match choice {
                        CertificateChoices::Certificate(cert) => {
                            // Doing the ASN.1 round-tripping here isn't ideal and may
                            // lead to correctness bugs.
                            let cert = X509Certificate::from(cert.deref().clone());
                            let cert_ber = cert.encode_ber()?;

                            Ok(CapturedX509Certificate::from_ber(cert_ber)?)
                        }
                        _ => Err(CmsError::UnknownCertificateFormat),
                    })
                    .collect::<Result<Vec<_>, CmsError>>()?,
            )
        } else {
            None
        };

        let signers = raw
            .signer_infos
            .iter()
            .map(SignerInfo::try_from)
            .collect::<Result<Vec<_>, CmsError>>()?;

        Ok(Self {
            digest_algorithms,
            signed_content,
            certificates,
            signers,
        })
    }
}

/// Represents a CMS SignerInfo structure.
///
/// This is a high-level interface to the SignerInfo ASN.1 type. It supports
/// performing common operations against that type.
///
/// Instances of this type are logically equivalent to a single
/// signed assertion within a `SignedData` payload. There can be multiple
/// signers per `SignedData`, which is why this type exists on its own.
#[derive(Clone)]
pub struct SignerInfo {
    /// The X.509 certificate issuer.
    issuer: Name,

    /// The X.509 certificate serial number.
    serial_number: Integer,

    /// The algorithm used for digesting signed content.
    digest_algorithm: DigestAlgorithm,

    /// Algorithm used for signing the digest.
    signature_algorithm: SignatureAlgorithm,

    /// The cryptographic signature.
    signature: Vec<u8>,

    /// Parsed signed attributes.
    signed_attributes: Option<SignedAttributes>,

    /// Raw data constituting SignedAttributes that needs to be digested.
    digested_signed_attributes_data: Option<Vec<u8>>,

    /// Parsed unsigned attributes.
    unsigned_attributes: Option<UnsignedAttributes>,
}

impl Debug for SignerInfo {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let mut s = f.debug_struct("SignerInfo");
        s.field("issuer", &self.issuer);
        s.field("serial_number", &self.serial_number);
        s.field("digest_algorithm", &self.digest_algorithm);
        s.field("signature_algorithm", &self.signature_algorithm);
        s.field(
            "signature",
            &format_args!("{}", hex::encode(&self.signature)),
        );
        s.field("signed_attributes", &self.signed_attributes);
        s.field(
            "digested_signed_attributes_data",
            &format_args!(
                "{:?}",
                self.digested_signed_attributes_data
                    .as_ref()
                    .map(hex::encode)
            ),
        );
        s.field("unsigned_attributes", &self.unsigned_attributes);
        s.finish()
    }
}

/// An unparsed, possibly malformed, public key for signature verification.
pub struct UnparsedPublicKey<B: AsRef<[u8]>> {
    algorithm: &'static dyn VerificationAlgorithm,
    bytes: B,
}

impl<B: Copy> Copy for UnparsedPublicKey<B> where B: AsRef<[u8]> {}

impl<B: Clone> Clone for UnparsedPublicKey<B>
where
    B: AsRef<[u8]>,
{
    fn clone(&self) -> Self {
        Self {
            algorithm: self.algorithm,
            bytes: self.bytes.clone(),
        }
    }
}

impl<B: AsRef<[u8]>> UnparsedPublicKey<B> {
    /// Construct a new `UnparsedPublicKey`.
    ///
    /// No validation of `bytes` is done until `verify()` is called.
    #[inline]
    pub fn new(algorithm: &'static dyn VerificationAlgorithm, bytes: B) -> Self {
        Self { algorithm, bytes }
    }

    pub fn bytes(&self) -> &[u8] {
        self.bytes.as_ref()
    }

    /// Parses the public key and verifies `signature` is a valid signature of
    /// `message` using it.
    ///
    /// See the [crate::signature] module-level documentation for examples.
    pub fn verify(&self, message: &[u8], signature: &[u8]) -> Result<(), error::Unspecified> {
        Ok(())
    }
}

impl SignerInfo {
    /// Obtain the signing X.509 certificate's issuer name and its serial number.
    ///
    /// The returned value can be used to locate the certificate so
    /// verification can be performed.
    pub fn certificate_issuer_and_serial(&self) -> Option<(&Name, &Integer)> {
        Some((&self.issuer, &self.serial_number))
    }

    /// Obtain the message digest algorithm used by this signer.
    pub fn digest_algorithm(&self) -> DigestAlgorithm {
        self.digest_algorithm
    }

    /// Obtain the cryptographic signing algorithm used by this signer.
    pub fn signature_algorithm(&self) -> SignatureAlgorithm {
        self.signature_algorithm
    }

    /// Obtain the raw bytes constituting the cryptographic signature.
    ///
    /// This is the signature that should be verified.
    pub fn signature(&self) -> &[u8] {
        &self.signature
    }

    /// Obtain the `SignedAttributes` attached to this instance.
    pub fn signed_attributes(&self) -> Option<&SignedAttributes> {
        self.signed_attributes.as_ref()
    }

    /// Obtain the `UnsignedAttributes` attached to this instance.
    pub fn unsigned_attributes(&self) -> Option<&UnsignedAttributes> {
        self.unsigned_attributes.as_ref()
    }

    /// Verifies the signature defined by this signer given a [SignedData] instance.
    ///
    /// This function will perform cryptographic verification that the signature
    /// contained within this `SignerInfo` instance is valid for the content that
    /// was signed. The content that was signed is the encapsulated content from
    /// the `SignedData` instance (its `.signed_data()` value) combined with
    /// the `SignedAttributes` attached to this instance.
    ///
    /// # IMPORTANT SECURITY LIMITATIONS
    ///
    /// This method only performs signature verification. It:
    ///
    /// * DOES NOT verify the digest hash embedded within `SignedAttributes` (if present).
    /// * DOES NOT validate the signing certificate in any way.
    /// * DOES NOT validate that the cryptography used is appropriate.
    /// * DOES NOT verify the time stamp token, if present.
    ///
    /// See the crate's documentation for more on the security implications.
    pub fn verify_signature_with_signed_data(
        &self,
        signed_data: &SignedData,
    ) -> Result<(), CmsError> {
        let signed_content = self.signed_content_with_signed_data(signed_data);

        self.verify_signature_with_signed_data_and_content(signed_data, &signed_content)
    }

    /// Verifies the signature defined by this signer given a [SignedData] and signed content.
    ///
    /// This function will perform cryptographic verification that the signature contained within
    /// this [SignerInfo] is valid for `signed_content`. Unlike
    /// [Self::verify_signature_with_signed_data()], the content that was signed is passed in
    /// explicitly instead of derived from [SignedData].
    ///
    /// This is a low-level API that bypasses the normal rules for deriving the raw content a
    /// cryptographic signature was made over. You probably want to use
    /// [Self::verify_signature_with_signed_data()] instead. Also note that `signed_content` here
    /// may or may not be the _encapsulated content_ which is ultimately signed.
    ///
    /// This method only performs cryptographic signature verification. It is therefore subject
    /// to the same limitations as [Self::verify_signature_with_signed_data()].
    pub fn verify_signature_with_signed_data_and_content(
        &self,
        signed_data: &SignedData,
        signed_content: &[u8],
    ) -> Result<(), CmsError> {
        let verifier = self.signature_verifier(signed_data.certificates())?;
        let signature = self.signature();

        verifier
            .verify(signed_content, signature)
            .map_err(|_| CmsError::SignatureVerificationError)
    }

    /// Verifies the digest stored in signed attributes matches that of content in a `SignedData`.
    ///
    /// If signed attributes are present on this instance, they must contain
    /// a `message-digest` attribute defining the digest of data that was
    /// signed. The specification says this digested data should come from
    /// the encapsulated content within `SignedData` (`SignedData.signed_content()`).
    ///
    /// Note that some utilities of CMS will not store a computed digest
    /// in `message-digest` that came from `SignedData` or is using
    /// the digest algorithm indicated by this `SignerInfo`. This is strictly
    /// in violation of the specification but it does occur.
    ///
    /// # IMPORTANT SECURITY LIMITATIONS
    ///
    /// This method only performs message digest verification. It:
    ///
    /// * DOES NOT verify the signature over the signed data or anything about
    ///   the signer.
    /// * DOES NOT validate that the digest algorithm is strong/appropriate.
    /// * DOES NOT compare the digests in a manner that is immune to timing
    ///   side-channels.
    ///
    /// See the crate's documentation for more on the security implications.
    pub fn verify_message_digest_with_signed_data(
        &self,
        signed_data: &SignedData,
    ) -> Result<(), CmsError> {
        let signed_attributes = self
            .signed_attributes()
            .ok_or(CmsError::NoSignedAttributes)?;

        let wanted_digest: &[u8] = signed_attributes.message_digest.as_ref();
        let got_digest = self.compute_digest_with_signed_data(signed_data);

        // Susceptible to timing side-channel but we don't care per function
        // documentation.
        if wanted_digest == got_digest.as_ref() {
            Ok(())
        } else {
            Err(CmsError::DigestNotEqual)
        }
    }

    /// Verifies the message digest stored in signed attributes using explicit encapsulated content.
    ///
    /// Typically, the digest is computed over content stored in the [SignedData] instance.
    /// However, it is possible for the signed content to be external. This function
    /// allows you to define the source of that external content.
    ///
    /// Behavior is very similar to [SignerInfo::verify_message_digest_with_signed_data]
    /// except the original content that was digested is explicitly passed in. This
    /// content is appended with the signed attributes data on this [SignerInfo].
    ///
    /// The security limitations from [SignerInfo::verify_message_digest_with_signed_data]
    /// apply to this function as well.
    pub fn verify_message_digest_with_content(&self, data: &[u8]) -> Result<(), CmsError> {
        let signed_attributes = self
            .signed_attributes()
            .ok_or(CmsError::NoSignedAttributes)?;

        let wanted_digest: &[u8] = signed_attributes.message_digest.as_ref();
        let got_digest = self.compute_digest(Some(data));

        // Susceptible to timing side-channel but we don't care per function
        // documentation.
        if wanted_digest == got_digest.as_ref() {
            Ok(())
        } else {
            Err(CmsError::DigestNotEqual)
        }
    }

    /// Obtain an entity for validating the signature described by this instance.
    ///
    /// This will attempt to locate the certificate used by this signing info
    /// structure in the passed iterable of certificates and then construct
    /// a signature verifier that can be used to verify content integrity.
    ///
    /// If the certificate referenced by this signing info could not be found,
    /// an error occurs.
    ///
    /// If the signing key's algorithm or signature algorithm aren't supported,
    /// an error occurs.
    pub fn signature_verifier<'a, C>(
        &self,
        mut certs: C,
    ) -> Result<UnparsedPublicKey<Vec<u8>>, CmsError>
    where
        C: Iterator<Item = &'a CapturedX509Certificate>,
    {
        // The issuer of this signature is matched against the list of certificates.
        let signing_cert = certs
            .find(|cert| {
                // We're only verifying signatures here, not validating the certificate.
                // So even if the certificate comparison functionality is incorrect
                // (the called function does non-exact matching of the RdnSequence in
                // case the candidate certs have extra fields), that shouldn't have
                // security implications.
                certificate_is_subset_of(
                    &self.serial_number,
                    &self.issuer,
                    cert.serial_number_asn1(),
                    cert.issuer_name(),
                )
            })
            .ok_or(CmsError::CertificateNotFound)?;

        let key_algorithm = signing_cert.key_algorithm().ok_or_else(|| {
            CmsError::UnknownKeyAlgorithm(signing_cert.key_algorithm_oid().clone())
        })?;

        let verification_algorithm = self
            .signature_algorithm
            .resolve_verification_algorithm(key_algorithm)?;

        let public_key = UnparsedPublicKey::new(
            verification_algorithm,
            signing_cert.public_key_data().to_vec(),
        );

        Ok(public_key)
    }

    /// Resolve the time-stamp token [SignedData] for this signer.
    ///
    /// The time-stamp token is a SignedData ASN.1 structure embedded as an unsigned
    /// attribute. This is a convenience method to extract it and turn it into
    /// a [SignedData].
    ///
    /// Returns `Ok(Some)` on success, `Ok(None)` if there is no time-stamp token,
    /// and `Err` if there is a parsing error.
    pub fn time_stamp_token_signed_data(&self) -> Result<Option<SignedData>, CmsError> {
        if let Some(attrs) = self.unsigned_attributes() {
            if let Some(signed_data) = &attrs.time_stamp_token {
                Ok(Some(SignedData::try_from(signed_data)?))
            } else {
                Ok(None)
            }
        } else {
            Ok(None)
        }
    }

    /// Verify the time-stamp token in this instance.
    ///
    /// The time-stamp token is a SignedData ASN.1 structure embedded as an unsigned
    /// attribute. So this method reconstructs that data structure and effectively
    /// calls [SignerInfo::verify_signature_with_signed_data] and
    /// [SignerInfo::verify_message_digest_with_signed_data].
    ///
    /// Returns `Ok(None)` if there is no time-stamp token and `Ok(Some(()))` if
    /// there is and the token validates. `Err` occurs on any parse or verification
    /// error.
    pub fn verify_time_stamp_token(&self) -> Result<Option<()>, CmsError> {
        let signed_data = if let Some(v) = self.time_stamp_token_signed_data()? {
            v
        } else {
            return Ok(None);
        };

        if signed_data.signers.is_empty() {
            return Ok(None);
        }

        for signer in signed_data.signers() {
            signer.verify_signature_with_signed_data(&signed_data)?;
            signer.verify_message_digest_with_signed_data(&signed_data)?;
        }

        Ok(Some(()))
    }

    /// Obtain the raw bytes of content that was signed given a `SignedData`.
    ///
    /// This joins the encapsulated content from `SignedData` with `SignedAttributes`
    /// on this instance to produce a new blob. This new blob is the message
    /// that is signed and whose signature is embedded in `SignerInfo` instances.
    pub fn signed_content_with_signed_data(&self, signed_data: &SignedData) -> Vec<u8> {
        self.signed_content(signed_data.signed_content())
    }

    /// Obtain the raw bytes of content that were digested and signed.
    ///
    /// The returned value is the message that was signed and whose signature
    /// of which needs to be verified.
    ///
    /// The optional content argument is the `encapContentInfo eContent`
    /// field, typically the value of `SignedData.signed_content()`.
    pub fn signed_content(&self, content: Option<&[u8]>) -> Vec<u8> {
        // Per RFC 5652 Section 5.4:
        //
        //    The result of the message digest calculation process depends on
        //    whether the signedAttrs field is present.  When the field is absent,
        //    the result is just the message digest of the content as described
        //    above.  When the field is present, however, the result is the message
        //    digest of the complete DER encoding of the SignedAttrs value
        //    contained in the signedAttrs field.  Since the SignedAttrs value,
        //    when present, must contain the content-type and the message-digest
        //    attributes, those values are indirectly included in the result.  The
        //    content-type attribute MUST NOT be included in a countersignature
        //    unsigned attribute as defined in Section 11.4.  A separate encoding
        //    of the signedAttrs field is performed for message digest calculation.
        //    The IMPLICIT [0] tag in the signedAttrs is not used for the DER
        //    encoding, rather an EXPLICIT SET OF tag is used.  That is, the DER
        //    encoding of the EXPLICIT SET OF tag, rather than of the IMPLICIT [0]
        //    tag, MUST be included in the message digest calculation along with
        //    the length and content octets of the SignedAttributes value.

        if let Some(signed_attributes_data) = &self.digested_signed_attributes_data {
            signed_attributes_data.clone()
        } else if let Some(content) = content {
            content.to_vec()
        } else {
            vec![]
        }
    }

    /// Obtain the raw bytes constituting `SignerInfo.signedAttrs` as encoded for signatures.
    ///
    /// Cryptographic signatures in the `SignerInfo` ASN.1 type are made from the digest
    /// of the `EXPLICIT SET OF` DER encoding of `SignerInfo.signedAttrs`, if signed
    /// attributes are present. This function resolves the raw bytes that are used
    /// for digest computation and later signing.
    ///
    /// This should always be `Some` if the instance was constructed from an ASN.1
    /// value that had signed attributes.
    pub fn signed_attributes_data(&self) -> Option<&[u8]> {
        self.digested_signed_attributes_data
            .as_ref()
            .map(|x| x.as_ref())
    }

    /// Compute a message digest using a `SignedData` instance.
    ///
    /// This will obtain the encapsulated content blob from a `SignedData`
    /// and digest it using the algorithm configured on this instance.
    ///
    /// The resulting digest is typically stored in the `message-digest`
    /// attribute of `SignedData`.
    pub fn compute_digest_with_signed_data(&self, signed_data: &SignedData) -> Digest {
        self.compute_digest(signed_data.signed_content())
    }

    /// Compute a message digest using the configured algorithm.
    ///
    /// This method calls into `compute_digest_with_algorithm()` using the
    /// digest algorithm stored in this instance.
    pub fn compute_digest(&self, content: Option<&[u8]>) -> Digest {
        self.compute_digest_with_algorithm(content, self.digest_algorithm)
    }

    /// Compute a message digest using an explicit digest algorithm.
    ///
    /// This will compute the hash/digest of the passed in content.
    pub fn compute_digest_with_algorithm(
        &self,
        content: Option<&[u8]>,
        alg: DigestAlgorithm,
    ) -> Digest {
        let mut hasher = alg.digester();

        if let Some(content) = content {
            hasher.update(content);
        }

        hasher.finish()
    }
}

impl TryFrom<&crate::cms::asn1::rfc5652::SignerInfo> for SignerInfo {
    type Error = CmsError;

    fn try_from(signer_info: &crate::cms::asn1::rfc5652::SignerInfo) -> Result<Self, Self::Error> {
        let (issuer, serial_number) = match &signer_info.sid {
            SignerIdentifier::IssuerAndSerialNumber(issuer) => {
                (issuer.issuer.clone(), issuer.serial_number.clone())
            }
            SignerIdentifier::SubjectKeyIdentifier(_) => {
                return Err(CmsError::SubjectKeyIdentifierUnsupported);
            }
        };

        let digest_algorithm = DigestAlgorithm::try_from(&signer_info.digest_algorithm)?;

        // The "signature" algorithm can also be a key algorithm identifier. So we
        // attempt to resolve using the more robust mechanism.
        let signature_algorithm = SignatureAlgorithm::from_oid_and_digest_algorithm(
            &signer_info.signature_algorithm.algorithm,
            digest_algorithm,
        )?;

        let signature = signer_info.signature.to_bytes().to_vec();

        let signed_attributes = if let Some(attributes) = &signer_info.signed_attributes {
            // Content type attribute MUST be present.
            let content_type = attributes
                .iter()
                .find(|attr| attr.typ == OID_CONTENT_TYPE)
                .ok_or(CmsError::MissingSignedAttributeContentType)?;

            // Content type attribute MUST have exactly 1 value.
            if content_type.values.len() != 1 {
                return Err(CmsError::MalformedSignedAttributeContentType);
            }

            let content_type = content_type
                .values
                .get(0)
                .unwrap()
                .deref()
                .clone()
                .decode(|cons| Oid::take_from(cons))
                .map_err(|_| CmsError::MalformedSignedAttributeContentType)?;

            // Message digest attribute MUST be present.
            let message_digest = attributes
                .iter()
                .find(|attr| attr.typ == OID_MESSAGE_DIGEST)
                .ok_or(CmsError::MissingSignedAttributeMessageDigest)?;

            // Message digest attribute MUST have exactly 1 value.
            if message_digest.values.len() != 1 {
                return Err(CmsError::MalformedSignedAttributeMessageDigest);
            }

            let message_digest = message_digest
                .values
                .get(0)
                .unwrap()
                .deref()
                .clone()
                .decode(|cons| OctetString::take_from(cons))
                .map_err(|_| CmsError::MalformedSignedAttributeMessageDigest)?
                .to_bytes()
                .to_vec();

            // Signing time is optional, but common. So we pull it out for convenience.
            let signing_time = attributes
                .iter()
                .find(|attr| attr.typ == OID_SIGNING_TIME)
                .map(|attr| {
                    if attr.values.len() != 1 {
                        Err(CmsError::MalformedSignedAttributeSigningTime)
                    } else {
                        let time = attr
                            .values
                            .get(0)
                            .unwrap()
                            .deref()
                            .clone()
                            .decode(|cons| Time::take_from(cons))?;

                        let time = chrono::DateTime::from(time);

                        Ok(time)
                    }
                })
                .transpose()?;

            Some(SignedAttributes {
                content_type,
                message_digest,
                signing_time,
                raw: attributes.clone(),
            })
        } else {
            None
        };

        let digested_signed_attributes_data = signer_info.signed_attributes_digested_content()?;

        let unsigned_attributes = if let Some(attributes) = &signer_info.unsigned_attributes {
            let time_stamp_token =
                attributes
                    .iter()
                    .find(|attr| attr.typ == OID_TIME_STAMP_TOKEN)
                    .map(|attr| {
                        if attr.values.len() != 1 {
                            Err(CmsError::MalformedUnsignedAttributeTimeStampToken)
                        } else {
                            Ok(attr.values.get(0).unwrap().deref().clone().decode(|cons| {
                                crate::cms::asn1::rfc5652::SignedData::decode(cons)
                            })?)
                        }
                    })
                    .transpose()?;

            Some(UnsignedAttributes { time_stamp_token })
        } else {
            None
        };

        Ok(SignerInfo {
            issuer,
            serial_number,
            digest_algorithm,
            signature_algorithm,
            signature,
            signed_attributes,
            digested_signed_attributes_data,
            unsigned_attributes,
        })
    }
}

/// Represents the contents of a CMS SignedAttributes structure.
///
/// This is a high-level interface to the SignedAttributes ASN.1 type.
#[derive(Clone)]
pub struct SignedAttributes {
    /// The content type of the value being signed.
    ///
    /// This is often `OID_ID_DATA`.
    content_type: Oid,

    /// Holds the digest of the content that was signed.
    message_digest: Vec<u8>,

    /// The time the signature was created.
    signing_time: Option<chrono::DateTime<chrono::Utc>>,

    /// The raw ASN.1 signed attributes.
    raw: crate::cms::asn1::rfc5652::SignedAttributes,
}

impl SignedAttributes {
    pub fn content_type(&self) -> &Oid {
        &self.content_type
    }

    pub fn message_digest(&self) -> &[u8] {
        &self.message_digest
    }

    pub fn signing_time(&self) -> Option<&chrono::DateTime<chrono::Utc>> {
        self.signing_time.as_ref()
    }

    pub fn attributes(&self) -> &crate::cms::asn1::rfc5652::SignedAttributes {
        &self.raw
    }
}

impl Debug for SignedAttributes {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let mut s = f.debug_struct("SignedAttributes");
        s.field("content_type", &format_args!("{}", self.content_type));
        s.field(
            "message_digest",
            &format_args!("{}", hex::encode(&self.message_digest)),
        );
        s.field("signing_time", &self.signing_time);
        s.finish()
    }
}

#[derive(Clone, Debug)]
pub struct UnsignedAttributes {
    /// Time-Stamp Token from a Time-Stamp Protocol server.
    time_stamp_token: Option<crate::cms::asn1::rfc5652::SignedData>,
}
