<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: identity_v2.proto

namespace GPBMetadata;

class IdentityV2
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\Config::initOnce();
        \GPBMetadata\AuthenticityEntities::initOnce();
        \GPBMetadata\Shared::initOnce();
        \GPBMetadata\IdentityEntitiesV2::initOnce();
        $pool->internalAddGeneratedFile(
            '
�#
identity_v2.protobloockauthenticity_entities.protoshared.protoidentity_entities_v2.proto"?
GetIssuerListRequest\'
config_data (2.bloock.ConfigData"Q
GetIssuerListResponse
did (	!
error (2.bloock.ErrorH �B
_error"R
GetIssuerByKeyResponse
did (	!
error (2.bloock.ErrorH �B
_error"o
GetCredentialProofRequest\'
config_data (2.bloock.ConfigData

issuer_did (	
credential_id (	"s
GetCredentialProofResponse(
proof (2.bloock.CredentialProofV2!
error (2.bloock.ErrorH �B
_error"n
CredentialToJsonRequestV2\'
config_data (2.bloock.ConfigData(

credential (2.bloock.CredentialV2"W
CredentialToJsonResponseV2
json (	!
error (2.bloock.ErrorH �B
_error"T
CredentialFromJsonRequestV2\'
config_data (2.bloock.ConfigData
json (	"u
CredentialFromJsonResponseV2(

credential (2.bloock.CredentialV2!
error (2.bloock.ErrorH �B
_error"�
CreateCredentialRequestV2\'
config_data (2.bloock.ConfigData
	schema_id (	

issuer_did (	

holder_did (	

expiration (
version (H �
signer (2.bloock.Signer
api_managed_host (	4
string_attributes	 (2.bloock.StringAttributeV26
integer_attributes
 (2.bloock.IntegerAttributeV26
decimal_attributes (2.bloock.DecimalAttributeV26
boolean_attributes (2.bloock.BooleanAttributeV20
date_attributes (2.bloock.DateAttributeV28
datetime_attributes (2.bloock.DateTimeAttributeV2%

proof_type (2.bloock.ProofTypeB

_version"�
BuildSchemaRequestV2\'
config_data (2.bloock.ConfigData
display_name (	
schema_type (	
version (	
description (	

issuer_did (	>
string_attributes (2#.bloock.StringAttributeDefinitionV2@
integer_attributes (2$.bloock.IntegerAttributeDefinitionV2@
decimal_attributes	 (2$.bloock.DecimalAttributeDefinitionV2@
boolean_attributes
 (2$.bloock.BooleanAttributeDefinitionV2:
date_attributes (2!.bloock.DateAttributeDefinitionV2B
datetime_attributes (2%.bloock.DateTimeAttributeDefinitionV2G
string_enum_attributes (2\'.bloock.StringEnumAttributeDefinitionV2I
integer_enum_attributes (2(.bloock.IntegerEnumAttributeDefinitionV2I
decimal_enum_attributes (2(.bloock.DecimalEnumAttributeDefinitionV2"�
CreateIssuerRequest%

issuer_key (2.bloock.IssuerKey\'
config_data (2.bloock.ConfigData0
issuer_params (2.bloock.IssuerParamsH �B
_issuer_params"�
GetIssuerByKeyRequest%

issuer_key (2.bloock.IssuerKey\'
config_data (2.bloock.ConfigData0
issuer_params (2.bloock.IssuerParamsH �B
_issuer_params"x
PublishIssuerStateRequest\'
config_data (2.bloock.ConfigData

issuer_did (	
signer (2.bloock.Signer"�
CreateCredentialResponseV27
credential_receipt (2.bloock.CredentialReceiptV2!
error (2.bloock.ErrorH �B
_error"P
CreateIssuerResponse
did (	!
error (2.bloock.ErrorH �B
_error"f
BuildSchemaResponseV2 
schema (2.bloock.SchemaV2!
error (2.bloock.ErrorH �B
_error"|
PublishIssuerStateResponse1
state_receipt (2.bloock.IssuerStateReceipt!
error (2.bloock.ErrorH �B
_error"n
RevokeCredentialRequestV2\'
config_data (2.bloock.ConfigData(

credential (2.bloock.CredentialV2"y
RevokeCredentialResponseV2.
result (2.bloock.CredentialRevocationV2!
error (2.bloock.ErrorH �B
_error2�
IdentityServiceV2I
CreateIssuer.bloock.CreateIssuerRequest.bloock.CreateIssuerResponseL
GetIssuerList.bloock.GetIssuerListRequest.bloock.GetIssuerListResponseO
GetIssuerByKey.bloock.GetIssuerByKeyRequest.bloock.GetIssuerByKeyResponseJ
BuildSchema.bloock.BuildSchemaRequestV2.bloock.BuildSchemaResponseV2Y
CreateCredential!.bloock.CreateCredentialRequestV2".bloock.CreateCredentialResponseV2[
GetCredentialProof!.bloock.GetCredentialProofRequest".bloock.GetCredentialProofResponseY
RevokeCredential!.bloock.RevokeCredentialRequestV2".bloock.RevokeCredentialResponseV2Y
CredentialToJson!.bloock.CredentialToJsonRequestV2".bloock.CredentialToJsonResponseV2_
CredentialFromJson#.bloock.CredentialFromJsonRequestV2$.bloock.CredentialFromJsonResponseV2[
PublishIssuerState!.bloock.PublishIssuerStateRequest".bloock.PublishIssuerStateResponseBW
com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protobproto3'
        , true);

        static::$is_initialized = true;
    }
}

