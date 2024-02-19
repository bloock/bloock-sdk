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
        \GPBMetadata\KeysEntities::initOnce();
        $pool->internalAddGeneratedFile(
            '
�
identity_entities.protobloock"�

Credential
context (	

id (	
type (	
issuance_date (	

expiration (	
credential_subject (	3
credential_status (2.bloock.CredentialStatus
issuer (	3
credential_schema	 (2.bloock.CredentialSchema&
proof
 (2.bloock.CredentialProof"\\
CredentialProof
signature_proof (	
sparse_mt_proof (	H �B
_sparse_mt_proof"F
CredentialStatus

id (	
revocation_nonce (
type (	",
CredentialSchema

id (	
type (	",
StringAttribute

id (	
value (	"-
IntegerAttribute

id (	
value ("-
DecimalAttribute

id (	
value ("-
BooleanAttribute

id (	
value ("*
DateAttribute

id (	
value (	".
DateTimeAttribute

id (	
value (	"d
StringAttributeDefinition
display_name (	

id (	
description (	
required ("e
IntegerAttributeDefinition
display_name (	

id (	
description (	
required ("e
DecimalAttributeDefinition
display_name (	

id (	
description (	
required ("e
BooleanAttributeDefinition
display_name (	

id (	
description (	
required ("b
DateAttributeDefinition
display_name (	

id (	
description (	
required ("f
DateTimeAttributeDefinition
display_name (	

id (	
description (	
required ("v
StringEnumAttributeDefinition
display_name (	

id (	
description (	
required (
enum (	"w
IntegerEnumAttributeDefinition
display_name (	

id (	
description (	
required (
enum ("w
DecimalEnumAttributeDefinition
display_name (	

id (	
description (	
required (
enum ("k
CredentialReceipt&

credential (2.bloock.Credential
credential_id (	
credential_type (	"%
IssuerStateReceipt
tx_hash (	"M
Schema
cid (	
cid_json_ld (	
schema_type (	
json (	"\'
CredentialRevocation
success ("G
VerificationReceipt
verification_request (	

session_id ("x
DidType
method (2.bloock.Method&

blockchain (2.bloock.Blockchain%

network_id (2.bloock.NetworkId"v
SignatureJWS
	signature (	
	protected (	*
header (2.bloock.SignatureHeaderJWS
message_hash (	"t
SignatureHeaderJWS
alg (	
kid (	
subject (	H �
hash_alg (	H�B

_subjectB
	_hash_alg*#
Method	
IDEN3 

POLYGON_ID*H

Blockchain
ETHEREUM 
POLYGON
UNKNOWN_CHAIN
NO_CHAIN*R
	NetworkId
MAIN 

MUMBAI

GOERLI
UNKNOWN_NETWORK

NO_NETWORK*C
PublishInterval

INTERVAL_5 
INTERVAL_15
INTERVAL_60BW
com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protobproto3'
        , true);

        static::$is_initialized = true;
    }
}

