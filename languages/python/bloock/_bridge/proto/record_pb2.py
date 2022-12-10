# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: record.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database

# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from . import shared_pb2 as shared__pb2
from . import config_pb2 as config__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(
    b'\n\x0crecord.proto\x12\x06\x62loock\x1a\x0cshared.proto\x1a\x0c\x63onfig.proto"\x15\n\x13GenerateKeysRequest"j\n\x14GenerateKeysResponse\x12\x12\n\nprivateKey\x18\x01 \x01(\t\x12\x11\n\tpublicKey\x18\x02 \x01(\t\x12!\n\x05\x65rror\x18\x03 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error"\x1b\n\x19GenerateRsaKeyPairRequest"p\n\x1aGenerateRsaKeyPairResponse\x12\x12\n\nprivateKey\x18\x01 \x01(\t\x12\x11\n\tpublicKey\x18\x02 \x01(\t\x12!\n\x05\x65rror\x18\x03 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error"G\n\nRecordHash\x12\x0c\n\x04hash\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error"f\n\x10RecordSignatures\x12%\n\nsignatures\x18\x01 \x03(\x0b\x32\x11.bloock.Signature\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error"\x1a\n\x0cRecordHeader\x12\n\n\x02ty\x18\x01 \x01(\t"\x19\n\x06Record\x12\x0f\n\x07payload\x18\x02 \x01(\x0c"J\n\x06Signer\x12\x1e\n\x03\x61lg\x18\x01 \x01(\x0e\x32\x11.bloock.SignerAlg\x12 \n\x04\x61rgs\x18\x02 \x01(\x0b\x32\x12.bloock.SignerArgs"6\n\nSignerArgs\x12\x18\n\x0bprivate_key\x18\x01 \x01(\tH\x00\x88\x01\x01\x42\x0e\n\x0c_private_key"T\n\tEncrypter\x12"\n\x03\x61lg\x18\x01 \x01(\x0e\x32\x15.bloock.EncryptionAlg\x12#\n\x04\x61rgs\x18\x02 \x01(\x0b\x32\x15.bloock.EncrypterArgs"\x1c\n\rEncrypterArgs\x12\x0b\n\x03key\x18\x01 \x01(\t"T\n\tDecrypter\x12"\n\x03\x61lg\x18\x01 \x01(\x0e\x32\x15.bloock.EncryptionAlg\x12#\n\x04\x61rgs\x18\x02 \x01(\x0b\x32\x15.bloock.DecrypterArgs"\x1c\n\rDecrypterArgs\x12\x0b\n\x03key\x18\x01 \x01(\t"Z\n\tSignature\x12\x11\n\tsignature\x18\x01 \x01(\t\x12\x11\n\tprotected\x18\x02 \x01(\t\x12\'\n\x06header\x18\x03 \x01(\x0b\x32\x17.bloock.SignatureHeader"+\n\x0fSignatureHeader\x12\x0b\n\x03\x61lg\x18\x01 \x01(\t\x12\x0b\n\x03kid\x18\x02 \x01(\t"O\n\rRecordReceipt\x12\x0e\n\x06\x61nchor\x18\x01 \x01(\x03\x12\x0e\n\x06\x63lient\x18\x02 \x01(\t\x12\x0e\n\x06record\x18\x03 \x01(\t\x12\x0e\n\x06status\x18\x04 \x01(\t"\xd3\x01\n\x1eRecordBuilderFromStringRequest\x12\x0f\n\x07payload\x18\x01 \x01(\t\x12#\n\x06signer\x18\x02 \x01(\x0b\x32\x0e.bloock.SignerH\x00\x88\x01\x01\x12)\n\tencrypter\x18\x03 \x01(\x0b\x32\x11.bloock.EncrypterH\x01\x88\x01\x01\x12)\n\tdecrypter\x18\x04 \x01(\x0b\x32\x11.bloock.DecrypterH\x02\x88\x01\x01\x42\t\n\x07_signerB\x0c\n\n_encrypterB\x0c\n\n_decrypter"\xd0\x01\n\x1bRecordBuilderFromHexRequest\x12\x0f\n\x07payload\x18\x01 \x01(\t\x12#\n\x06signer\x18\x02 \x01(\x0b\x32\x0e.bloock.SignerH\x00\x88\x01\x01\x12)\n\tencrypter\x18\x03 \x01(\x0b\x32\x11.bloock.EncrypterH\x01\x88\x01\x01\x12)\n\tdecrypter\x18\x04 \x01(\x0b\x32\x11.bloock.DecrypterH\x02\x88\x01\x01\x42\t\n\x07_signerB\x0c\n\n_encrypterB\x0c\n\n_decrypter"\xd1\x01\n\x1cRecordBuilderFromJSONRequest\x12\x0f\n\x07payload\x18\x01 \x01(\t\x12#\n\x06signer\x18\x02 \x01(\x0b\x32\x0e.bloock.SignerH\x00\x88\x01\x01\x12)\n\tencrypter\x18\x03 \x01(\x0b\x32\x11.bloock.EncrypterH\x01\x88\x01\x01\x12)\n\tdecrypter\x18\x04 \x01(\x0b\x32\x11.bloock.DecrypterH\x02\x88\x01\x01\x42\t\n\x07_signerB\x0c\n\n_encrypterB\x0c\n\n_decrypter"\xd2\x01\n\x1dRecordBuilderFromBytesRequest\x12\x0f\n\x07payload\x18\x01 \x01(\x0c\x12#\n\x06signer\x18\x02 \x01(\x0b\x32\x0e.bloock.SignerH\x00\x88\x01\x01\x12)\n\tencrypter\x18\x03 \x01(\x0b\x32\x11.bloock.EncrypterH\x01\x88\x01\x01\x12)\n\tdecrypter\x18\x04 \x01(\x0b\x32\x11.bloock.DecrypterH\x02\x88\x01\x01\x42\t\n\x07_signerB\x0c\n\n_encrypterB\x0c\n\n_decrypter"\xd1\x01\n\x1cRecordBuilderFromFileRequest\x12\x0f\n\x07payload\x18\x01 \x01(\x0c\x12#\n\x06signer\x18\x02 \x01(\x0b\x32\x0e.bloock.SignerH\x00\x88\x01\x01\x12)\n\tencrypter\x18\x03 \x01(\x0b\x32\x11.bloock.EncrypterH\x01\x88\x01\x01\x12)\n\tdecrypter\x18\x04 \x01(\x0b\x32\x11.bloock.DecrypterH\x02\x88\x01\x01\x42\t\n\x07_signerB\x0c\n\n_encrypterB\x0c\n\n_decrypter"\xe3\x01\n\x1eRecordBuilderFromRecordRequest\x12\x1f\n\x07payload\x18\x01 \x01(\x0b\x32\x0e.bloock.Record\x12#\n\x06signer\x18\x02 \x01(\x0b\x32\x0e.bloock.SignerH\x00\x88\x01\x01\x12)\n\tencrypter\x18\x03 \x01(\x0b\x32\x11.bloock.EncrypterH\x01\x88\x01\x01\x12)\n\tdecrypter\x18\x04 \x01(\x0b\x32\x11.bloock.DecrypterH\x02\x88\x01\x01\x42\t\n\x07_signerB\x0c\n\n_encrypterB\x0c\n\n_decrypter"d\n\x15RecordBuilderResponse\x12\x1e\n\x06record\x18\x01 \x01(\x0b\x32\x0e.bloock.Record\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error"N\n\x12SendRecordsRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x0f\n\x07records\x18\x02 \x03(\t"j\n\x13SendRecordsResponse\x12&\n\x07records\x18\x01 \x03(\x0b\x32\x15.bloock.RecordReceipt\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error"V\n\x06Loader\x12*\n\x04type\x18\x01 \x01(\x0e\x32\x1c.bloock.DataAvailabilityType\x12 \n\x04\x61rgs\x18\x02 \x01(\x0b\x32\x12.bloock.LoaderArgs"\x1a\n\nLoaderArgs\x12\x0c\n\x04hash\x18\x01 \x01(\t"\x8b\x02\n\x1eRecordBuilderFromLoaderRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12\x1e\n\x06loader\x18\x02 \x01(\x0b\x32\x0e.bloock.Loader\x12#\n\x06signer\x18\x03 \x01(\x0b\x32\x0e.bloock.SignerH\x00\x88\x01\x01\x12)\n\tencrypter\x18\x04 \x01(\x0b\x32\x11.bloock.EncrypterH\x01\x88\x01\x01\x12)\n\tdecrypter\x18\x05 \x01(\x0b\x32\x11.bloock.DecrypterH\x02\x88\x01\x01\x42\t\n\x07_signerB\x0c\n\n_encrypterB\x0c\n\n_decrypter"\\\n\tPublisher\x12*\n\x04type\x18\x01 \x01(\x0e\x32\x1c.bloock.DataAvailabilityType\x12#\n\x04\x61rgs\x18\x02 \x01(\x0b\x32\x15.bloock.PublisherArgs"\x0f\n\rPublisherArgs"\x7f\n\x0ePublishRequest\x12\'\n\x0b\x63onfig_data\x18\x01 \x01(\x0b\x32\x12.bloock.ConfigData\x12$\n\tpublisher\x18\x02 \x01(\x0b\x32\x11.bloock.Publisher\x12\x1e\n\x06record\x18\x03 \x01(\x0b\x32\x0e.bloock.Record"L\n\x0fPublishResponse\x12\x0c\n\x04hash\x18\x01 \x01(\t\x12!\n\x05\x65rror\x18\x02 \x01(\x0b\x32\r.bloock.ErrorH\x00\x88\x01\x01\x42\x08\n\x06_error*Y\n\x0bRecordTypes\x12\n\n\x06STRING\x10\x00\x12\x07\n\x03HEX\x10\x01\x12\x08\n\x04JSON\x10\x02\x12\t\n\x05\x42YTES\x10\x03\x12\x08\n\x04\x46ILE\x10\x04\x12\n\n\x06RECORD\x10\x05\x12\n\n\x06LOADER\x10\x06*\x17\n\tSignerAlg\x12\n\n\x06\x45S256K\x10\x00*%\n\rEncryptionAlg\x12\x0b\n\x07\x41\x32\x35\x36GCM\x10\x00\x12\x07\n\x03RSA\x10\x01*"\n\x14\x44\x61taAvailabilityType\x12\n\n\x06HOSTED\x10\x00\x32\xb5\x08\n\rRecordService\x12\x46\n\x0bSendRecords\x12\x1a.bloock.SendRecordsRequest\x1a\x1b.bloock.SendRecordsResponse\x12^\n\x15\x42uildRecordFromString\x12&.bloock.RecordBuilderFromStringRequest\x1a\x1d.bloock.RecordBuilderResponse\x12X\n\x12\x42uildRecordFromHex\x12#.bloock.RecordBuilderFromHexRequest\x1a\x1d.bloock.RecordBuilderResponse\x12Z\n\x13\x42uildRecordFromJson\x12$.bloock.RecordBuilderFromJSONRequest\x1a\x1d.bloock.RecordBuilderResponse\x12Z\n\x13\x42uildRecordFromFile\x12$.bloock.RecordBuilderFromFileRequest\x1a\x1d.bloock.RecordBuilderResponse\x12\\\n\x14\x42uildRecordFromBytes\x12%.bloock.RecordBuilderFromBytesRequest\x1a\x1d.bloock.RecordBuilderResponse\x12^\n\x15\x42uildRecordFromRecord\x12&.bloock.RecordBuilderFromRecordRequest\x1a\x1d.bloock.RecordBuilderResponse\x12^\n\x15\x42uildRecordFromLoader\x12&.bloock.RecordBuilderFromLoaderRequest\x1a\x1d.bloock.RecordBuilderResponse\x12-\n\x07GetHash\x12\x0e.bloock.Record\x1a\x12.bloock.RecordHash\x12\x39\n\rGetSignatures\x12\x0e.bloock.Record\x1a\x18.bloock.RecordSignatures\x12I\n\x0cGenerateKeys\x12\x1b.bloock.GenerateKeysRequest\x1a\x1c.bloock.GenerateKeysResponse\x12[\n\x12GenerateRsaKeyPair\x12!.bloock.GenerateRsaKeyPairRequest\x1a".bloock.GenerateRsaKeyPairResponse\x12:\n\x07Publish\x12\x16.bloock.PublishRequest\x1a\x17.bloock.PublishResponseBW\n\x1b\x63om.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protob\x06proto3'
)

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, "record_pb2", globals())
if _descriptor._USE_C_DESCRIPTORS == False:

    DESCRIPTOR._options = None
    DESCRIPTOR._serialized_options = b"\n\033com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
    _RECORDTYPES._serialized_start = 3426
    _RECORDTYPES._serialized_end = 3515
    _SIGNERALG._serialized_start = 3517
    _SIGNERALG._serialized_end = 3540
    _ENCRYPTIONALG._serialized_start = 3542
    _ENCRYPTIONALG._serialized_end = 3579
    _DATAAVAILABILITYTYPE._serialized_start = 3581
    _DATAAVAILABILITYTYPE._serialized_end = 3615
    _GENERATEKEYSREQUEST._serialized_start = 52
    _GENERATEKEYSREQUEST._serialized_end = 73
    _GENERATEKEYSRESPONSE._serialized_start = 75
    _GENERATEKEYSRESPONSE._serialized_end = 181
    _GENERATERSAKEYPAIRREQUEST._serialized_start = 183
    _GENERATERSAKEYPAIRREQUEST._serialized_end = 210
    _GENERATERSAKEYPAIRRESPONSE._serialized_start = 212
    _GENERATERSAKEYPAIRRESPONSE._serialized_end = 324
    _RECORDHASH._serialized_start = 326
    _RECORDHASH._serialized_end = 397
    _RECORDSIGNATURES._serialized_start = 399
    _RECORDSIGNATURES._serialized_end = 501
    _RECORDHEADER._serialized_start = 503
    _RECORDHEADER._serialized_end = 529
    _RECORD._serialized_start = 531
    _RECORD._serialized_end = 556
    _SIGNER._serialized_start = 558
    _SIGNER._serialized_end = 632
    _SIGNERARGS._serialized_start = 634
    _SIGNERARGS._serialized_end = 688
    _ENCRYPTER._serialized_start = 690
    _ENCRYPTER._serialized_end = 774
    _ENCRYPTERARGS._serialized_start = 776
    _ENCRYPTERARGS._serialized_end = 804
    _DECRYPTER._serialized_start = 806
    _DECRYPTER._serialized_end = 890
    _DECRYPTERARGS._serialized_start = 892
    _DECRYPTERARGS._serialized_end = 920
    _SIGNATURE._serialized_start = 922
    _SIGNATURE._serialized_end = 1012
    _SIGNATUREHEADER._serialized_start = 1014
    _SIGNATUREHEADER._serialized_end = 1057
    _RECORDRECEIPT._serialized_start = 1059
    _RECORDRECEIPT._serialized_end = 1138
    _RECORDBUILDERFROMSTRINGREQUEST._serialized_start = 1141
    _RECORDBUILDERFROMSTRINGREQUEST._serialized_end = 1352
    _RECORDBUILDERFROMHEXREQUEST._serialized_start = 1355
    _RECORDBUILDERFROMHEXREQUEST._serialized_end = 1563
    _RECORDBUILDERFROMJSONREQUEST._serialized_start = 1566
    _RECORDBUILDERFROMJSONREQUEST._serialized_end = 1775
    _RECORDBUILDERFROMBYTESREQUEST._serialized_start = 1778
    _RECORDBUILDERFROMBYTESREQUEST._serialized_end = 1988
    _RECORDBUILDERFROMFILEREQUEST._serialized_start = 1991
    _RECORDBUILDERFROMFILEREQUEST._serialized_end = 2200
    _RECORDBUILDERFROMRECORDREQUEST._serialized_start = 2203
    _RECORDBUILDERFROMRECORDREQUEST._serialized_end = 2430
    _RECORDBUILDERRESPONSE._serialized_start = 2432
    _RECORDBUILDERRESPONSE._serialized_end = 2532
    _SENDRECORDSREQUEST._serialized_start = 2534
    _SENDRECORDSREQUEST._serialized_end = 2612
    _SENDRECORDSRESPONSE._serialized_start = 2614
    _SENDRECORDSRESPONSE._serialized_end = 2720
    _LOADER._serialized_start = 2722
    _LOADER._serialized_end = 2808
    _LOADERARGS._serialized_start = 2810
    _LOADERARGS._serialized_end = 2836
    _RECORDBUILDERFROMLOADERREQUEST._serialized_start = 2839
    _RECORDBUILDERFROMLOADERREQUEST._serialized_end = 3106
    _PUBLISHER._serialized_start = 3108
    _PUBLISHER._serialized_end = 3200
    _PUBLISHERARGS._serialized_start = 3202
    _PUBLISHERARGS._serialized_end = 3217
    _PUBLISHREQUEST._serialized_start = 3219
    _PUBLISHREQUEST._serialized_end = 3346
    _PUBLISHRESPONSE._serialized_start = 3348
    _PUBLISHRESPONSE._serialized_end = 3424
    _RECORDSERVICE._serialized_start = 3618
    _RECORDSERVICE._serialized_end = 4695
# @@protoc_insertion_point(module_scope)
