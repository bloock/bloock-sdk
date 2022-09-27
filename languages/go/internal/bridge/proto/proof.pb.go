// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.21.4
// source: proof.proto

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

type Proof struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Leaves []string     `protobuf:"bytes,1,rep,name=leaves,proto3" json:"leaves,omitempty"`
	Nodes  []string     `protobuf:"bytes,2,rep,name=nodes,proto3" json:"nodes,omitempty"`
	Depth  string       `protobuf:"bytes,3,opt,name=depth,proto3" json:"depth,omitempty"`
	Bitmap string       `protobuf:"bytes,4,opt,name=bitmap,proto3" json:"bitmap,omitempty"`
	Anchor *ProofAnchor `protobuf:"bytes,5,opt,name=anchor,proto3" json:"anchor,omitempty"`
}

func (x *Proof) Reset() {
	*x = Proof{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Proof) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Proof) ProtoMessage() {}

func (x *Proof) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Proof.ProtoReflect.Descriptor instead.
func (*Proof) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{0}
}

func (x *Proof) GetLeaves() []string {
	if x != nil {
		return x.Leaves
	}
	return nil
}

func (x *Proof) GetNodes() []string {
	if x != nil {
		return x.Nodes
	}
	return nil
}

func (x *Proof) GetDepth() string {
	if x != nil {
		return x.Depth
	}
	return ""
}

func (x *Proof) GetBitmap() string {
	if x != nil {
		return x.Bitmap
	}
	return ""
}

func (x *Proof) GetAnchor() *ProofAnchor {
	if x != nil {
		return x.Anchor
	}
	return nil
}

type ProofAnchor struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	AnchorId int64            `protobuf:"varint,1,opt,name=anchor_id,json=anchorId,proto3" json:"anchor_id,omitempty"`
	Networks []*AnchorNetwork `protobuf:"bytes,2,rep,name=networks,proto3" json:"networks,omitempty"`
	Root     string           `protobuf:"bytes,3,opt,name=root,proto3" json:"root,omitempty"`
	Status   string           `protobuf:"bytes,4,opt,name=status,proto3" json:"status,omitempty"`
}

func (x *ProofAnchor) Reset() {
	*x = ProofAnchor{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ProofAnchor) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ProofAnchor) ProtoMessage() {}

func (x *ProofAnchor) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ProofAnchor.ProtoReflect.Descriptor instead.
func (*ProofAnchor) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{1}
}

func (x *ProofAnchor) GetAnchorId() int64 {
	if x != nil {
		return x.AnchorId
	}
	return 0
}

func (x *ProofAnchor) GetNetworks() []*AnchorNetwork {
	if x != nil {
		return x.Networks
	}
	return nil
}

func (x *ProofAnchor) GetRoot() string {
	if x != nil {
		return x.Root
	}
	return ""
}

func (x *ProofAnchor) GetStatus() string {
	if x != nil {
		return x.Status
	}
	return ""
}

type GetProofRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData *ConfigData `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3" json:"config_data,omitempty"`
	Records    []string    `protobuf:"bytes,2,rep,name=records,proto3" json:"records,omitempty"`
}

func (x *GetProofRequest) Reset() {
	*x = GetProofRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetProofRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetProofRequest) ProtoMessage() {}

func (x *GetProofRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetProofRequest.ProtoReflect.Descriptor instead.
func (*GetProofRequest) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{2}
}

func (x *GetProofRequest) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *GetProofRequest) GetRecords() []string {
	if x != nil {
		return x.Records
	}
	return nil
}

type GetProofResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Proof *Proof `protobuf:"bytes,1,opt,name=proof,proto3" json:"proof,omitempty"`
	Error *Error `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *GetProofResponse) Reset() {
	*x = GetProofResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetProofResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetProofResponse) ProtoMessage() {}

func (x *GetProofResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetProofResponse.ProtoReflect.Descriptor instead.
func (*GetProofResponse) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{3}
}

func (x *GetProofResponse) GetProof() *Proof {
	if x != nil {
		return x.Proof
	}
	return nil
}

func (x *GetProofResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

type ValidateRootRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData *ConfigData `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3" json:"config_data,omitempty"`
	Root       string      `protobuf:"bytes,2,opt,name=root,proto3" json:"root,omitempty"`
	Network    Network     `protobuf:"varint,3,opt,name=network,proto3,enum=bloock.Network" json:"network,omitempty"`
}

func (x *ValidateRootRequest) Reset() {
	*x = ValidateRootRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ValidateRootRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ValidateRootRequest) ProtoMessage() {}

func (x *ValidateRootRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ValidateRootRequest.ProtoReflect.Descriptor instead.
func (*ValidateRootRequest) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{4}
}

func (x *ValidateRootRequest) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *ValidateRootRequest) GetRoot() string {
	if x != nil {
		return x.Root
	}
	return ""
}

func (x *ValidateRootRequest) GetNetwork() Network {
	if x != nil {
		return x.Network
	}
	return Network_ETHEREUM_MAINNET
}

type ValidateRootResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Timestamp uint64 `protobuf:"varint,1,opt,name=timestamp,proto3" json:"timestamp,omitempty"` // TODO Should be u128
	Error     *Error `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *ValidateRootResponse) Reset() {
	*x = ValidateRootResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ValidateRootResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ValidateRootResponse) ProtoMessage() {}

func (x *ValidateRootResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ValidateRootResponse.ProtoReflect.Descriptor instead.
func (*ValidateRootResponse) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{5}
}

func (x *ValidateRootResponse) GetTimestamp() uint64 {
	if x != nil {
		return x.Timestamp
	}
	return 0
}

func (x *ValidateRootResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

type VerifyProofRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData *ConfigData `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3" json:"config_data,omitempty"`
	Proof      *Proof      `protobuf:"bytes,2,opt,name=proof,proto3" json:"proof,omitempty"`
}

func (x *VerifyProofRequest) Reset() {
	*x = VerifyProofRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *VerifyProofRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*VerifyProofRequest) ProtoMessage() {}

func (x *VerifyProofRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use VerifyProofRequest.ProtoReflect.Descriptor instead.
func (*VerifyProofRequest) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{6}
}

func (x *VerifyProofRequest) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *VerifyProofRequest) GetProof() *Proof {
	if x != nil {
		return x.Proof
	}
	return nil
}

type VerifyProofResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Record *string `protobuf:"bytes,1,opt,name=record,proto3,oneof" json:"record,omitempty"`
	Error  *Error  `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *VerifyProofResponse) Reset() {
	*x = VerifyProofResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *VerifyProofResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*VerifyProofResponse) ProtoMessage() {}

func (x *VerifyProofResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use VerifyProofResponse.ProtoReflect.Descriptor instead.
func (*VerifyProofResponse) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{7}
}

func (x *VerifyProofResponse) GetRecord() string {
	if x != nil && x.Record != nil {
		return *x.Record
	}
	return ""
}

func (x *VerifyProofResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

type VerifyRecordsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData *ConfigData `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3" json:"config_data,omitempty"`
	Records    []string    `protobuf:"bytes,2,rep,name=records,proto3" json:"records,omitempty"`
	Network    *Network    `protobuf:"varint,3,opt,name=network,proto3,enum=bloock.Network,oneof" json:"network,omitempty"`
}

func (x *VerifyRecordsRequest) Reset() {
	*x = VerifyRecordsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *VerifyRecordsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*VerifyRecordsRequest) ProtoMessage() {}

func (x *VerifyRecordsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use VerifyRecordsRequest.ProtoReflect.Descriptor instead.
func (*VerifyRecordsRequest) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{8}
}

func (x *VerifyRecordsRequest) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *VerifyRecordsRequest) GetRecords() []string {
	if x != nil {
		return x.Records
	}
	return nil
}

func (x *VerifyRecordsRequest) GetNetwork() Network {
	if x != nil && x.Network != nil {
		return *x.Network
	}
	return Network_ETHEREUM_MAINNET
}

type VerifyRecordsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Timestamp uint64 `protobuf:"varint,1,opt,name=timestamp,proto3" json:"timestamp,omitempty"` // TODO Should be u128
	Error     *Error `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *VerifyRecordsResponse) Reset() {
	*x = VerifyRecordsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proof_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *VerifyRecordsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*VerifyRecordsResponse) ProtoMessage() {}

func (x *VerifyRecordsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proof_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use VerifyRecordsResponse.ProtoReflect.Descriptor instead.
func (*VerifyRecordsResponse) Descriptor() ([]byte, []int) {
	return file_proof_proto_rawDescGZIP(), []int{9}
}

func (x *VerifyRecordsResponse) GetTimestamp() uint64 {
	if x != nil {
		return x.Timestamp
	}
	return 0
}

func (x *VerifyRecordsResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

var File_proof_proto protoreflect.FileDescriptor

var file_proof_proto_rawDesc = []byte{
	0x0a, 0x0b, 0x70, 0x72, 0x6f, 0x6f, 0x66, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x1a, 0x0c, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x1a, 0x0c, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x1a, 0x0c, 0x61, 0x6e, 0x63, 0x68, 0x6f, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22,
	0x90, 0x01, 0x0a, 0x05, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x12, 0x16, 0x0a, 0x06, 0x6c, 0x65, 0x61,
	0x76, 0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x6c, 0x65, 0x61, 0x76, 0x65,
	0x73, 0x12, 0x14, 0x0a, 0x05, 0x6e, 0x6f, 0x64, 0x65, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x09,
	0x52, 0x05, 0x6e, 0x6f, 0x64, 0x65, 0x73, 0x12, 0x14, 0x0a, 0x05, 0x64, 0x65, 0x70, 0x74, 0x68,
	0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x64, 0x65, 0x70, 0x74, 0x68, 0x12, 0x16, 0x0a,
	0x06, 0x62, 0x69, 0x74, 0x6d, 0x61, 0x70, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x62,
	0x69, 0x74, 0x6d, 0x61, 0x70, 0x12, 0x2b, 0x0a, 0x06, 0x61, 0x6e, 0x63, 0x68, 0x6f, 0x72, 0x18,
	0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x13, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x50,
	0x72, 0x6f, 0x6f, 0x66, 0x41, 0x6e, 0x63, 0x68, 0x6f, 0x72, 0x52, 0x06, 0x61, 0x6e, 0x63, 0x68,
	0x6f, 0x72, 0x22, 0x89, 0x01, 0x0a, 0x0b, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x41, 0x6e, 0x63, 0x68,
	0x6f, 0x72, 0x12, 0x1b, 0x0a, 0x09, 0x61, 0x6e, 0x63, 0x68, 0x6f, 0x72, 0x5f, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x08, 0x61, 0x6e, 0x63, 0x68, 0x6f, 0x72, 0x49, 0x64, 0x12,
	0x31, 0x0a, 0x08, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28,
	0x0b, 0x32, 0x15, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x41, 0x6e, 0x63, 0x68, 0x6f,
	0x72, 0x4e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x52, 0x08, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72,
	0x6b, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x72, 0x6f, 0x6f, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x04, 0x72, 0x6f, 0x6f, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73,
	0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x22, 0x60,
	0x0a, 0x0f, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x12, 0x33, 0x0a, 0x0b, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x5f, 0x64, 0x61, 0x74, 0x61,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e,
	0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x66,
	0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x12, 0x18, 0x0a, 0x07, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64,
	0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x09, 0x52, 0x07, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73,
	0x22, 0x6b, 0x0a, 0x10, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x12, 0x23, 0x0a, 0x05, 0x70, 0x72, 0x6f, 0x6f, 0x66, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x50, 0x72, 0x6f,
	0x6f, 0x66, 0x52, 0x05, 0x70, 0x72, 0x6f, 0x6f, 0x66, 0x12, 0x28, 0x0a, 0x05, 0x65, 0x72, 0x72,
	0x6f, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63,
	0x6b, 0x2e, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x48, 0x00, 0x52, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72,
	0x88, 0x01, 0x01, 0x42, 0x08, 0x0a, 0x06, 0x5f, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x22, 0x89, 0x01,
	0x0a, 0x13, 0x56, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x65, 0x52, 0x6f, 0x6f, 0x74, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x33, 0x0a, 0x0b, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x5f,
	0x64, 0x61, 0x74, 0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x62, 0x6c, 0x6f,
	0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x52, 0x0a,
	0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x12, 0x12, 0x0a, 0x04, 0x72, 0x6f,
	0x6f, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x72, 0x6f, 0x6f, 0x74, 0x12, 0x29,
	0x0a, 0x07, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0e, 0x32,
	0x0f, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b,
	0x52, 0x07, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x22, 0x68, 0x0a, 0x14, 0x56, 0x61, 0x6c,
	0x69, 0x64, 0x61, 0x74, 0x65, 0x52, 0x6f, 0x6f, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x12, 0x1c, 0x0a, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x04, 0x52, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x12,
	0x28, 0x0a, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d,
	0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x48, 0x00, 0x52,
	0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x88, 0x01, 0x01, 0x42, 0x08, 0x0a, 0x06, 0x5f, 0x65, 0x72,
	0x72, 0x6f, 0x72, 0x22, 0x6e, 0x0a, 0x12, 0x56, 0x65, 0x72, 0x69, 0x66, 0x79, 0x50, 0x72, 0x6f,
	0x6f, 0x66, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x33, 0x0a, 0x0b, 0x63, 0x6f, 0x6e,
	0x66, 0x69, 0x67, 0x5f, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12,
	0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61,
	0x74, 0x61, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x12, 0x23,
	0x0a, 0x05, 0x70, 0x72, 0x6f, 0x6f, 0x66, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x52, 0x05, 0x70, 0x72,
	0x6f, 0x6f, 0x66, 0x22, 0x71, 0x0a, 0x13, 0x56, 0x65, 0x72, 0x69, 0x66, 0x79, 0x50, 0x72, 0x6f,
	0x6f, 0x66, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1b, 0x0a, 0x06, 0x72, 0x65,
	0x63, 0x6f, 0x72, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x06, 0x72, 0x65,
	0x63, 0x6f, 0x72, 0x64, 0x88, 0x01, 0x01, 0x12, 0x28, 0x0a, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e,
	0x45, 0x72, 0x72, 0x6f, 0x72, 0x48, 0x01, 0x52, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x88, 0x01,
	0x01, 0x42, 0x09, 0x0a, 0x07, 0x5f, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x42, 0x08, 0x0a, 0x06,
	0x5f, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x22, 0xa1, 0x01, 0x0a, 0x14, 0x56, 0x65, 0x72, 0x69, 0x66,
	0x79, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12,
	0x33, 0x0a, 0x0b, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x5f, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f,
	0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67,
	0x44, 0x61, 0x74, 0x61, 0x12, 0x18, 0x0a, 0x07, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x18,
	0x02, 0x20, 0x03, 0x28, 0x09, 0x52, 0x07, 0x72, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x12, 0x2e,
	0x0a, 0x07, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0e, 0x32,
	0x0f, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b,
	0x48, 0x00, 0x52, 0x07, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x88, 0x01, 0x01, 0x42, 0x0a,
	0x0a, 0x08, 0x5f, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x22, 0x69, 0x0a, 0x15, 0x56, 0x65,
	0x72, 0x69, 0x66, 0x79, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x04, 0x52, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d,
	0x70, 0x12, 0x28, 0x0a, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x0d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x48,
	0x00, 0x52, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x88, 0x01, 0x01, 0x42, 0x08, 0x0a, 0x06, 0x5f,
	0x65, 0x72, 0x72, 0x6f, 0x72, 0x32, 0xae, 0x02, 0x0a, 0x0c, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x53,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x3d, 0x0a, 0x08, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f,
	0x6f, 0x66, 0x12, 0x17, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x47, 0x65, 0x74, 0x50,
	0x72, 0x6f, 0x6f, 0x66, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x18, 0x2e, 0x62, 0x6c,
	0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x49, 0x0a, 0x0c, 0x56, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74,
	0x65, 0x52, 0x6f, 0x6f, 0x74, 0x12, 0x1b, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x56,
	0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x65, 0x52, 0x6f, 0x6f, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x1c, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x56, 0x61, 0x6c, 0x69,
	0x64, 0x61, 0x74, 0x65, 0x52, 0x6f, 0x6f, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x12, 0x46, 0x0a, 0x0b, 0x56, 0x65, 0x72, 0x69, 0x66, 0x79, 0x50, 0x72, 0x6f, 0x6f, 0x66, 0x12,
	0x1a, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x56, 0x65, 0x72, 0x69, 0x66, 0x79, 0x50,
	0x72, 0x6f, 0x6f, 0x66, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1b, 0x2e, 0x62, 0x6c,
	0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x56, 0x65, 0x72, 0x69, 0x66, 0x79, 0x50, 0x72, 0x6f, 0x6f, 0x66,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x4c, 0x0a, 0x0d, 0x56, 0x65, 0x72, 0x69,
	0x66, 0x79, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x12, 0x1c, 0x2e, 0x62, 0x6c, 0x6f, 0x6f,
	0x63, 0x6b, 0x2e, 0x56, 0x65, 0x72, 0x69, 0x66, 0x79, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b,
	0x2e, 0x56, 0x65, 0x72, 0x69, 0x66, 0x79, 0x52, 0x65, 0x63, 0x6f, 0x72, 0x64, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x55, 0x0a, 0x1c, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b,
	0x2e, 0x73, 0x64, 0x6b, 0x2e, 0x6a, 0x61, 0x76, 0x61, 0x2e, 0x62, 0x72, 0x69, 0x64, 0x67, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x5a, 0x35, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63,
	0x6f, 0x6d, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b,
	0x2d, 0x73, 0x64, 0x6b, 0x2d, 0x67, 0x6f, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c,
	0x2f, 0x62, 0x72, 0x69, 0x64, 0x67, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proof_proto_rawDescOnce sync.Once
	file_proof_proto_rawDescData = file_proof_proto_rawDesc
)

func file_proof_proto_rawDescGZIP() []byte {
	file_proof_proto_rawDescOnce.Do(func() {
		file_proof_proto_rawDescData = protoimpl.X.CompressGZIP(file_proof_proto_rawDescData)
	})
	return file_proof_proto_rawDescData
}

var file_proof_proto_msgTypes = make([]protoimpl.MessageInfo, 10)
var file_proof_proto_goTypes = []interface{}{
	(*Proof)(nil),                 // 0: bloock.Proof
	(*ProofAnchor)(nil),           // 1: bloock.ProofAnchor
	(*GetProofRequest)(nil),       // 2: bloock.GetProofRequest
	(*GetProofResponse)(nil),      // 3: bloock.GetProofResponse
	(*ValidateRootRequest)(nil),   // 4: bloock.ValidateRootRequest
	(*ValidateRootResponse)(nil),  // 5: bloock.ValidateRootResponse
	(*VerifyProofRequest)(nil),    // 6: bloock.VerifyProofRequest
	(*VerifyProofResponse)(nil),   // 7: bloock.VerifyProofResponse
	(*VerifyRecordsRequest)(nil),  // 8: bloock.VerifyRecordsRequest
	(*VerifyRecordsResponse)(nil), // 9: bloock.VerifyRecordsResponse
	(*AnchorNetwork)(nil),         // 10: bloock.AnchorNetwork
	(*ConfigData)(nil),            // 11: bloock.ConfigData
	(*Error)(nil),                 // 12: bloock.Error
	(Network)(0),                  // 13: bloock.Network
}
var file_proof_proto_depIdxs = []int32{
	1,  // 0: bloock.Proof.anchor:type_name -> bloock.ProofAnchor
	10, // 1: bloock.ProofAnchor.networks:type_name -> bloock.AnchorNetwork
	11, // 2: bloock.GetProofRequest.config_data:type_name -> bloock.ConfigData
	0,  // 3: bloock.GetProofResponse.proof:type_name -> bloock.Proof
	12, // 4: bloock.GetProofResponse.error:type_name -> bloock.Error
	11, // 5: bloock.ValidateRootRequest.config_data:type_name -> bloock.ConfigData
	13, // 6: bloock.ValidateRootRequest.network:type_name -> bloock.Network
	12, // 7: bloock.ValidateRootResponse.error:type_name -> bloock.Error
	11, // 8: bloock.VerifyProofRequest.config_data:type_name -> bloock.ConfigData
	0,  // 9: bloock.VerifyProofRequest.proof:type_name -> bloock.Proof
	12, // 10: bloock.VerifyProofResponse.error:type_name -> bloock.Error
	11, // 11: bloock.VerifyRecordsRequest.config_data:type_name -> bloock.ConfigData
	13, // 12: bloock.VerifyRecordsRequest.network:type_name -> bloock.Network
	12, // 13: bloock.VerifyRecordsResponse.error:type_name -> bloock.Error
	2,  // 14: bloock.ProofService.GetProof:input_type -> bloock.GetProofRequest
	4,  // 15: bloock.ProofService.ValidateRoot:input_type -> bloock.ValidateRootRequest
	6,  // 16: bloock.ProofService.VerifyProof:input_type -> bloock.VerifyProofRequest
	8,  // 17: bloock.ProofService.VerifyRecords:input_type -> bloock.VerifyRecordsRequest
	3,  // 18: bloock.ProofService.GetProof:output_type -> bloock.GetProofResponse
	5,  // 19: bloock.ProofService.ValidateRoot:output_type -> bloock.ValidateRootResponse
	7,  // 20: bloock.ProofService.VerifyProof:output_type -> bloock.VerifyProofResponse
	9,  // 21: bloock.ProofService.VerifyRecords:output_type -> bloock.VerifyRecordsResponse
	18, // [18:22] is the sub-list for method output_type
	14, // [14:18] is the sub-list for method input_type
	14, // [14:14] is the sub-list for extension type_name
	14, // [14:14] is the sub-list for extension extendee
	0,  // [0:14] is the sub-list for field type_name
}

func init() { file_proof_proto_init() }
func file_proof_proto_init() {
	if File_proof_proto != nil {
		return
	}
	file_bloock_proto_init()
	file_config_proto_init()
	file_anchor_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_proof_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Proof); i {
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
		file_proof_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ProofAnchor); i {
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
		file_proof_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetProofRequest); i {
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
		file_proof_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetProofResponse); i {
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
		file_proof_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ValidateRootRequest); i {
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
		file_proof_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ValidateRootResponse); i {
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
		file_proof_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*VerifyProofRequest); i {
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
		file_proof_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*VerifyProofResponse); i {
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
		file_proof_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*VerifyRecordsRequest); i {
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
		file_proof_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*VerifyRecordsResponse); i {
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
	file_proof_proto_msgTypes[3].OneofWrappers = []interface{}{}
	file_proof_proto_msgTypes[5].OneofWrappers = []interface{}{}
	file_proof_proto_msgTypes[7].OneofWrappers = []interface{}{}
	file_proof_proto_msgTypes[8].OneofWrappers = []interface{}{}
	file_proof_proto_msgTypes[9].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proof_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   10,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proof_proto_goTypes,
		DependencyIndexes: file_proof_proto_depIdxs,
		MessageInfos:      file_proof_proto_msgTypes,
	}.Build()
	File_proof_proto = out.File
	file_proof_proto_rawDesc = nil
	file_proof_proto_goTypes = nil
	file_proof_proto_depIdxs = nil
}
