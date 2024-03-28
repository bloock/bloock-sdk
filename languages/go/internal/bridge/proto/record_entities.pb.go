// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v4.25.3
// source: record_entities.proto

package proto

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type RecordTypes int32

const (
	RecordTypes_STRING RecordTypes = 0
	RecordTypes_HEX    RecordTypes = 1
	RecordTypes_JSON   RecordTypes = 2
	RecordTypes_BYTES  RecordTypes = 3
	RecordTypes_FILE   RecordTypes = 4
	RecordTypes_RECORD RecordTypes = 5
	RecordTypes_LOADER RecordTypes = 6
)

// Enum value maps for RecordTypes.
var (
	RecordTypes_name = map[int32]string{
		0: "STRING",
		1: "HEX",
		2: "JSON",
		3: "BYTES",
		4: "FILE",
		5: "RECORD",
		6: "LOADER",
	}
	RecordTypes_value = map[string]int32{
		"STRING": 0,
		"HEX":    1,
		"JSON":   2,
		"BYTES":  3,
		"FILE":   4,
		"RECORD": 5,
		"LOADER": 6,
	}
)

func (x RecordTypes) Enum() *RecordTypes {
	p := new(RecordTypes)
	*p = x
	return p
}

func (x RecordTypes) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (RecordTypes) Descriptor() protoreflect.EnumDescriptor {
	return file_record_entities_proto_enumTypes[0].Descriptor()
}

func (RecordTypes) Type() protoreflect.EnumType {
	return &file_record_entities_proto_enumTypes[0]
}

func (x RecordTypes) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use RecordTypes.Descriptor instead.
func (RecordTypes) EnumDescriptor() ([]byte, []int) {
	return file_record_entities_proto_rawDescGZIP(), []int{0}
}

type RecordHeader struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Ty string `protobuf:"bytes,1,opt,name=ty,proto3" json:"ty,omitempty"`
}

func (x *RecordHeader) Reset() {
	*x = RecordHeader{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_entities_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RecordHeader) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RecordHeader) ProtoMessage() {}

func (x *RecordHeader) ProtoReflect() protoreflect.Message {
	mi := &file_record_entities_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RecordHeader.ProtoReflect.Descriptor instead.
func (*RecordHeader) Descriptor() ([]byte, []int) {
	return file_record_entities_proto_rawDescGZIP(), []int{0}
}

func (x *RecordHeader) GetTy() string {
	if x != nil {
		return x.Ty
	}
	return ""
}

type Record struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData *ConfigData `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3,oneof" json:"config_data,omitempty"`
	Payload    []byte      `protobuf:"bytes,2,opt,name=payload,proto3" json:"payload,omitempty"`
	Hash       string      `protobuf:"bytes,3,opt,name=hash,proto3" json:"hash,omitempty"`
}

func (x *Record) Reset() {
	*x = Record{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_entities_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Record) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Record) ProtoMessage() {}

func (x *Record) ProtoReflect() protoreflect.Message {
	mi := &file_record_entities_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Record.ProtoReflect.Descriptor instead.
func (*Record) Descriptor() ([]byte, []int) {
	return file_record_entities_proto_rawDescGZIP(), []int{1}
}

func (x *Record) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *Record) GetPayload() []byte {
	if x != nil {
		return x.Payload
	}
	return nil
}

func (x *Record) GetHash() string {
	if x != nil {
		return x.Hash
	}
	return ""
}

type IntegrityDetails struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Hash  string `protobuf:"bytes,1,opt,name=hash,proto3" json:"hash,omitempty"`
	Proof *Proof `protobuf:"bytes,2,opt,name=proof,proto3,oneof" json:"proof,omitempty"`
}

func (x *IntegrityDetails) Reset() {
	*x = IntegrityDetails{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_entities_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *IntegrityDetails) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*IntegrityDetails) ProtoMessage() {}

func (x *IntegrityDetails) ProtoReflect() protoreflect.Message {
	mi := &file_record_entities_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use IntegrityDetails.ProtoReflect.Descriptor instead.
func (*IntegrityDetails) Descriptor() ([]byte, []int) {
	return file_record_entities_proto_rawDescGZIP(), []int{2}
}

func (x *IntegrityDetails) GetHash() string {
	if x != nil {
		return x.Hash
	}
	return ""
}

func (x *IntegrityDetails) GetProof() *Proof {
	if x != nil {
		return x.Proof
	}
	return nil
}

type AuthenticityDetails struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Signatures []*Signature `protobuf:"bytes,1,rep,name=signatures,proto3" json:"signatures,omitempty"`
}

func (x *AuthenticityDetails) Reset() {
	*x = AuthenticityDetails{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_entities_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AuthenticityDetails) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AuthenticityDetails) ProtoMessage() {}

func (x *AuthenticityDetails) ProtoReflect() protoreflect.Message {
	mi := &file_record_entities_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AuthenticityDetails.ProtoReflect.Descriptor instead.
func (*AuthenticityDetails) Descriptor() ([]byte, []int) {
	return file_record_entities_proto_rawDescGZIP(), []int{3}
}

func (x *AuthenticityDetails) GetSignatures() []*Signature {
	if x != nil {
		return x.Signatures
	}
	return nil
}

type EncryptionDetails struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Alg     *string `protobuf:"bytes,1,opt,name=alg,proto3,oneof" json:"alg,omitempty"`
	Key     *string `protobuf:"bytes,2,opt,name=key,proto3,oneof" json:"key,omitempty"`
	Subject *string `protobuf:"bytes,3,opt,name=subject,proto3,oneof" json:"subject,omitempty"`
}

func (x *EncryptionDetails) Reset() {
	*x = EncryptionDetails{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_entities_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *EncryptionDetails) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*EncryptionDetails) ProtoMessage() {}

func (x *EncryptionDetails) ProtoReflect() protoreflect.Message {
	mi := &file_record_entities_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use EncryptionDetails.ProtoReflect.Descriptor instead.
func (*EncryptionDetails) Descriptor() ([]byte, []int) {
	return file_record_entities_proto_rawDescGZIP(), []int{4}
}

func (x *EncryptionDetails) GetAlg() string {
	if x != nil && x.Alg != nil {
		return *x.Alg
	}
	return ""
}

func (x *EncryptionDetails) GetKey() string {
	if x != nil && x.Key != nil {
		return *x.Key
	}
	return ""
}

func (x *EncryptionDetails) GetSubject() string {
	if x != nil && x.Subject != nil {
		return *x.Subject
	}
	return ""
}

type AvailabilityDetails struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Size int64   `protobuf:"varint,1,opt,name=size,proto3" json:"size,omitempty"`
	Type *string `protobuf:"bytes,2,opt,name=type,proto3,oneof" json:"type,omitempty"`
}

func (x *AvailabilityDetails) Reset() {
	*x = AvailabilityDetails{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_entities_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AvailabilityDetails) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AvailabilityDetails) ProtoMessage() {}

func (x *AvailabilityDetails) ProtoReflect() protoreflect.Message {
	mi := &file_record_entities_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AvailabilityDetails.ProtoReflect.Descriptor instead.
func (*AvailabilityDetails) Descriptor() ([]byte, []int) {
	return file_record_entities_proto_rawDescGZIP(), []int{5}
}

func (x *AvailabilityDetails) GetSize() int64 {
	if x != nil {
		return x.Size
	}
	return 0
}

func (x *AvailabilityDetails) GetType() string {
	if x != nil && x.Type != nil {
		return *x.Type
	}
	return ""
}

type RecordDetails struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Integrity    *IntegrityDetails    `protobuf:"bytes,1,opt,name=integrity,proto3,oneof" json:"integrity,omitempty"`
	Authenticity *AuthenticityDetails `protobuf:"bytes,2,opt,name=authenticity,proto3,oneof" json:"authenticity,omitempty"`
	Encryption   *EncryptionDetails   `protobuf:"bytes,3,opt,name=encryption,proto3,oneof" json:"encryption,omitempty"`
	Availability *AvailabilityDetails `protobuf:"bytes,4,opt,name=availability,proto3,oneof" json:"availability,omitempty"`
}

func (x *RecordDetails) Reset() {
	*x = RecordDetails{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_entities_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RecordDetails) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RecordDetails) ProtoMessage() {}

func (x *RecordDetails) ProtoReflect() protoreflect.Message {
	mi := &file_record_entities_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RecordDetails.ProtoReflect.Descriptor instead.
func (*RecordDetails) Descriptor() ([]byte, []int) {
	return file_record_entities_proto_rawDescGZIP(), []int{6}
}

func (x *RecordDetails) GetIntegrity() *IntegrityDetails {
	if x != nil {
		return x.Integrity
	}
	return nil
}

func (x *RecordDetails) GetAuthenticity() *AuthenticityDetails {
	if x != nil {
		return x.Authenticity
	}
	return nil
}

func (x *RecordDetails) GetEncryption() *EncryptionDetails {
	if x != nil {
		return x.Encryption
	}
	return nil
}

func (x *RecordDetails) GetAvailability() *AvailabilityDetails {
	if x != nil {
		return x.Availability
	}
	return nil
}

var File_record_entities_proto protoreflect.FileDescriptor

var file_record_entities_proto_rawDesc = []byte{
	0x0a, 0x15, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69, 0x65,
	0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x1a,
	0x0c, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x18, 0x69,
	0x6e, 0x74, 0x65, 0x67, 0x72, 0x69, 0x74, 0x79, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69, 0x65,
	0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1b, 0x61, 0x75, 0x74, 0x68, 0x65, 0x6e, 0x74,
	0x69, 0x63, 0x69, 0x74, 0x79, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69, 0x65, 0x73, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x22, 0x1e, 0x0a, 0x0c, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x48, 0x65,
	0x61, 0x64, 0x65, 0x72, 0x12, 0x0e, 0x0a, 0x02, 0x74, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x02, 0x74, 0x79, 0x22, 0x80, 0x01, 0x0a, 0x06, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x12,
	0x38, 0x0a, 0x0b, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x5f, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f,
	0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x48, 0x00, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x66,
	0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x88, 0x01, 0x01, 0x12, 0x18, 0x0a, 0x07, 0x70, 0x61, 0x79,
	0x6c, 0x6f, 0x61, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x07, 0x70, 0x61, 0x79, 0x6c,
	0x6f, 0x61, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x68, 0x61, 0x73, 0x68, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x04, 0x68, 0x61, 0x73, 0x68, 0x42, 0x0e, 0x0a, 0x0c, 0x5f, 0x63, 0x6f, 0x6e, 0x66,
	0x69, 0x67, 0x5f, 0x64, 0x61, 0x74, 0x61, 0x22, 0x5a, 0x0a, 0x10, 0x49, 0x6e, 0x74, 0x65, 0x67,
	0x72, 0x69, 0x74, 0x79, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x68,
	0x61, 0x73, 0x68, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x68, 0x61, 0x73, 0x68, 0x12,
	0x28, 0x0a, 0x05, 0x70, 0x72, 0x6f, 0x6f, 0x66, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d,
	0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x48, 0x00, 0x52,
	0x05, 0x70, 0x72, 0x6f, 0x6f, 0x66, 0x88, 0x01, 0x01, 0x42, 0x08, 0x0a, 0x06, 0x5f, 0x70, 0x72,
	0x6f, 0x6f, 0x66, 0x22, 0x48, 0x0a, 0x13, 0x41, 0x75, 0x74, 0x68, 0x65, 0x6e, 0x74, 0x69, 0x63,
	0x69, 0x74, 0x79, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x12, 0x31, 0x0a, 0x0a, 0x73, 0x69,
	0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x11,
	0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x53, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72,
	0x65, 0x52, 0x0a, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x73, 0x22, 0x7c, 0x0a,
	0x11, 0x45, 0x6e, 0x63, 0x72, 0x79, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x44, 0x65, 0x74, 0x61, 0x69,
	0x6c, 0x73, 0x12, 0x15, 0x0a, 0x03, 0x61, 0x6c, 0x67, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x48,
	0x00, 0x52, 0x03, 0x61, 0x6c, 0x67, 0x88, 0x01, 0x01, 0x12, 0x15, 0x0a, 0x03, 0x6b, 0x65, 0x79,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x48, 0x01, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x88, 0x01, 0x01,
	0x12, 0x1d, 0x0a, 0x07, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x09, 0x48, 0x02, 0x52, 0x07, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x88, 0x01, 0x01, 0x42,
	0x06, 0x0a, 0x04, 0x5f, 0x61, 0x6c, 0x67, 0x42, 0x06, 0x0a, 0x04, 0x5f, 0x6b, 0x65, 0x79, 0x42,
	0x0a, 0x0a, 0x08, 0x5f, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x22, 0x4b, 0x0a, 0x13, 0x41,
	0x76, 0x61, 0x69, 0x6c, 0x61, 0x62, 0x69, 0x6c, 0x69, 0x74, 0x79, 0x44, 0x65, 0x74, 0x61, 0x69,
	0x6c, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x73, 0x69, 0x7a, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03,
	0x52, 0x04, 0x73, 0x69, 0x7a, 0x65, 0x12, 0x17, 0x0a, 0x04, 0x74, 0x79, 0x70, 0x65, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x04, 0x74, 0x79, 0x70, 0x65, 0x88, 0x01, 0x01, 0x42,
	0x07, 0x0a, 0x05, 0x5f, 0x74, 0x79, 0x70, 0x65, 0x22, 0xd7, 0x02, 0x0a, 0x0d, 0x52, 0x65, 0x63,
	0x6f, 0x72, 0x64, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x12, 0x3b, 0x0a, 0x09, 0x69, 0x6e,
	0x74, 0x65, 0x67, 0x72, 0x69, 0x74, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x18, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x49, 0x6e, 0x74, 0x65, 0x67, 0x72, 0x69, 0x74, 0x79,
	0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x48, 0x00, 0x52, 0x09, 0x69, 0x6e, 0x74, 0x65, 0x67,
	0x72, 0x69, 0x74, 0x79, 0x88, 0x01, 0x01, 0x12, 0x44, 0x0a, 0x0c, 0x61, 0x75, 0x74, 0x68, 0x65,
	0x6e, 0x74, 0x69, 0x63, 0x69, 0x74, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1b, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x41, 0x75, 0x74, 0x68, 0x65, 0x6e, 0x74, 0x69, 0x63,
	0x69, 0x74, 0x79, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x48, 0x01, 0x52, 0x0c, 0x61, 0x75,
	0x74, 0x68, 0x65, 0x6e, 0x74, 0x69, 0x63, 0x69, 0x74, 0x79, 0x88, 0x01, 0x01, 0x12, 0x3e, 0x0a,
	0x0a, 0x65, 0x6e, 0x63, 0x72, 0x79, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x19, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x45, 0x6e, 0x63, 0x72, 0x79,
	0x70, 0x74, 0x69, 0x6f, 0x6e, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x48, 0x02, 0x52, 0x0a,
	0x65, 0x6e, 0x63, 0x72, 0x79, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x88, 0x01, 0x01, 0x12, 0x44, 0x0a,
	0x0c, 0x61, 0x76, 0x61, 0x69, 0x6c, 0x61, 0x62, 0x69, 0x6c, 0x69, 0x74, 0x79, 0x18, 0x04, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x41, 0x76, 0x61,
	0x69, 0x6c, 0x61, 0x62, 0x69, 0x6c, 0x69, 0x74, 0x79, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73,
	0x48, 0x03, 0x52, 0x0c, 0x61, 0x76, 0x61, 0x69, 0x6c, 0x61, 0x62, 0x69, 0x6c, 0x69, 0x74, 0x79,
	0x88, 0x01, 0x01, 0x42, 0x0c, 0x0a, 0x0a, 0x5f, 0x69, 0x6e, 0x74, 0x65, 0x67, 0x72, 0x69, 0x74,
	0x79, 0x42, 0x0f, 0x0a, 0x0d, 0x5f, 0x61, 0x75, 0x74, 0x68, 0x65, 0x6e, 0x74, 0x69, 0x63, 0x69,
	0x74, 0x79, 0x42, 0x0d, 0x0a, 0x0b, 0x5f, 0x65, 0x6e, 0x63, 0x72, 0x79, 0x70, 0x74, 0x69, 0x6f,
	0x6e, 0x42, 0x0f, 0x0a, 0x0d, 0x5f, 0x61, 0x76, 0x61, 0x69, 0x6c, 0x61, 0x62, 0x69, 0x6c, 0x69,
	0x74, 0x79, 0x2a, 0x59, 0x0a, 0x0b, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x54, 0x79, 0x70, 0x65,
	0x73, 0x12, 0x0a, 0x0a, 0x06, 0x53, 0x54, 0x52, 0x49, 0x4e, 0x47, 0x10, 0x00, 0x12, 0x07, 0x0a,
	0x03, 0x48, 0x45, 0x58, 0x10, 0x01, 0x12, 0x08, 0x0a, 0x04, 0x4a, 0x53, 0x4f, 0x4e, 0x10, 0x02,
	0x12, 0x09, 0x0a, 0x05, 0x42, 0x59, 0x54, 0x45, 0x53, 0x10, 0x03, 0x12, 0x08, 0x0a, 0x04, 0x46,
	0x49, 0x4c, 0x45, 0x10, 0x04, 0x12, 0x0a, 0x0a, 0x06, 0x52, 0x45, 0x43, 0x4f, 0x52, 0x44, 0x10,
	0x05, 0x12, 0x0a, 0x0a, 0x06, 0x4c, 0x4f, 0x41, 0x44, 0x45, 0x52, 0x10, 0x06, 0x42, 0x57, 0x0a,
	0x1b, 0x63, 0x6f, 0x6d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x73, 0x64, 0x6b, 0x2e,
	0x62, 0x72, 0x69, 0x64, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x5a, 0x38, 0x67, 0x69,
	0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2f,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2d, 0x73, 0x64, 0x6b, 0x2d, 0x67, 0x6f, 0x2f, 0x76, 0x32,
	0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x62, 0x72, 0x69, 0x64, 0x67, 0x65,
	0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_record_entities_proto_rawDescOnce sync.Once
	file_record_entities_proto_rawDescData = file_record_entities_proto_rawDesc
)

func file_record_entities_proto_rawDescGZIP() []byte {
	file_record_entities_proto_rawDescOnce.Do(func() {
		file_record_entities_proto_rawDescData = protoimpl.X.CompressGZIP(file_record_entities_proto_rawDescData)
	})
	return file_record_entities_proto_rawDescData
}

var file_record_entities_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_record_entities_proto_msgTypes = make([]protoimpl.MessageInfo, 7)
var file_record_entities_proto_goTypes = []interface{}{
	(RecordTypes)(0),            // 0: bloock.RecordTypes
	(*RecordHeader)(nil),        // 1: bloock.RecordHeader
	(*Record)(nil),              // 2: bloock.Record
	(*IntegrityDetails)(nil),    // 3: bloock.IntegrityDetails
	(*AuthenticityDetails)(nil), // 4: bloock.AuthenticityDetails
	(*EncryptionDetails)(nil),   // 5: bloock.EncryptionDetails
	(*AvailabilityDetails)(nil), // 6: bloock.AvailabilityDetails
	(*RecordDetails)(nil),       // 7: bloock.RecordDetails
	(*ConfigData)(nil),          // 8: bloock.ConfigData
	(*Proof)(nil),               // 9: bloock.Proof
	(*Signature)(nil),           // 10: bloock.Signature
}
var file_record_entities_proto_depIdxs = []int32{
	8,  // 0: bloock.Record.config_data:type_name -> bloock.ConfigData
	9,  // 1: bloock.IntegrityDetails.proof:type_name -> bloock.Proof
	10, // 2: bloock.AuthenticityDetails.signatures:type_name -> bloock.Signature
	3,  // 3: bloock.RecordDetails.integrity:type_name -> bloock.IntegrityDetails
	4,  // 4: bloock.RecordDetails.authenticity:type_name -> bloock.AuthenticityDetails
	5,  // 5: bloock.RecordDetails.encryption:type_name -> bloock.EncryptionDetails
	6,  // 6: bloock.RecordDetails.availability:type_name -> bloock.AvailabilityDetails
	7,  // [7:7] is the sub-list for method output_type
	7,  // [7:7] is the sub-list for method input_type
	7,  // [7:7] is the sub-list for extension type_name
	7,  // [7:7] is the sub-list for extension extendee
	0,  // [0:7] is the sub-list for field type_name
}

func init() { file_record_entities_proto_init() }
func file_record_entities_proto_init() {
	if File_record_entities_proto != nil {
		return
	}
	file_config_proto_init()
	file_integrity_entities_proto_init()
	file_authenticity_entities_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_record_entities_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RecordHeader); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_record_entities_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Record); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_record_entities_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*IntegrityDetails); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_record_entities_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AuthenticityDetails); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_record_entities_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*EncryptionDetails); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_record_entities_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AvailabilityDetails); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_record_entities_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RecordDetails); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_record_entities_proto_msgTypes[1].OneofWrappers = []interface{}{}
	file_record_entities_proto_msgTypes[2].OneofWrappers = []interface{}{}
	file_record_entities_proto_msgTypes[4].OneofWrappers = []interface{}{}
	file_record_entities_proto_msgTypes[5].OneofWrappers = []interface{}{}
	file_record_entities_proto_msgTypes[6].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_record_entities_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   7,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_record_entities_proto_goTypes,
		DependencyIndexes: file_record_entities_proto_depIdxs,
		EnumInfos:         file_record_entities_proto_enumTypes,
		MessageInfos:      file_record_entities_proto_msgTypes,
	}.Build()
	File_record_entities_proto = out.File
	file_record_entities_proto_rawDesc = nil
	file_record_entities_proto_goTypes = nil
	file_record_entities_proto_depIdxs = nil
}
