<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_identity_core.proto

namespace GPBMetadata;

class BloockIdentityCore
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\BloockConfig::initOnce();
        \GPBMetadata\BloockIdentityEntities::initOnce();
        \GPBMetadata\BloockShared::initOnce();
        \GPBMetadata\BloockKeysEntities::initOnce();
        $pool->internalAddGeneratedFile(
            "\x0A\xE7\x07\x0A\x1Abloock_identity_core.proto\x12\x06bloock\x1A\x1Ebloock_identity_entities.proto\x1A\x13bloock_shared.proto\x1A\x1Abloock_keys_entities.proto\"\x8F\x04\x0A\x1BCreateCoreCredentialRequest\x12'\x0A\x0Bconfig_data\x18\x01 \x01(\x0B2\x12.bloock.ConfigData\x12\x11\x0A\x09schema_id\x18\x02 \x01(\x09\x12\x12\x0A\x0Aissuer_did\x18\x03 \x01(\x09\x12\x12\x0A\x0Aholder_did\x18\x04 \x01(\x09\x12\x12\x0A\x0Aexpiration\x18\x05 \x01(\x03\x12\x14\x0A\x07version\x18\x06 \x01(\x05H\x00\x88\x01\x01\x12\x18\x0A\x03key\x18\x07 \x01(\x0B2\x0B.bloock.Key\x122\x0A\x11string_attributes\x18\x08 \x03(\x0B2\x17.bloock.StringAttribute\x124\x0A\x12integer_attributes\x18\x09 \x03(\x0B2\x18.bloock.IntegerAttribute\x124\x0A\x12decimal_attributes\x18\x0A \x03(\x0B2\x18.bloock.DecimalAttribute\x124\x0A\x12boolean_attributes\x18\x0B \x03(\x0B2\x18.bloock.BooleanAttribute\x12.\x0A\x0Fdate_attributes\x18\x0C \x03(\x0B2\x15.bloock.DateAttribute\x126\x0A\x13datetime_attributes\x18\x0D \x03(\x0B2\x19.bloock.DateTimeAttributeB\x0A\x0A\x08_version\"\x82\x01\x0A\x1CCreateCoreCredentialResponse\x125\x0A\x12credential_receipt\x18\x01 \x01(\x0B2\x19.bloock.CredentialReceipt\x12!\x0A\x05error\x18\x02 \x01(\x0B2\x0D.bloock.ErrorH\x00\x88\x01\x01B\x08\x0A\x06_error2x\x0A\x13IdentityCoreService\x12a\x0A\x14CreateCoreCredential\x12#.bloock.CreateCoreCredentialRequest\x1A\$.bloock.CreateCoreCredentialResponseBW\x0A\x1Bcom.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3"
        , true);

        static::$is_initialized = true;
    }
}

