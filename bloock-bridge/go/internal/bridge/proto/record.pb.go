// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.21.2
// source: record.proto

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

type Record struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Hash string `protobuf:"bytes,1,opt,name=hash,proto3" json:"hash,omitempty"`
}

func (x *Record) Reset() {
	*x = Record{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Record) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Record) ProtoMessage() {}

func (x *Record) ProtoReflect() protoreflect.Message {
	mi := &file_record_proto_msgTypes[0]
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
	return file_record_proto_rawDescGZIP(), []int{0}
}

func (x *Record) GetHash() string {
	if x != nil {
		return x.Hash
	}
	return ""
}

type RecordReceipt struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Anchor int64  `protobuf:"varint,1,opt,name=anchor,proto3" json:"anchor,omitempty"`
	Client string `protobuf:"bytes,2,opt,name=client,proto3" json:"client,omitempty"`
	Record string `protobuf:"bytes,3,opt,name=record,proto3" json:"record,omitempty"`
	Status string `protobuf:"bytes,4,opt,name=status,proto3" json:"status,omitempty"`
}

func (x *RecordReceipt) Reset() {
	*x = RecordReceipt{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RecordReceipt) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RecordReceipt) ProtoMessage() {}

func (x *RecordReceipt) ProtoReflect() protoreflect.Message {
	mi := &file_record_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RecordReceipt.ProtoReflect.Descriptor instead.
func (*RecordReceipt) Descriptor() ([]byte, []int) {
	return file_record_proto_rawDescGZIP(), []int{1}
}

func (x *RecordReceipt) GetAnchor() int64 {
	if x != nil {
		return x.Anchor
	}
	return 0
}

func (x *RecordReceipt) GetClient() string {
	if x != nil {
		return x.Client
	}
	return ""
}

func (x *RecordReceipt) GetRecord() string {
	if x != nil {
		return x.Record
	}
	return ""
}

func (x *RecordReceipt) GetStatus() string {
	if x != nil {
		return x.Status
	}
	return ""
}

type SendRecordsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData *ConfigData `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3" json:"config_data,omitempty"`
	Records    []*Record   `protobuf:"bytes,2,rep,name=records,proto3" json:"records,omitempty"`
}

func (x *SendRecordsRequest) Reset() {
	*x = SendRecordsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendRecordsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendRecordsRequest) ProtoMessage() {}

func (x *SendRecordsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_record_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendRecordsRequest.ProtoReflect.Descriptor instead.
func (*SendRecordsRequest) Descriptor() ([]byte, []int) {
	return file_record_proto_rawDescGZIP(), []int{2}
}

func (x *SendRecordsRequest) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *SendRecordsRequest) GetRecords() []*Record {
	if x != nil {
		return x.Records
	}
	return nil
}

type SendRecordsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Records []*RecordReceipt `protobuf:"bytes,1,rep,name=records,proto3" json:"records,omitempty"`
	Error   *Error           `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *SendRecordsResponse) Reset() {
	*x = SendRecordsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendRecordsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendRecordsResponse) ProtoMessage() {}

func (x *SendRecordsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_record_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendRecordsResponse.ProtoReflect.Descriptor instead.
func (*SendRecordsResponse) Descriptor() ([]byte, []int) {
	return file_record_proto_rawDescGZIP(), []int{3}
}

func (x *SendRecordsResponse) GetRecords() []*RecordReceipt {
	if x != nil {
		return x.Records
	}
	return nil
}

func (x *SendRecordsResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

type FromHashRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Hash string `protobuf:"bytes,1,opt,name=hash,proto3" json:"hash,omitempty"`
}

func (x *FromHashRequest) Reset() {
	*x = FromHashRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *FromHashRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FromHashRequest) ProtoMessage() {}

func (x *FromHashRequest) ProtoReflect() protoreflect.Message {
	mi := &file_record_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FromHashRequest.ProtoReflect.Descriptor instead.
func (*FromHashRequest) Descriptor() ([]byte, []int) {
	return file_record_proto_rawDescGZIP(), []int{4}
}

func (x *FromHashRequest) GetHash() string {
	if x != nil {
		return x.Hash
	}
	return ""
}

type FromHexRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Hex string `protobuf:"bytes,1,opt,name=hex,proto3" json:"hex,omitempty"`
}

func (x *FromHexRequest) Reset() {
	*x = FromHexRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *FromHexRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FromHexRequest) ProtoMessage() {}

func (x *FromHexRequest) ProtoReflect() protoreflect.Message {
	mi := &file_record_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FromHexRequest.ProtoReflect.Descriptor instead.
func (*FromHexRequest) Descriptor() ([]byte, []int) {
	return file_record_proto_rawDescGZIP(), []int{5}
}

func (x *FromHexRequest) GetHex() string {
	if x != nil {
		return x.Hex
	}
	return ""
}

type FromStringRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Str string `protobuf:"bytes,1,opt,name=str,proto3" json:"str,omitempty"`
}

func (x *FromStringRequest) Reset() {
	*x = FromStringRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *FromStringRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FromStringRequest) ProtoMessage() {}

func (x *FromStringRequest) ProtoReflect() protoreflect.Message {
	mi := &file_record_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FromStringRequest.ProtoReflect.Descriptor instead.
func (*FromStringRequest) Descriptor() ([]byte, []int) {
	return file_record_proto_rawDescGZIP(), []int{6}
}

func (x *FromStringRequest) GetStr() string {
	if x != nil {
		return x.Str
	}
	return ""
}

type FromTypedArrayRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Array []byte `protobuf:"bytes,1,opt,name=array,proto3" json:"array,omitempty"`
}

func (x *FromTypedArrayRequest) Reset() {
	*x = FromTypedArrayRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *FromTypedArrayRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FromTypedArrayRequest) ProtoMessage() {}

func (x *FromTypedArrayRequest) ProtoReflect() protoreflect.Message {
	mi := &file_record_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FromTypedArrayRequest.ProtoReflect.Descriptor instead.
func (*FromTypedArrayRequest) Descriptor() ([]byte, []int) {
	return file_record_proto_rawDescGZIP(), []int{7}
}

func (x *FromTypedArrayRequest) GetArray() []byte {
	if x != nil {
		return x.Array
	}
	return nil
}

type FromHexResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Record *Record `protobuf:"bytes,1,opt,name=record,proto3,oneof" json:"record,omitempty"`
	Error  *Error  `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *FromHexResponse) Reset() {
	*x = FromHexResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_record_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *FromHexResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FromHexResponse) ProtoMessage() {}

func (x *FromHexResponse) ProtoReflect() protoreflect.Message {
	mi := &file_record_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FromHexResponse.ProtoReflect.Descriptor instead.
func (*FromHexResponse) Descriptor() ([]byte, []int) {
	return file_record_proto_rawDescGZIP(), []int{8}
}

func (x *FromHexResponse) GetRecord() *Record {
	if x != nil {
		return x.Record
	}
	return nil
}

func (x *FromHexResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

var File_record_proto protoreflect.FileDescriptor

var file_record_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x1a, 0x0c, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x0c, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x22, 0x1c, 0x0a, 0x06, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x12, 0x12, 0x0a, 0x04,
	0x68, 0x61, 0x73, 0x68, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x68, 0x61, 0x73, 0x68,
	0x22, 0x6f, 0x0a, 0x0d, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70,
	0x74, 0x12, 0x16, 0x0a, 0x06, 0x61, 0x6e, 0x63, 0x68, 0x6f, 0x72, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x03, 0x52, 0x06, 0x61, 0x6e, 0x63, 0x68, 0x6f, 0x72, 0x12, 0x16, 0x0a, 0x06, 0x63, 0x6c, 0x69,
	0x65, 0x6e, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x63, 0x6c, 0x69, 0x65, 0x6e,
	0x74, 0x12, 0x16, 0x0a, 0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x61,
	0x74, 0x75, 0x73, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75,
	0x73, 0x22, 0x73, 0x0a, 0x12, 0x53, 0x65, 0x6e, 0x64, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x33, 0x0a, 0x0b, 0x63, 0x6f, 0x6e, 0x66, 0x69,
	0x67, 0x5f, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61,
	0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x12, 0x28, 0x0a, 0x07,
	0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0e, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x52, 0x07, 0x72,
	0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x22, 0x7a, 0x0a, 0x13, 0x53, 0x65, 0x6e, 0x64, 0x52, 0x65,
	0x63, 0x6f, 0x72, 0x64, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x2f, 0x0a,
	0x07, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x15,
	0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x52, 0x65,
	0x63, 0x65, 0x69, 0x70, 0x74, 0x52, 0x07, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x12, 0x28,
	0x0a, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x48, 0x00, 0x52, 0x05,
	0x65, 0x72, 0x72, 0x6f, 0x72, 0x88, 0x01, 0x01, 0x42, 0x08, 0x0a, 0x06, 0x5f, 0x65, 0x72, 0x72,
	0x6f, 0x72, 0x22, 0x25, 0x0a, 0x0f, 0x46, 0x72, 0x6f, 0x6d, 0x48, 0x61, 0x73, 0x68, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x68, 0x61, 0x73, 0x68, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x04, 0x68, 0x61, 0x73, 0x68, 0x22, 0x22, 0x0a, 0x0e, 0x46, 0x72, 0x6f,
	0x6d, 0x48, 0x65, 0x78, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x10, 0x0a, 0x03, 0x68,
	0x65, 0x78, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x68, 0x65, 0x78, 0x22, 0x25, 0x0a,
	0x11, 0x46, 0x72, 0x6f, 0x6d, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x12, 0x10, 0x0a, 0x03, 0x73, 0x74, 0x72, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x03, 0x73, 0x74, 0x72, 0x22, 0x2d, 0x0a, 0x15, 0x46, 0x72, 0x6f, 0x6d, 0x54, 0x79, 0x70, 0x65,
	0x64, 0x41, 0x72, 0x72, 0x61, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x14, 0x0a,
	0x05, 0x61, 0x72, 0x72, 0x61, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x05, 0x61, 0x72,
	0x72, 0x61, 0x79, 0x22, 0x7d, 0x0a, 0x0f, 0x46, 0x72, 0x6f, 0x6d, 0x48, 0x65, 0x78, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x2b, 0x0a, 0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e,
	0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x48, 0x00, 0x52, 0x06, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64,
	0x88, 0x01, 0x01, 0x12, 0x28, 0x0a, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x45, 0x72, 0x72, 0x6f,
	0x72, 0x48, 0x01, 0x52, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x88, 0x01, 0x01, 0x42, 0x09, 0x0a,
	0x07, 0x5f, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x42, 0x08, 0x0a, 0x06, 0x5f, 0x65, 0x72, 0x72,
	0x6f, 0x72, 0x32, 0xc2, 0x02, 0x0a, 0x0d, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x53, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x12, 0x46, 0x0a, 0x0b, 0x53, 0x65, 0x6e, 0x64, 0x52, 0x65, 0x63, 0x6f,
	0x72, 0x64, 0x73, 0x12, 0x1a, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x53, 0x65, 0x6e,
	0x64, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a,
	0x1b, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x53, 0x65, 0x6e, 0x64, 0x52, 0x65, 0x63,
	0x6f, 0x72, 0x64, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x33, 0x0a, 0x08,
	0x46, 0x72, 0x6f, 0x6d, 0x48, 0x61, 0x73, 0x68, 0x12, 0x17, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63,
	0x6b, 0x2e, 0x46, 0x72, 0x6f, 0x6d, 0x48, 0x61, 0x73, 0x68, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x0e, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x52, 0x65, 0x63, 0x6f, 0x72,
	0x64, 0x12, 0x3a, 0x0a, 0x07, 0x46, 0x72, 0x6f, 0x6d, 0x48, 0x65, 0x78, 0x12, 0x16, 0x2e, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x46, 0x72, 0x6f, 0x6d, 0x48, 0x65, 0x78, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x17, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x46, 0x72,
	0x6f, 0x6d, 0x48, 0x65, 0x78, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x37, 0x0a,
	0x0a, 0x46, 0x72, 0x6f, 0x6d, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x12, 0x19, 0x2e, 0x62, 0x6c,
	0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x46, 0x72, 0x6f, 0x6d, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0e, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e,
	0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x12, 0x3f, 0x0a, 0x0e, 0x46, 0x72, 0x6f, 0x6d, 0x54, 0x79,
	0x70, 0x65, 0x64, 0x41, 0x72, 0x72, 0x61, 0x79, 0x12, 0x1d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63,
	0x6b, 0x2e, 0x46, 0x72, 0x6f, 0x6d, 0x54, 0x79, 0x70, 0x65, 0x64, 0x41, 0x72, 0x72, 0x61, 0x79,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0e, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b,
	0x2e, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x42, 0x51, 0x0a, 0x1c, 0x62, 0x6c, 0x6f, 0x6f, 0x63,
	0x6b, 0x2e, 0x73, 0x64, 0x6b, 0x2e, 0x6a, 0x61, 0x76, 0x61, 0x2e, 0x62, 0x72, 0x69, 0x64, 0x67,
	0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x5a, 0x31, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e,
	0x63, 0x6f, 0x6d, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2f, 0x67, 0x6f, 0x2d, 0x62, 0x72,
	0x69, 0x64, 0x67, 0x65, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x62, 0x72,
	0x69, 0x64, 0x67, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x33,
}

var (
	file_record_proto_rawDescOnce sync.Once
	file_record_proto_rawDescData = file_record_proto_rawDesc
)

func file_record_proto_rawDescGZIP() []byte {
	file_record_proto_rawDescOnce.Do(func() {
		file_record_proto_rawDescData = protoimpl.X.CompressGZIP(file_record_proto_rawDescData)
	})
	return file_record_proto_rawDescData
}

var file_record_proto_msgTypes = make([]protoimpl.MessageInfo, 9)
var file_record_proto_goTypes = []interface{}{
	(*Record)(nil),                // 0: bloock.Record
	(*RecordReceipt)(nil),         // 1: bloock.RecordReceipt
	(*SendRecordsRequest)(nil),    // 2: bloock.SendRecordsRequest
	(*SendRecordsResponse)(nil),   // 3: bloock.SendRecordsResponse
	(*FromHashRequest)(nil),       // 4: bloock.FromHashRequest
	(*FromHexRequest)(nil),        // 5: bloock.FromHexRequest
	(*FromStringRequest)(nil),     // 6: bloock.FromStringRequest
	(*FromTypedArrayRequest)(nil), // 7: bloock.FromTypedArrayRequest
	(*FromHexResponse)(nil),       // 8: bloock.FromHexResponse
	(*ConfigData)(nil),            // 9: bloock.ConfigData
	(*Error)(nil),                 // 10: bloock.Error
}
var file_record_proto_depIdxs = []int32{
	9,  // 0: bloock.SendRecordsRequest.config_data:type_name -> bloock.ConfigData
	0,  // 1: bloock.SendRecordsRequest.records:type_name -> bloock.Record
	1,  // 2: bloock.SendRecordsResponse.records:type_name -> bloock.RecordReceipt
	10, // 3: bloock.SendRecordsResponse.error:type_name -> bloock.Error
	0,  // 4: bloock.FromHexResponse.record:type_name -> bloock.Record
	10, // 5: bloock.FromHexResponse.error:type_name -> bloock.Error
	2,  // 6: bloock.RecordService.SendRecords:input_type -> bloock.SendRecordsRequest
	4,  // 7: bloock.RecordService.FromHash:input_type -> bloock.FromHashRequest
	5,  // 8: bloock.RecordService.FromHex:input_type -> bloock.FromHexRequest
	6,  // 9: bloock.RecordService.FromString:input_type -> bloock.FromStringRequest
	7,  // 10: bloock.RecordService.FromTypedArray:input_type -> bloock.FromTypedArrayRequest
	3,  // 11: bloock.RecordService.SendRecords:output_type -> bloock.SendRecordsResponse
	0,  // 12: bloock.RecordService.FromHash:output_type -> bloock.Record
	8,  // 13: bloock.RecordService.FromHex:output_type -> bloock.FromHexResponse
	0,  // 14: bloock.RecordService.FromString:output_type -> bloock.Record
	0,  // 15: bloock.RecordService.FromTypedArray:output_type -> bloock.Record
	11, // [11:16] is the sub-list for method output_type
	6,  // [6:11] is the sub-list for method input_type
	6,  // [6:6] is the sub-list for extension type_name
	6,  // [6:6] is the sub-list for extension extendee
	0,  // [0:6] is the sub-list for field type_name
}

func init() { file_record_proto_init() }
func file_record_proto_init() {
	if File_record_proto != nil {
		return
	}
	file_bloock_proto_init()
	file_config_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_record_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
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
		file_record_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RecordReceipt); i {
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
		file_record_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendRecordsRequest); i {
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
		file_record_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendRecordsResponse); i {
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
		file_record_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*FromHashRequest); i {
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
		file_record_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*FromHexRequest); i {
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
		file_record_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*FromStringRequest); i {
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
		file_record_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*FromTypedArrayRequest); i {
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
		file_record_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*FromHexResponse); i {
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
	file_record_proto_msgTypes[3].OneofWrappers = []interface{}{}
	file_record_proto_msgTypes[8].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_record_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   9,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_record_proto_goTypes,
		DependencyIndexes: file_record_proto_depIdxs,
		MessageInfos:      file_record_proto_msgTypes,
	}.Build()
	File_record_proto = out.File
	file_record_proto_rawDesc = nil
	file_record_proto_goTypes = nil
	file_record_proto_depIdxs = nil
}
