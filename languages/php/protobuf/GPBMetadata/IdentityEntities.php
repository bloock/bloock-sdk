<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity_entities.proto

namespace GPBMetadata;

class IdentityEntities
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\AuthenticityEntities::initOnce();
        \GPBMetadata\IntegrityEntities::initOnce();
        $pool->internalAddGeneratedFile(
            '
�
identity_entities.protobloockintegrity_entities.proto">
Identity
mnemonic (	
key (	
private_key (	"S
BooleanAttributeDefinition
display_name (	

id (	
description (	"P
DateAttributeDefinition
display_name (	

id (	
description (	"T
DateTimeAttributeDefinition
display_name (	

id (	
description (	"o
MultiChoiceAttributeDefinition
display_name (	

id (	
description (	
allowed_values (	"R
NumberAttributeDefinition
display_name (	

id (	
description (	"-
BooleanAttribute

id (	
value ("*
DateAttribute

id (	
value (".
DateTimeAttribute

id (	
value ("1
MultiChoiceAttribute

id (	
value (	",
NumberAttribute

id (	
value ("%
Schema

id (	
json_ld (	"d
CredentialOffer
thid (	)
body (2.bloock.CredentialOfferBody
from (	

to (	"_
CredentialOfferBody
url (	;
credentials (2&.bloock.CredentialOfferBodyCredentials"A
CredentialOfferBodyCredentials

id (	
description (	"2
CredentialReceipt

id (	
	anchor_id ("E

Credential
	thread_id (	$
body (2.bloock.CredentialBody"�
CredentialBody
context (	

id (	
type (	
issuance_date (	
credential_subject (	3
credential_status (2.bloock.CredentialStatus
issuer (	3
credential_schema (2.bloock.CredentialSchema&
proof	 (2.bloock.CredentialProof"F
CredentialStatus

id (	
revocation_nonce (
type (	",
CredentialSchema

id (	
type (	"b
CredentialProof#
bloock_proof (2.bloock.Proof*
signature_proof (2.bloock.Signature"O
CredentialVerification
	timestamp (
issuer (	

revocation (")
CredentialRevocation
	timestamp (BW
com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protobproto3'
        , true);

        static::$is_initialized = true;
    }
}

