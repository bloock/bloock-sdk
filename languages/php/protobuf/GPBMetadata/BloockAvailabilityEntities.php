<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_availability_entities.proto

namespace GPBMetadata;

class BloockAvailabilityEntities
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\BloockKeysEntities::initOnce();
        $pool->internalAddGeneratedFile(
            "\x0A\xFB\x04\x0A\"bloock_availability_entities.proto\x12\x06bloock\"\\\x0A\x09Publisher\x12*\x0A\x04type\x18\x01 \x01(\x0E2\x1C.bloock.DataAvailabilityType\x12#\x0A\x04args\x18\x02 \x01(\x0B2\x15.bloock.PublisherArgs\"D\x0A\x0DPublisherArgs\x12&\x0A\x08ipns_key\x18\x01 \x01(\x0B2\x0F.bloock.IpnsKeyH\x00\x88\x01\x01B\x0B\x0A\x09_ipns_key\"V\x0A\x06Loader\x12*\x0A\x04type\x18\x01 \x01(\x0E2\x1C.bloock.DataAvailabilityType\x12 \x0A\x04args\x18\x02 \x01(\x0B2\x12.bloock.LoaderArgs\"\x18\x0A\x0ALoaderArgs\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\"\x9D\x01\x0A\x07IpnsKey\x12,\x0A\x0Bmanaged_key\x18\x01 \x01(\x0B2\x12.bloock.ManagedKeyH\x00\x88\x01\x01\x12<\x0A\x13managed_certificate\x18\x02 \x01(\x0B2\x1A.bloock.ManagedCertificateH\x01\x88\x01\x01B\x0E\x0A\x0C_managed_keyB\x16\x0A\x14_managed_certificate*6\x0A\x14DataAvailabilityType\x12\x0A\x0A\x06HOSTED\x10\x00\x12\x08\x0A\x04IPFS\x10\x01\x12\x08\x0A\x04IPNS\x10\x02BW\x0A\x1Bcom.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3"
        , true);

        static::$is_initialized = true;
    }
}

