<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: bloock_keys_entities.proto

namespace GPBMetadata;

class BloockKeysEntities
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        $pool->internalAddGeneratedFile(
            "\x0A\xF5\x0F\x0A\x1Abloock_keys_entities.proto\x12\x06bloock\"d\x0A\x08LocalKey\x12\x0B\x0A\x03key\x18\x01 \x01(\x09\x12!\x0A\x08key_type\x18\x02 \x01(\x0E2\x0F.bloock.KeyType\x12\x18\x0A\x0Bprivate_key\x18\x03 \x01(\x09H\x00\x88\x01\x01B\x0E\x0A\x0C_private_key\"\xA9\x01\x0A\x10ManagedKeyParams\x12.\x0A\x0Aprotection\x18\x01 \x01(\x0E2\x1A.bloock.KeyProtectionLevel\x12!\x0A\x08key_type\x18\x02 \x01(\x0E2\x0F.bloock.KeyType\x12\x11\x0A\x04name\x18\x03 \x01(\x09H\x00\x88\x01\x01\x12\x17\x0A\x0Aexpiration\x18\x04 \x01(\x03H\x01\x88\x01\x01B\x07\x0A\x05_nameB\x0D\x0A\x0B_expiration\"\xD2\x01\x0A\x0AManagedKey\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x0B\x0A\x03key\x18\x02 \x01(\x09\x12.\x0A\x0Aprotection\x18\x03 \x01(\x0E2\x1A.bloock.KeyProtectionLevel\x12!\x0A\x08key_type\x18\x04 \x01(\x0E2\x0F.bloock.KeyType\x12\x0C\x0A\x04name\x18\x05 \x01(\x09\x12\x12\x0A\x0Aexpiration\x18\x06 \x01(\x03\x126\x0A\x13access_control_type\x18\x07 \x01(\x0E2\x19.bloock.AccessControlType\"\xF3\x01\x0A\x12CertificateSubject\x12\x13\x0A\x0Bcommon_name\x18\x01 \x01(\x09\x12 \x0A\x13organizational_unit\x18\x02 \x01(\x09H\x00\x88\x01\x01\x12\x19\x0A\x0Corganization\x18\x03 \x01(\x09H\x01\x88\x01\x01\x12\x15\x0A\x08location\x18\x04 \x01(\x09H\x02\x88\x01\x01\x12\x12\x0A\x05state\x18\x05 \x01(\x09H\x03\x88\x01\x01\x12\x14\x0A\x07country\x18\x06 \x01(\x09H\x04\x88\x01\x01B\x16\x0A\x14_organizational_unitB\x0F\x0A\x0D_organizationB\x0B\x0A\x09_locationB\x08\x0A\x06_stateB\x0A\x0A\x08_country\"\x8E\x01\x0A\x16LocalCertificateParams\x12!\x0A\x08key_type\x18\x01 \x01(\x0E2\x0F.bloock.KeyType\x12\x10\x0A\x08password\x18\x02 \x01(\x09\x12+\x0A\x07subject\x18\x03 \x01(\x0B2\x1A.bloock.CertificateSubject\x12\x12\x0A\x0Aexpiration\x18\x04 \x01(\x05\"4\x0A\x10LocalCertificate\x12\x0E\x0A\x06pkcs12\x18\x01 \x01(\x0C\x12\x10\x0A\x08password\x18\x02 \x01(\x09\"~\x0A\x18ManagedCertificateParams\x12!\x0A\x08key_type\x18\x01 \x01(\x0E2\x0F.bloock.KeyType\x12\x12\x0A\x0Aexpiration\x18\x02 \x01(\x05\x12+\x0A\x07subject\x18\x03 \x01(\x0B2\x1A.bloock.CertificateSubject\"\xCC\x01\x0A\x12ManagedCertificate\x12\x0A\x0A\x02id\x18\x01 \x01(\x09\x12\x0B\x0A\x03key\x18\x02 \x01(\x09\x12.\x0A\x0Aprotection\x18\x03 \x01(\x0E2\x1A.bloock.KeyProtectionLevel\x12!\x0A\x08key_type\x18\x04 \x01(\x0E2\x0F.bloock.KeyType\x12\x12\x0A\x0Aexpiration\x18\x06 \x01(\x03\x126\x0A\x13access_control_type\x18\x07 \x01(\x0E2\x19.bloock.AccessControlType\"\xBF\x01\x0A\x0DAccessControl\x12;\x0A\x13access_control_totp\x18\x01 \x01(\x0B2\x19.bloock.AccessControlTotpH\x00\x88\x01\x01\x12?\x0A\x15access_control_secret\x18\x02 \x01(\x0B2\x1B.bloock.AccessControlSecretH\x01\x88\x01\x01B\x16\x0A\x14_access_control_totpB\x18\x0A\x16_access_control_secret\"!\x0A\x11AccessControlTotp\x12\x0C\x0A\x04code\x18\x01 \x01(\x09\"%\x0A\x13AccessControlSecret\x12\x0E\x0A\x06secret\x18\x01 \x01(\x09\"{\x0A\x03Key\x12(\x0A\x09local_key\x18\x01 \x01(\x0B2\x10.bloock.LocalKeyH\x00\x88\x01\x01\x12,\x0A\x0Bmanaged_key\x18\x02 \x01(\x0B2\x12.bloock.ManagedKeyH\x01\x88\x01\x01B\x0C\x0A\x0A_local_keyB\x0E\x0A\x0C_managed_key*^\x0A\x07KeyType\x12\x0B\x0A\x07EcP256k\x10\x00\x12\x0B\x0A\x07Rsa2048\x10\x01\x12\x0B\x0A\x07Rsa3072\x10\x02\x12\x0B\x0A\x07Rsa4096\x10\x03\x12\x0A\x0A\x06Aes128\x10\x04\x12\x0A\x0A\x06Aes256\x10\x05\x12\x07\x0A\x03Bjj\x10\x06*+\x0A\x12KeyProtectionLevel\x12\x0C\x0A\x08SOFTWARE\x10\x00\x12\x07\x0A\x03HSM\x10\x01*@\x0A\x11AccessControlType\x12\x15\x0A\x11NO_ACCESS_CONTROL\x10\x00\x12\x08\x0A\x04TOTP\x10\x01\x12\x0A\x0A\x06SECRET\x10\x02*#\x0A\x0FCertificateType\x12\x07\x0A\x03PEM\x10\x00\x12\x07\x0A\x03PFX\x10\x01BW\x0A\x1Bcom.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3"
        , true);

        static::$is_initialized = true;
    }
}

