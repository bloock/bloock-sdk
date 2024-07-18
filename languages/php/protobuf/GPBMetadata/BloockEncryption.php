<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_encryption.proto

namespace GPBMetadata;

class BloockEncryption
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\BloockRecordEntities::initOnce();
        \GPBMetadata\BloockEncryptionEntities::initOnce();
        \GPBMetadata\BloockShared::initOnce();
        \GPBMetadata\BloockConfig::initOnce();
        $pool->internalAddGeneratedFile(
            "\x0A\xBA\x08\x0A\x17bloock_encryption.proto\x12\x06bloock\x1A bloock_encryption_entities.proto\x1A\x13bloock_shared.proto\x1A\x13bloock_config.proto\"\x7F\x0A\x0EEncryptRequest\x12'\x0A\x0Bconfig_data\x18\x01 \x01(\x0B2\x12.bloock.ConfigData\x12\x1E\x0A\x06record\x18\x02 \x01(\x0B2\x0E.bloock.Record\x12\$\x0A\x09encrypter\x18\x03 \x01(\x0B2\x11.bloock.Encrypter\"^\x0A\x0FEncryptResponse\x12\x1E\x0A\x06record\x18\x01 \x01(\x0B2\x0E.bloock.Record\x12!\x0A\x05error\x18\x02 \x01(\x0B2\x0D.bloock.ErrorH\x00\x88\x01\x01B\x08\x0A\x06_error\"\x7F\x0A\x0EDecryptRequest\x12'\x0A\x0Bconfig_data\x18\x01 \x01(\x0B2\x12.bloock.ConfigData\x12\x1E\x0A\x06record\x18\x02 \x01(\x0B2\x0E.bloock.Record\x12\$\x0A\x09decrypter\x18\x03 \x01(\x0B2\x11.bloock.Encrypter\"^\x0A\x0FDecryptResponse\x12\x1E\x0A\x06record\x18\x01 \x01(\x0B2\x0E.bloock.Record\x12!\x0A\x05error\x18\x02 \x01(\x0B2\x0D.bloock.ErrorH\x00\x88\x01\x01B\x08\x0A\x06_error\"_\x0A\x14EncryptionAlgRequest\x12'\x0A\x0Bconfig_data\x18\x01 \x01(\x0B2\x12.bloock.ConfigData\x12\x1E\x0A\x06record\x18\x02 \x01(\x0B2\x0E.bloock.Record\"h\x0A\x15EncryptionAlgResponse\x12\"\x0A\x03alg\x18\x01 \x01(\x0E2\x15.bloock.EncryptionAlg\x12!\x0A\x05error\x18\x02 \x01(\x0B2\x0D.bloock.ErrorH\x00\x88\x01\x01B\x08\x0A\x06_error2\xDC\x01\x0A\x11EncryptionService\x12:\x0A\x07Encrypt\x12\x16.bloock.EncryptRequest\x1A\x17.bloock.EncryptResponse\x12:\x0A\x07Decrypt\x12\x16.bloock.DecryptRequest\x1A\x17.bloock.DecryptResponse\x12O\x0A\x10GetEncryptionAlg\x12\x1C.bloock.EncryptionAlgRequest\x1A\x1D.bloock.EncryptionAlgResponseBW\x0A\x1Bcom.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3"
        , true);

        static::$is_initialized = true;
    }
}
