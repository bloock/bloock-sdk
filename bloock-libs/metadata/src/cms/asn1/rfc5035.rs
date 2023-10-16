// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

//! ASN.1 types defined by RFC 3161.

use bcder::encode::Values;
use x509_certificate::DigestAlgorithm;

use {
    crate::cms::asn1::rfc3281::IssuerSerial,
    bcder::{
        encode::{self, PrimitiveContent},
        ConstOid, OctetString, Oid, Tag,
    },
    x509_certificate::rfc5280::AlgorithmIdentifier,
};

/// Identifies the signingCertificatev2 attribute.
///
/// 1.2.840.113549.1.9.16.2.47
pub const OID_SIGNING_CERTIFICATE_V2: ConstOid = Oid(&[42, 134, 72, 134, 247, 13, 1, 9, 16, 2, 47]);

pub const ESSCERTIDV2_DEFAULT_HASH_ALGORITHM: DigestAlgorithm = DigestAlgorithm::Sha256;

#[derive(Debug, Clone)]
pub struct ESSCertIDv2 {
    pub hash_algorithm: AlgorithmIdentifier,
    pub cert_hash: OctetString,
    pub issuer_serial: Option<IssuerSerial>,
}

impl ESSCertIDv2 {
    pub fn encode_ref(&self) -> impl encode::Values + '_ {
        self.encode_ref_as(Tag::SEQUENCE)
    }

    pub fn encode_ref_as(&self, tag: Tag) -> impl encode::Values + '_ {
        encode::sequence_as(
            tag,
            (
                &self.hash_algorithm,
                self.cert_hash.encode_ref(),
                self.issuer_serial.as_ref().map(|i| i.encode_ref()),
            ),
        )
    }

    pub fn encode(self) -> impl encode::Values {
        encode::sequence_as(
            Tag::SEQUENCE,
            (
                self.hash_algorithm,
                self.cert_hash.encode(),
                self.issuer_serial.map(|i| i.encode()),
            ),
        )
    }
}

pub struct ESSCertIDv2Sequence(pub Vec<ESSCertIDv2>);

impl ESSCertIDv2Sequence {
    fn encode_ref(&self) -> impl Values + '_ {
        encode::sequence(encode::slice(&self.0, |x| x.clone().encode()))
    }
}

#[derive(Debug, Clone)]
pub struct PolicyInformation {
    pub policy_identifier: Oid,
}

impl PolicyInformation {
    pub fn encode_ref(&self) -> impl encode::Values + '_ {
        self.encode_ref_as(Tag::SEQUENCE)
    }

    pub fn encode_ref_as(&self, tag: Tag) -> impl encode::Values + '_ {
        encode::sequence_as(tag, self.policy_identifier.encode_ref())
    }

    pub fn encode(self) -> impl encode::Values {
        encode::sequence(self.policy_identifier.encode())
    }
}

pub struct PolicyInformationSequence(Vec<PolicyInformation>);

impl PolicyInformationSequence {
    pub fn encode_ref(&self) -> impl Values + '_ {
        encode::set(encode::slice(&self.0, |x| x.clone().encode()))
    }

    pub fn encode_ref_as(&self, tag: Tag) -> impl Values + '_ {
        encode::set_as(tag, encode::slice(&self.0, |x| x.clone().encode()))
    }
}

pub struct SigningCertificateV2 {
    pub certs: ESSCertIDv2Sequence,
    pub policies: Option<PolicyInformationSequence>,
}

impl SigningCertificateV2 {
    pub fn encode_ref(&self) -> impl encode::Values + '_ {
        self.encode_ref_as(Tag::SEQUENCE)
    }

    pub fn encode_ref_as(&self, tag: Tag) -> impl encode::Values + '_ {
        encode::sequence_as(
            tag,
            (
                self.certs.encode_ref(),
                self.policies.as_ref().map(|i| i.encode_ref()),
            ),
        )
    }
}
