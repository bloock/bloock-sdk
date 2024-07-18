// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v5.26.1
// source: bloock_authenticity.proto

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

type SignRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData *ConfigData `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3" json:"config_data,omitempty"`
	Record     *Record     `protobuf:"bytes,2,opt,name=record,proto3" json:"record,omitempty"`
	Signer     *Signer     `protobuf:"bytes,3,opt,name=signer,proto3" json:"signer,omitempty"`
}

func (x *SignRequest) Reset() {
	*x = SignRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bloock_authenticity_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SignRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SignRequest) ProtoMessage() {}

func (x *SignRequest) ProtoReflect() protoreflect.Message {
	mi := &file_bloock_authenticity_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SignRequest.ProtoReflect.Descriptor instead.
func (*SignRequest) Descriptor() ([]byte, []int) {
	return file_bloock_authenticity_proto_rawDescGZIP(), []int{0}
}

func (x *SignRequest) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *SignRequest) GetRecord() *Record {
	if x != nil {
		return x.Record
	}
	return nil
}

func (x *SignRequest) GetSigner() *Signer {
	if x != nil {
		return x.Signer
	}
	return nil
}

type SignResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Signature *Signature `protobuf:"bytes,1,opt,name=signature,proto3" json:"signature,omitempty"`
	Error     *Error     `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *SignResponse) Reset() {
	*x = SignResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bloock_authenticity_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SignResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SignResponse) ProtoMessage() {}

func (x *SignResponse) ProtoReflect() protoreflect.Message {
	mi := &file_bloock_authenticity_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SignResponse.ProtoReflect.Descriptor instead.
func (*SignResponse) Descriptor() ([]byte, []int) {
	return file_bloock_authenticity_proto_rawDescGZIP(), []int{1}
}

func (x *SignResponse) GetSignature() *Signature {
	if x != nil {
		return x.Signature
	}
	return nil
}

func (x *SignResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

type VerifyRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData *ConfigData `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3" json:"config_data,omitempty"`
	Record     *Record     `protobuf:"bytes,2,opt,name=record,proto3" json:"record,omitempty"`
}

func (x *VerifyRequest) Reset() {
	*x = VerifyRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bloock_authenticity_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *VerifyRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*VerifyRequest) ProtoMessage() {}

func (x *VerifyRequest) ProtoReflect() protoreflect.Message {
	mi := &file_bloock_authenticity_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use VerifyRequest.ProtoReflect.Descriptor instead.
func (*VerifyRequest) Descriptor() ([]byte, []int) {
	return file_bloock_authenticity_proto_rawDescGZIP(), []int{2}
}

func (x *VerifyRequest) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *VerifyRequest) GetRecord() *Record {
	if x != nil {
		return x.Record
	}
	return nil
}

type VerifyResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Valid bool   `protobuf:"varint,1,opt,name=valid,proto3" json:"valid,omitempty"`
	Error *Error `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *VerifyResponse) Reset() {
	*x = VerifyResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bloock_authenticity_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *VerifyResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*VerifyResponse) ProtoMessage() {}

func (x *VerifyResponse) ProtoReflect() protoreflect.Message {
	mi := &file_bloock_authenticity_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use VerifyResponse.ProtoReflect.Descriptor instead.
func (*VerifyResponse) Descriptor() ([]byte, []int) {
	return file_bloock_authenticity_proto_rawDescGZIP(), []int{3}
}

func (x *VerifyResponse) GetValid() bool {
	if x != nil {
		return x.Valid
	}
	return false
}

func (x *VerifyResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

type GetSignaturesRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData *ConfigData `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3" json:"config_data,omitempty"`
	Record     *Record     `protobuf:"bytes,2,opt,name=record,proto3" json:"record,omitempty"`
}

func (x *GetSignaturesRequest) Reset() {
	*x = GetSignaturesRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bloock_authenticity_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetSignaturesRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetSignaturesRequest) ProtoMessage() {}

func (x *GetSignaturesRequest) ProtoReflect() protoreflect.Message {
	mi := &file_bloock_authenticity_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetSignaturesRequest.ProtoReflect.Descriptor instead.
func (*GetSignaturesRequest) Descriptor() ([]byte, []int) {
	return file_bloock_authenticity_proto_rawDescGZIP(), []int{4}
}

func (x *GetSignaturesRequest) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *GetSignaturesRequest) GetRecord() *Record {
	if x != nil {
		return x.Record
	}
	return nil
}

type GetSignaturesResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Signatures []*Signature `protobuf:"bytes,1,rep,name=signatures,proto3" json:"signatures,omitempty"`
	Error      *Error       `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *GetSignaturesResponse) Reset() {
	*x = GetSignaturesResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bloock_authenticity_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetSignaturesResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetSignaturesResponse) ProtoMessage() {}

func (x *GetSignaturesResponse) ProtoReflect() protoreflect.Message {
	mi := &file_bloock_authenticity_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetSignaturesResponse.ProtoReflect.Descriptor instead.
func (*GetSignaturesResponse) Descriptor() ([]byte, []int) {
	return file_bloock_authenticity_proto_rawDescGZIP(), []int{5}
}

func (x *GetSignaturesResponse) GetSignatures() []*Signature {
	if x != nil {
		return x.Signatures
	}
	return nil
}

func (x *GetSignaturesResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

var File_bloock_authenticity_proto protoreflect.FileDescriptor

var file_bloock_authenticity_proto_rawDesc = []byte{
	0x0a, 0x19, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x5f, 0x61, 0x75, 0x74, 0x68, 0x65, 0x6e, 0x74,
	0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x62, 0x6c, 0x6f,
	0x6f, 0x63, 0x6b, 0x1a, 0x22, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x5f, 0x61, 0x75, 0x74, 0x68,
	0x65, 0x6e, 0x74, 0x69, 0x63, 0x69, 0x74, 0x79, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69, 0x65,
	0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1c, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x5f,
	0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69, 0x65, 0x73, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x13, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x5f, 0x73, 0x68,
	0x61, 0x72, 0x65, 0x64, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x13, 0x62, 0x6c, 0x6f, 0x6f,
	0x63, 0x6b, 0x5f, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22,
	0x92, 0x01, 0x0a, 0x0b, 0x53, 0x69, 0x67, 0x6e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12,
	0x33, 0x0a, 0x0b, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x5f, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f,
	0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67,
	0x44, 0x61, 0x74, 0x61, 0x12, 0x26, 0x0a, 0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x52, 0x65,
	0x63, 0x6f, 0x72, 0x64, 0x52, 0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x12, 0x26, 0x0a, 0x06,
	0x73, 0x69, 0x67, 0x6e, 0x65, 0x72, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x53, 0x69, 0x67, 0x6e, 0x65, 0x72, 0x52, 0x06, 0x73, 0x69,
	0x67, 0x6e, 0x65, 0x72, 0x22, 0x73, 0x0a, 0x0c, 0x53, 0x69, 0x67, 0x6e, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x12, 0x2f, 0x0a, 0x09, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72,
	0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b,
	0x2e, 0x53, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x52, 0x09, 0x73, 0x69, 0x67, 0x6e,
	0x61, 0x74, 0x75, 0x72, 0x65, 0x12, 0x28, 0x0a, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x45, 0x72,
	0x72, 0x6f, 0x72, 0x48, 0x00, 0x52, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x88, 0x01, 0x01, 0x42,
	0x08, 0x0a, 0x06, 0x5f, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x22, 0x6c, 0x0a, 0x0d, 0x56, 0x65, 0x72,
	0x69, 0x66, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x33, 0x0a, 0x0b, 0x63, 0x6f,
	0x6e, 0x66, 0x69, 0x67, 0x5f, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x12, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44,
	0x61, 0x74, 0x61, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x12,
	0x26, 0x0a, 0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x0e, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x52,
	0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x22, 0x5a, 0x0a, 0x0e, 0x56, 0x65, 0x72, 0x69, 0x66,
	0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61, 0x6c,
	0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x12,
	0x28, 0x0a, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d,
	0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x48, 0x00, 0x52,
	0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x88, 0x01, 0x01, 0x42, 0x08, 0x0a, 0x06, 0x5f, 0x65, 0x72,
	0x72, 0x6f, 0x72, 0x22, 0x73, 0x0a, 0x14, 0x47, 0x65, 0x74, 0x53, 0x69, 0x67, 0x6e, 0x61, 0x74,
	0x75, 0x72, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x33, 0x0a, 0x0b, 0x63,
	0x6f, 0x6e, 0x66, 0x69, 0x67, 0x5f, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x12, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67,
	0x44, 0x61, 0x74, 0x61, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61,
	0x12, 0x26, 0x0a, 0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x0e, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64,
	0x52, 0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x22, 0x7e, 0x0a, 0x15, 0x47, 0x65, 0x74, 0x53,
	0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x12, 0x31, 0x0a, 0x0a, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x73, 0x18,
	0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x53,
	0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x52, 0x0a, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x74,
	0x75, 0x72, 0x65, 0x73, 0x12, 0x28, 0x0a, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x45, 0x72, 0x72,
	0x6f, 0x72, 0x48, 0x00, 0x52, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x88, 0x01, 0x01, 0x42, 0x08,
	0x0a, 0x06, 0x5f, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x32, 0xcf, 0x01, 0x0a, 0x13, 0x41, 0x75, 0x74,
	0x68, 0x65, 0x6e, 0x74, 0x69, 0x63, 0x69, 0x74, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x12, 0x31, 0x0a, 0x04, 0x53, 0x69, 0x67, 0x6e, 0x12, 0x13, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63,
	0x6b, 0x2e, 0x53, 0x69, 0x67, 0x6e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x14, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x53, 0x69, 0x67, 0x6e, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x37, 0x0a, 0x06, 0x56, 0x65, 0x72, 0x69, 0x66, 0x79, 0x12, 0x15, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x56, 0x65, 0x72, 0x69, 0x66, 0x79, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x56, 0x65,
	0x72, 0x69, 0x66, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x4c, 0x0a, 0x0d,
	0x47, 0x65, 0x74, 0x53, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x73, 0x12, 0x1c, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x47, 0x65, 0x74, 0x53, 0x69, 0x67, 0x6e, 0x61, 0x74,
	0x75, 0x72, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1d, 0x2e, 0x62, 0x6c,
	0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x47, 0x65, 0x74, 0x53, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72,
	0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x57, 0x0a, 0x1b, 0x63, 0x6f,
	0x6d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x73, 0x64, 0x6b, 0x2e, 0x62, 0x72, 0x69,
	0x64, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x5a, 0x38, 0x67, 0x69, 0x74, 0x68, 0x75,
	0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2f, 0x62, 0x6c, 0x6f,
	0x6f, 0x63, 0x6b, 0x2d, 0x73, 0x64, 0x6b, 0x2d, 0x67, 0x6f, 0x2f, 0x76, 0x32, 0x2f, 0x69, 0x6e,
	0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x62, 0x72, 0x69, 0x64, 0x67, 0x65, 0x2f, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_bloock_authenticity_proto_rawDescOnce sync.Once
	file_bloock_authenticity_proto_rawDescData = file_bloock_authenticity_proto_rawDesc
)

func file_bloock_authenticity_proto_rawDescGZIP() []byte {
	file_bloock_authenticity_proto_rawDescOnce.Do(func() {
		file_bloock_authenticity_proto_rawDescData = protoimpl.X.CompressGZIP(file_bloock_authenticity_proto_rawDescData)
	})
	return file_bloock_authenticity_proto_rawDescData
}

var file_bloock_authenticity_proto_msgTypes = make([]protoimpl.MessageInfo, 6)
var file_bloock_authenticity_proto_goTypes = []interface{}{
	(*SignRequest)(nil),           // 0: bloock.SignRequest
	(*SignResponse)(nil),          // 1: bloock.SignResponse
	(*VerifyRequest)(nil),         // 2: bloock.VerifyRequest
	(*VerifyResponse)(nil),        // 3: bloock.VerifyResponse
	(*GetSignaturesRequest)(nil),  // 4: bloock.GetSignaturesRequest
	(*GetSignaturesResponse)(nil), // 5: bloock.GetSignaturesResponse
	(*ConfigData)(nil),            // 6: bloock.ConfigData
	(*Record)(nil),                // 7: bloock.Record
	(*Signer)(nil),                // 8: bloock.Signer
	(*Signature)(nil),             // 9: bloock.Signature
	(*Error)(nil),                 // 10: bloock.Error
}
var file_bloock_authenticity_proto_depIdxs = []int32{
	6,  // 0: bloock.SignRequest.config_data:type_name -> bloock.ConfigData
	7,  // 1: bloock.SignRequest.record:type_name -> bloock.Record
	8,  // 2: bloock.SignRequest.signer:type_name -> bloock.Signer
	9,  // 3: bloock.SignResponse.signature:type_name -> bloock.Signature
	10, // 4: bloock.SignResponse.error:type_name -> bloock.Error
	6,  // 5: bloock.VerifyRequest.config_data:type_name -> bloock.ConfigData
	7,  // 6: bloock.VerifyRequest.record:type_name -> bloock.Record
	10, // 7: bloock.VerifyResponse.error:type_name -> bloock.Error
	6,  // 8: bloock.GetSignaturesRequest.config_data:type_name -> bloock.ConfigData
	7,  // 9: bloock.GetSignaturesRequest.record:type_name -> bloock.Record
	9,  // 10: bloock.GetSignaturesResponse.signatures:type_name -> bloock.Signature
	10, // 11: bloock.GetSignaturesResponse.error:type_name -> bloock.Error
	0,  // 12: bloock.AuthenticityService.Sign:input_type -> bloock.SignRequest
	2,  // 13: bloock.AuthenticityService.Verify:input_type -> bloock.VerifyRequest
	4,  // 14: bloock.AuthenticityService.GetSignatures:input_type -> bloock.GetSignaturesRequest
	1,  // 15: bloock.AuthenticityService.Sign:output_type -> bloock.SignResponse
	3,  // 16: bloock.AuthenticityService.Verify:output_type -> bloock.VerifyResponse
	5,  // 17: bloock.AuthenticityService.GetSignatures:output_type -> bloock.GetSignaturesResponse
	15, // [15:18] is the sub-list for method output_type
	12, // [12:15] is the sub-list for method input_type
	12, // [12:12] is the sub-list for extension type_name
	12, // [12:12] is the sub-list for extension extendee
	0,  // [0:12] is the sub-list for field type_name
}

func init() { file_bloock_authenticity_proto_init() }
func file_bloock_authenticity_proto_init() {
	if File_bloock_authenticity_proto != nil {
		return
	}
	file_bloock_authenticity_entities_proto_init()
	file_bloock_record_entities_proto_init()
	file_bloock_shared_proto_init()
	file_bloock_config_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_bloock_authenticity_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SignRequest); i {
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
		file_bloock_authenticity_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SignResponse); i {
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
		file_bloock_authenticity_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*VerifyRequest); i {
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
		file_bloock_authenticity_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*VerifyResponse); i {
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
		file_bloock_authenticity_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetSignaturesRequest); i {
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
		file_bloock_authenticity_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetSignaturesResponse); i {
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
	file_bloock_authenticity_proto_msgTypes[1].OneofWrappers = []interface{}{}
	file_bloock_authenticity_proto_msgTypes[3].OneofWrappers = []interface{}{}
	file_bloock_authenticity_proto_msgTypes[5].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_bloock_authenticity_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   6,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_bloock_authenticity_proto_goTypes,
		DependencyIndexes: file_bloock_authenticity_proto_depIdxs,
		MessageInfos:      file_bloock_authenticity_proto_msgTypes,
	}.Build()
	File_bloock_authenticity_proto = out.File
	file_bloock_authenticity_proto_rawDesc = nil
	file_bloock_authenticity_proto_goTypes = nil
	file_bloock_authenticity_proto_depIdxs = nil
}