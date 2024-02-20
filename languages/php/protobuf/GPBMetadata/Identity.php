<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity.proto

namespace GPBMetadata;

class Identity
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\Config::initOnce();
        \GPBMetadata\Shared::initOnce();
        \GPBMetadata\IdentityEntities::initOnce();
        \GPBMetadata\KeysEntities::initOnce();
        $pool->internalAddGeneratedFile(
            '
�0
identity.protobloockshared.protoidentity_entities.protokeys_entities.proto"G
GetSchemaRequest\'
config_data (2.bloock.ConfigData

id (	"`
GetSchemaResponse
schema (2.bloock.Schema!
error (2.bloock.ErrorH �B
_error"P
ImportIssuerResponse
did (	!
error (2.bloock.ErrorH �B
_error"o
GetCredentialProofRequest\'
config_data (2.bloock.ConfigData

issuer_did (	
credential_id (	"q
GetCredentialProofResponse&
proof (2.bloock.CredentialProof!
error (2.bloock.ErrorH �B
_error"j
CredentialToJsonRequest\'
config_data (2.bloock.ConfigData&

credential (2.bloock.Credential"U
CredentialToJsonResponse
json (	!
error (2.bloock.ErrorH �B
_error"R
CredentialFromJsonRequest\'
config_data (2.bloock.ConfigData
json (	"q
CredentialFromJsonResponse&

credential (2.bloock.Credential!
error (2.bloock.ErrorH �B
_error"�
CreateCredentialRequest\'
config_data (2.bloock.ConfigData
	schema_id (	

holder_did (	

expiration (
version (H �
key (2.bloock.Key2
string_attributes (2.bloock.StringAttribute4
integer_attributes (2.bloock.IntegerAttribute4
decimal_attributes	 (2.bloock.DecimalAttribute4
boolean_attributes
 (2.bloock.BooleanAttribute.
date_attributes (2.bloock.DateAttribute6
datetime_attributes (2.bloock.DateTimeAttributeB

_version"�
BuildSchemaRequest\'
config_data (2.bloock.ConfigData
display_name (	
schema_type (	
version (	
description (	<
string_attributes (2!.bloock.StringAttributeDefinition>
integer_attributes (2".bloock.IntegerAttributeDefinition>
decimal_attributes (2".bloock.DecimalAttributeDefinition>
boolean_attributes	 (2".bloock.BooleanAttributeDefinition8
date_attributes
 (2.bloock.DateAttributeDefinition@
datetime_attributes (2#.bloock.DateTimeAttributeDefinitionE
string_enum_attributes (2%.bloock.StringEnumAttributeDefinitionG
integer_enum_attributes (2&.bloock.IntegerEnumAttributeDefinitionG
decimal_enum_attributes (2&.bloock.DecimalEnumAttributeDefinition"�
CreateHolderRequest
key (2.bloock.Key\'
config_data (2.bloock.ConfigData&
did_type (2.bloock.DidTypeH �B
	_did_type"�
CreateIssuerRequest
key (2.bloock.Key\'
config_data (2.bloock.ConfigData&
did_type (2.bloock.DidTypeH �
name (	H�
description (	H�
image (	H�1
publish_interval (2.bloock.PublishIntervalB
	_did_typeB
_nameB
_descriptionB
_image"�
ImportIssuerRequest
key (2.bloock.Key\'
config_data (2.bloock.ConfigData&
did_type (2.bloock.DidTypeH �B
	_did_type"w
ForcePublishIssuerStateRequest\'
config_data (2.bloock.ConfigData

issuer_did (	
key (2.bloock.Key"~
CreateCredentialResponse5
credential_receipt (2.bloock.CredentialReceipt!
error (2.bloock.ErrorH �B
_error"P
CreateHolderResponse
did (	!
error (2.bloock.ErrorH �B
_error"P
CreateIssuerResponse
did (	!
error (2.bloock.ErrorH �B
_error"b
BuildSchemaResponse
schema (2.bloock.Schema!
error (2.bloock.ErrorH �B
_error"�
ForcePublishIssuerStateResponse1
state_receipt (2.bloock.IssuerStateReceipt!
error (2.bloock.ErrorH �B
_error"�
RevokeCredentialRequest\'
config_data (2.bloock.ConfigData&

credential (2.bloock.Credential
key (2.bloock.Key"u
RevokeCredentialResponse,
result (2.bloock.CredentialRevocation!
error (2.bloock.ErrorH �B
_error"[
CreateVerificationRequest\'
config_data (2.bloock.ConfigData
proof_request (	"v
CreateVerificationResponse+
result (2.bloock.VerificationReceipt!
error (2.bloock.ErrorH �B
_error"g
WaitVerificationRequest\'
config_data (2.bloock.ConfigData

session_id (
timeout ("W
WaitVerificationResponse
status (!
error (2.bloock.ErrorH �B
_error"[
GetVerificationStatusRequest\'
config_data (2.bloock.ConfigData

session_id ("\\
GetVerificationStatusResponse
status (!
error (2.bloock.ErrorH �B
_error"V
GetCredentialRequest\'
config_data (2.bloock.ConfigData
credential_id (	"l
GetCredentialResponse&

credential (2.bloock.Credential!
error (2.bloock.ErrorH �B
_error"u
GetCredentialOfferRequest\'
config_data (2.bloock.ConfigData
credential_id (	
key (2.bloock.Key"c
GetCredentialOfferResponse
credential_offer (	!
error (2.bloock.ErrorH �B
_error2�

IdentityServiceI
CreateHolder.bloock.CreateHolderRequest.bloock.CreateHolderResponseI
CreateIssuer.bloock.CreateIssuerRequest.bloock.CreateIssuerResponseI
ImportIssuer.bloock.ImportIssuerRequest.bloock.ImportIssuerResponseF
BuildSchema.bloock.BuildSchemaRequest.bloock.BuildSchemaResponse@
	GetSchema.bloock.GetSchemaRequest.bloock.GetSchemaResponseU
CreateCredential.bloock.CreateCredentialRequest .bloock.CreateCredentialResponseL
GetCredential.bloock.GetCredentialRequest.bloock.GetCredentialResponse[
GetCredentialProof!.bloock.GetCredentialProofRequest".bloock.GetCredentialProofResponseU
RevokeCredential.bloock.RevokeCredentialRequest .bloock.RevokeCredentialResponseU
CredentialToJson.bloock.CredentialToJsonRequest .bloock.CredentialToJsonResponse[
CredentialFromJson!.bloock.CredentialFromJsonRequest".bloock.CredentialFromJsonResponse[
GetCredentialOffer!.bloock.GetCredentialOfferRequest".bloock.GetCredentialOfferResponsej
ForcePublishIssuerState&.bloock.ForcePublishIssuerStateRequest\'.bloock.ForcePublishIssuerStateResponse[
CreateVerification!.bloock.CreateVerificationRequest".bloock.CreateVerificationResponseU
WaitVerification.bloock.WaitVerificationRequest .bloock.WaitVerificationResponsed
GetVerificationStatus$.bloock.GetVerificationStatusRequest%.bloock.GetVerificationStatusResponseBW
com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protobproto3'
        , true);

        static::$is_initialized = true;
    }
}

