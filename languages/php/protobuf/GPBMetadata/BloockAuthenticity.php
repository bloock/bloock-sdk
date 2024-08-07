<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_authenticity.proto

namespace GPBMetadata;

class BloockAuthenticity
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\BloockAuthenticityEntities::initOnce();
        \GPBMetadata\BloockRecordEntities::initOnce();
        \GPBMetadata\BloockShared::initOnce();
        \GPBMetadata\BloockConfig::initOnce();
        $pool->internalAddGeneratedFile(
            "\x0A\xEF\x07\x0A\x19bloock_authenticity.proto\x12\x06bloock\x1A\x1Cbloock_record_entities.proto\x1A\x13bloock_shared.proto\x1A\x13bloock_config.proto\"v\x0A\x0BSignRequest\x12'\x0A\x0Bconfig_data\x18\x01 \x01(\x0B2\x12.bloock.ConfigData\x12\x1E\x0A\x06record\x18\x02 \x01(\x0B2\x0E.bloock.Record\x12\x1E\x0A\x06signer\x18\x03 \x01(\x0B2\x0E.bloock.Signer\"a\x0A\x0CSignResponse\x12\$\x0A\x09signature\x18\x01 \x01(\x0B2\x11.bloock.Signature\x12!\x0A\x05error\x18\x02 \x01(\x0B2\x0D.bloock.ErrorH\x00\x88\x01\x01B\x08\x0A\x06_error\"X\x0A\x0DVerifyRequest\x12'\x0A\x0Bconfig_data\x18\x01 \x01(\x0B2\x12.bloock.ConfigData\x12\x1E\x0A\x06record\x18\x02 \x01(\x0B2\x0E.bloock.Record\"L\x0A\x0EVerifyResponse\x12\x0D\x0A\x05valid\x18\x01 \x01(\x08\x12!\x0A\x05error\x18\x02 \x01(\x0B2\x0D.bloock.ErrorH\x00\x88\x01\x01B\x08\x0A\x06_error\"_\x0A\x14GetSignaturesRequest\x12'\x0A\x0Bconfig_data\x18\x01 \x01(\x0B2\x12.bloock.ConfigData\x12\x1E\x0A\x06record\x18\x02 \x01(\x0B2\x0E.bloock.Record\"k\x0A\x15GetSignaturesResponse\x12%\x0A\x0Asignatures\x18\x01 \x03(\x0B2\x11.bloock.Signature\x12!\x0A\x05error\x18\x02 \x01(\x0B2\x0D.bloock.ErrorH\x00\x88\x01\x01B\x08\x0A\x06_error2\xCF\x01\x0A\x13AuthenticityService\x121\x0A\x04Sign\x12\x13.bloock.SignRequest\x1A\x14.bloock.SignResponse\x127\x0A\x06Verify\x12\x15.bloock.VerifyRequest\x1A\x16.bloock.VerifyResponse\x12L\x0A\x0DGetSignatures\x12\x1C.bloock.GetSignaturesRequest\x1A\x1D.bloock.GetSignaturesResponseBW\x0A\x1Bcom.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3"
        , true);

        static::$is_initialized = true;
    }
}

