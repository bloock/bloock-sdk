<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_identity_entities.proto

namespace GPBMetadata;

class BloockIdentityEntities
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        $pool->internalAddGeneratedFile(
            "\x0A\xA2\x14\x0A\x1Ebloock_identity_entities.proto\x12\x06bloock\"\xA0\x02\x0A\x0ACredential\x12\x0F\x0A\x07context\x18\x01 \x03(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x0C\x0A\x04type\x18\x03 \x03(\x09\x12\x15\x0A\x0Dissuance_date\x18\x04 \x01(\x09\x12\x12\x0A\x0Aexpiration\x18\x05 \x01(\x09\x12\x1A\x0A\x12credential_subject\x18\x06 \x01(\x09\x123\x0A\x11credential_status\x18\x07 \x01(\x0B2\x18.bloock.CredentialStatus\x12\x0E\x0A\x06issuer\x18\x08 \x01(\x09\x123\x0A\x11credential_schema\x18\x09 \x01(\x0B2\x18.bloock.CredentialSchema\x12&\x0A\x05proof\x18\x0A \x01(\x0B2\x17.bloock.CredentialProof\"\\\x0A\x0FCredentialProof\x12\x17\x0A\x0Fsignature_proof\x18\x01 \x01(\x09\x12\x1C\x0A\x0Fsparse_mt_proof\x18\x02 \x01(\x09H\x00\x88\x01\x01B\x12\x0A\x10_sparse_mt_proof\"F\x0A\x10CredentialStatus\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x18\x0A\x10revocation_nonce\x18\x02 \x01(\x03\x12\x0C\x0A\x04type\x18\x03 \x01(\x09\",\x0A\x10CredentialSchema\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x0C\x0A\x04type\x18\x02 \x01(\x09\",\x0A\x0FStringAttribute\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x0D\x0A\x05value\x18\x02 \x01(\x09\"-\x0A\x10IntegerAttribute\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x0D\x0A\x05value\x18\x02 \x01(\x03\"-\x0A\x10DecimalAttribute\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x0D\x0A\x05value\x18\x02 \x01(\x01\"-\x0A\x10BooleanAttribute\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x0D\x0A\x05value\x18\x02 \x01(\x08\"*\x0A\x0DDateAttribute\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x0D\x0A\x05value\x18\x02 \x01(\x09\".\x0A\x11DateTimeAttribute\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x0D\x0A\x05value\x18\x02 \x01(\x09\"d\x0A\x19StringAttributeDefinition\x12\x14\x0A\x0Cdisplay_name\x18\x01 \x01(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x13\x0A\x0Bdescription\x18\x03 \x01(\x09\x12\x10\x0A\x08required\x18\x04 \x01(\x08\"e\x0A\x1AIntegerAttributeDefinition\x12\x14\x0A\x0Cdisplay_name\x18\x01 \x01(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x13\x0A\x0Bdescription\x18\x03 \x01(\x09\x12\x10\x0A\x08required\x18\x04 \x01(\x08\"e\x0A\x1ADecimalAttributeDefinition\x12\x14\x0A\x0Cdisplay_name\x18\x01 \x01(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x13\x0A\x0Bdescription\x18\x03 \x01(\x09\x12\x10\x0A\x08required\x18\x04 \x01(\x08\"e\x0A\x1ABooleanAttributeDefinition\x12\x14\x0A\x0Cdisplay_name\x18\x01 \x01(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x13\x0A\x0Bdescription\x18\x03 \x01(\x09\x12\x10\x0A\x08required\x18\x04 \x01(\x08\"b\x0A\x17DateAttributeDefinition\x12\x14\x0A\x0Cdisplay_name\x18\x01 \x01(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x13\x0A\x0Bdescription\x18\x03 \x01(\x09\x12\x10\x0A\x08required\x18\x04 \x01(\x08\"f\x0A\x1BDateTimeAttributeDefinition\x12\x14\x0A\x0Cdisplay_name\x18\x01 \x01(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x13\x0A\x0Bdescription\x18\x03 \x01(\x09\x12\x10\x0A\x08required\x18\x04 \x01(\x08\"v\x0A\x1DStringEnumAttributeDefinition\x12\x14\x0A\x0Cdisplay_name\x18\x01 \x01(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x13\x0A\x0Bdescription\x18\x03 \x01(\x09\x12\x10\x0A\x08required\x18\x04 \x01(\x08\x12\x0C\x0A\x04enum\x18\x05 \x03(\x09\"w\x0A\x1EIntegerEnumAttributeDefinition\x12\x14\x0A\x0Cdisplay_name\x18\x01 \x01(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x13\x0A\x0Bdescription\x18\x03 \x01(\x09\x12\x10\x0A\x08required\x18\x04 \x01(\x08\x12\x0C\x0A\x04enum\x18\x05 \x03(\x03\"w\x0A\x1EDecimalEnumAttributeDefinition\x12\x14\x0A\x0Cdisplay_name\x18\x01 \x01(\x09\x12\x0A\x0A\x02id\x18\x02 \x01(\x09\x12\x13\x0A\x0Bdescription\x18\x03 \x01(\x09\x12\x10\x0A\x08required\x18\x04 \x01(\x08\x12\x0C\x0A\x04enum\x18\x05 \x03(\x01\"k\x0A\x11CredentialReceipt\x12&\x0A\x0Acredential\x18\x01 \x01(\x0B2\x12.bloock.Credential\x12\x15\x0A\x0Dcredential_id\x18\x02 \x01(\x09\x12\x17\x0A\x0Fcredential_type\x18\x03 \x01(\x09\"%\x0A\x12IssuerStateReceipt\x12\x0F\x0A\x07tx_hash\x18\x01 \x01(\x09\"M\x0A\x06Schema\x12\x0B\x0A\x03cid\x18\x01 \x01(\x09\x12\x13\x0A\x0Bcid_json_ld\x18\x02 \x01(\x09\x12\x13\x0A\x0Bschema_type\x18\x03 \x01(\x09\x12\x0C\x0A\x04json\x18\x04 \x01(\x09\"'\x0A\x14CredentialRevocation\x12\x0F\x0A\x07success\x18\x01 \x01(\x08\"G\x0A\x13VerificationReceipt\x12\x1C\x0A\x14verification_request\x18\x01 \x01(\x09\x12\x12\x0A\x0Asession_id\x18\x02 \x01(\x03\"v\x0A\x0CSignatureJWS\x12\x11\x0A\x09signature\x18\x01 \x01(\x09\x12\x11\x0A\x09protected\x18\x02 \x01(\x09\x12*\x0A\x06header\x18\x03 \x01(\x0B2\x1A.bloock.SignatureHeaderJWS\x12\x14\x0A\x0Cmessage_hash\x18\x04 \x01(\x09\"t\x0A\x12SignatureHeaderJWS\x12\x0B\x0A\x03alg\x18\x01 \x01(\x09\x12\x0B\x0A\x03kid\x18\x02 \x01(\x09\x12\x14\x0A\x07subject\x18\x03 \x01(\x09H\x00\x88\x01\x01\x12\x15\x0A\x08hash_alg\x18\x04 \x01(\x09H\x01\x88\x01\x01B\x0A\x0A\x08_subjectB\x0B\x0A\x09_hash_alg*0\x0A\x09DidMethod\x12\x0E\x0A\x0APOLYGON_ID\x10\x00\x12\x13\x0A\x0FPOLYGON_ID_TEST\x10\x01*C\x0A\x0FPublishInterval\x12\x0E\x0A\x0AINTERVAL_5\x10\x00\x12\x0F\x0A\x0BINTERVAL_15\x10\x01\x12\x0F\x0A\x0BINTERVAL_60\x10\x02BW\x0A\x1Bcom.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3"
        , true);

        static::$is_initialized = true;
    }
}

