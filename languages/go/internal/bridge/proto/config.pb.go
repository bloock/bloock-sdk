// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.17.3
// source: config.proto

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

type Network int32

const (
	Network_ETHEREUM_MAINNET Network = 0
	Network_ETHEREUM_GOERLI  Network = 1
	Network_GNOSIS_CHAIN     Network = 2
	Network_BLOOCK_CHAIN     Network = 3
	Network_POLYGON_CHAIN    Network = 4
)

// Enum value maps for Network.
var (
	Network_name = map[int32]string{
		0: "ETHEREUM_MAINNET",
		1: "ETHEREUM_GOERLI",
		2: "GNOSIS_CHAIN",
		3: "BLOOCK_CHAIN",
		4: "POLYGON_CHAIN",
	}
	Network_value = map[string]int32{
		"ETHEREUM_MAINNET": 0,
		"ETHEREUM_GOERLI":  1,
		"GNOSIS_CHAIN":     2,
		"BLOOCK_CHAIN":     3,
		"POLYGON_CHAIN":    4,
	}
)

func (x Network) Enum() *Network {
	p := new(Network)
	*p = x
	return p
}

func (x Network) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Network) Descriptor() protoreflect.EnumDescriptor {
	return file_config_proto_enumTypes[0].Descriptor()
}

func (Network) Type() protoreflect.EnumType {
	return &file_config_proto_enumTypes[0]
}

func (x Network) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Network.Descriptor instead.
func (Network) EnumDescriptor() ([]byte, []int) {
	return file_config_proto_rawDescGZIP(), []int{0}
}

type ConfigData struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Config         *Configuration           `protobuf:"bytes,1,opt,name=config,proto3" json:"config,omitempty"`
	NetworksConfig map[int32]*NetworkConfig `protobuf:"bytes,2,rep,name=networks_config,json=networksConfig,proto3" json:"networks_config,omitempty" protobuf_key:"varint,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
}

func (x *ConfigData) Reset() {
	*x = ConfigData{}
	if protoimpl.UnsafeEnabled {
		mi := &file_config_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ConfigData) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ConfigData) ProtoMessage() {}

func (x *ConfigData) ProtoReflect() protoreflect.Message {
	mi := &file_config_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ConfigData.ProtoReflect.Descriptor instead.
func (*ConfigData) Descriptor() ([]byte, []int) {
	return file_config_proto_rawDescGZIP(), []int{0}
}

func (x *ConfigData) GetConfig() *Configuration {
	if x != nil {
		return x.Config
	}
	return nil
}

func (x *ConfigData) GetNetworksConfig() map[int32]*NetworkConfig {
	if x != nil {
		return x.NetworksConfig
	}
	return nil
}

type Configuration struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	LibraryName                string  `protobuf:"bytes,1,opt,name=library_name,json=libraryName,proto3" json:"library_name,omitempty"`
	Host                       string  `protobuf:"bytes,2,opt,name=host,proto3" json:"host,omitempty"`
	ApiKey                     string  `protobuf:"bytes,3,opt,name=api_key,json=apiKey,proto3" json:"api_key,omitempty"`
	WaitMessageIntervalFactor  int32   `protobuf:"varint,4,opt,name=wait_message_interval_factor,json=waitMessageIntervalFactor,proto3" json:"wait_message_interval_factor,omitempty"`
	WaitMessageIntervalDefault int32   `protobuf:"varint,5,opt,name=wait_message_interval_default,json=waitMessageIntervalDefault,proto3" json:"wait_message_interval_default,omitempty"`
	KeyTypeAlgorithm           string  `protobuf:"bytes,6,opt,name=key_type_algorithm,json=keyTypeAlgorithm,proto3" json:"key_type_algorithm,omitempty"`
	EllipticCurveKey           string  `protobuf:"bytes,7,opt,name=elliptic_curve_key,json=ellipticCurveKey,proto3" json:"elliptic_curve_key,omitempty"`
	SignatureAlgorithm         string  `protobuf:"bytes,8,opt,name=signature_algorithm,json=signatureAlgorithm,proto3" json:"signature_algorithm,omitempty"`
	IdentityApiHost            *string `protobuf:"bytes,9,opt,name=identityApiHost,proto3,oneof" json:"identityApiHost,omitempty"`
}

func (x *Configuration) Reset() {
	*x = Configuration{}
	if protoimpl.UnsafeEnabled {
		mi := &file_config_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Configuration) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Configuration) ProtoMessage() {}

func (x *Configuration) ProtoReflect() protoreflect.Message {
	mi := &file_config_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Configuration.ProtoReflect.Descriptor instead.
func (*Configuration) Descriptor() ([]byte, []int) {
	return file_config_proto_rawDescGZIP(), []int{1}
}

func (x *Configuration) GetLibraryName() string {
	if x != nil {
		return x.LibraryName
	}
	return ""
}

func (x *Configuration) GetHost() string {
	if x != nil {
		return x.Host
	}
	return ""
}

func (x *Configuration) GetApiKey() string {
	if x != nil {
		return x.ApiKey
	}
	return ""
}

func (x *Configuration) GetWaitMessageIntervalFactor() int32 {
	if x != nil {
		return x.WaitMessageIntervalFactor
	}
	return 0
}

func (x *Configuration) GetWaitMessageIntervalDefault() int32 {
	if x != nil {
		return x.WaitMessageIntervalDefault
	}
	return 0
}

func (x *Configuration) GetKeyTypeAlgorithm() string {
	if x != nil {
		return x.KeyTypeAlgorithm
	}
	return ""
}

func (x *Configuration) GetEllipticCurveKey() string {
	if x != nil {
		return x.EllipticCurveKey
	}
	return ""
}

func (x *Configuration) GetSignatureAlgorithm() string {
	if x != nil {
		return x.SignatureAlgorithm
	}
	return ""
}

func (x *Configuration) GetIdentityApiHost() string {
	if x != nil && x.IdentityApiHost != nil {
		return *x.IdentityApiHost
	}
	return ""
}

type NetworkConfig struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ContractAddress string `protobuf:"bytes,1,opt,name=ContractAddress,proto3" json:"ContractAddress,omitempty"`
	ContractAbi     string `protobuf:"bytes,2,opt,name=ContractAbi,proto3" json:"ContractAbi,omitempty"`
	HttpProvider    string `protobuf:"bytes,3,opt,name=HttpProvider,proto3" json:"HttpProvider,omitempty"`
}

func (x *NetworkConfig) Reset() {
	*x = NetworkConfig{}
	if protoimpl.UnsafeEnabled {
		mi := &file_config_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *NetworkConfig) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*NetworkConfig) ProtoMessage() {}

func (x *NetworkConfig) ProtoReflect() protoreflect.Message {
	mi := &file_config_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use NetworkConfig.ProtoReflect.Descriptor instead.
func (*NetworkConfig) Descriptor() ([]byte, []int) {
	return file_config_proto_rawDescGZIP(), []int{2}
}

func (x *NetworkConfig) GetContractAddress() string {
	if x != nil {
		return x.ContractAddress
	}
	return ""
}

func (x *NetworkConfig) GetContractAbi() string {
	if x != nil {
		return x.ContractAbi
	}
	return ""
}

func (x *NetworkConfig) GetHttpProvider() string {
	if x != nil {
		return x.HttpProvider
	}
	return ""
}

var File_config_proto protoreflect.FileDescriptor

var file_config_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x22, 0xe6, 0x01, 0x0a, 0x0a, 0x43, 0x6f, 0x6e, 0x66, 0x69,
	0x67, 0x44, 0x61, 0x74, 0x61, 0x12, 0x2d, 0x0a, 0x06, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43,
	0x6f, 0x6e, 0x66, 0x69, 0x67, 0x75, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x06, 0x63, 0x6f,
	0x6e, 0x66, 0x69, 0x67, 0x12, 0x4f, 0x0a, 0x0f, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x73,
	0x5f, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x26, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74,
	0x61, 0x2e, 0x4e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x73, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67,
	0x45, 0x6e, 0x74, 0x72, 0x79, 0x52, 0x0e, 0x6e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x73, 0x43,
	0x6f, 0x6e, 0x66, 0x69, 0x67, 0x1a, 0x58, 0x0a, 0x13, 0x4e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b,
	0x73, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x45, 0x6e, 0x74, 0x72, 0x79, 0x12, 0x10, 0x0a, 0x03,
	0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x2b,
	0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b, 0x43, 0x6f,
	0x6e, 0x66, 0x69, 0x67, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x3a, 0x02, 0x38, 0x01, 0x22,
	0xb3, 0x03, 0x0a, 0x0d, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x75, 0x72, 0x61, 0x74, 0x69, 0x6f,
	0x6e, 0x12, 0x21, 0x0a, 0x0c, 0x6c, 0x69, 0x62, 0x72, 0x61, 0x72, 0x79, 0x5f, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x6c, 0x69, 0x62, 0x72, 0x61, 0x72, 0x79,
	0x4e, 0x61, 0x6d, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x68, 0x6f, 0x73, 0x74, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x04, 0x68, 0x6f, 0x73, 0x74, 0x12, 0x17, 0x0a, 0x07, 0x61, 0x70, 0x69, 0x5f,
	0x6b, 0x65, 0x79, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x61, 0x70, 0x69, 0x4b, 0x65,
	0x79, 0x12, 0x3f, 0x0a, 0x1c, 0x77, 0x61, 0x69, 0x74, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x5f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x5f, 0x66, 0x61, 0x63, 0x74, 0x6f,
	0x72, 0x18, 0x04, 0x20, 0x01, 0x28, 0x05, 0x52, 0x19, 0x77, 0x61, 0x69, 0x74, 0x4d, 0x65, 0x73,
	0x73, 0x61, 0x67, 0x65, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x46, 0x61, 0x63, 0x74,
	0x6f, 0x72, 0x12, 0x41, 0x0a, 0x1d, 0x77, 0x61, 0x69, 0x74, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61,
	0x67, 0x65, 0x5f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x5f, 0x64, 0x65, 0x66, 0x61,
	0x75, 0x6c, 0x74, 0x18, 0x05, 0x20, 0x01, 0x28, 0x05, 0x52, 0x1a, 0x77, 0x61, 0x69, 0x74, 0x4d,
	0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x44, 0x65,
	0x66, 0x61, 0x75, 0x6c, 0x74, 0x12, 0x2c, 0x0a, 0x12, 0x6b, 0x65, 0x79, 0x5f, 0x74, 0x79, 0x70,
	0x65, 0x5f, 0x61, 0x6c, 0x67, 0x6f, 0x72, 0x69, 0x74, 0x68, 0x6d, 0x18, 0x06, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x10, 0x6b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65, 0x41, 0x6c, 0x67, 0x6f, 0x72, 0x69,
	0x74, 0x68, 0x6d, 0x12, 0x2c, 0x0a, 0x12, 0x65, 0x6c, 0x6c, 0x69, 0x70, 0x74, 0x69, 0x63, 0x5f,
	0x63, 0x75, 0x72, 0x76, 0x65, 0x5f, 0x6b, 0x65, 0x79, 0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x10, 0x65, 0x6c, 0x6c, 0x69, 0x70, 0x74, 0x69, 0x63, 0x43, 0x75, 0x72, 0x76, 0x65, 0x4b, 0x65,
	0x79, 0x12, 0x2f, 0x0a, 0x13, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x5f, 0x61,
	0x6c, 0x67, 0x6f, 0x72, 0x69, 0x74, 0x68, 0x6d, 0x18, 0x08, 0x20, 0x01, 0x28, 0x09, 0x52, 0x12,
	0x73, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x41, 0x6c, 0x67, 0x6f, 0x72, 0x69, 0x74,
	0x68, 0x6d, 0x12, 0x2d, 0x0a, 0x0f, 0x69, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x79, 0x41, 0x70,
	0x69, 0x48, 0x6f, 0x73, 0x74, 0x18, 0x09, 0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x0f, 0x69,
	0x64, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x79, 0x41, 0x70, 0x69, 0x48, 0x6f, 0x73, 0x74, 0x88, 0x01,
	0x01, 0x42, 0x12, 0x0a, 0x10, 0x5f, 0x69, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x79, 0x41, 0x70,
	0x69, 0x48, 0x6f, 0x73, 0x74, 0x22, 0x7f, 0x0a, 0x0d, 0x4e, 0x65, 0x74, 0x77, 0x6f, 0x72, 0x6b,
	0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x12, 0x28, 0x0a, 0x0f, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x61,
	0x63, 0x74, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x0f, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x61, 0x63, 0x74, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73,
	0x12, 0x20, 0x0a, 0x0b, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x61, 0x63, 0x74, 0x41, 0x62, 0x69, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x61, 0x63, 0x74, 0x41,
	0x62, 0x69, 0x12, 0x22, 0x0a, 0x0c, 0x48, 0x74, 0x74, 0x70, 0x50, 0x72, 0x6f, 0x76, 0x69, 0x64,
	0x65, 0x72, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0c, 0x48, 0x74, 0x74, 0x70, 0x50, 0x72,
	0x6f, 0x76, 0x69, 0x64, 0x65, 0x72, 0x2a, 0x6b, 0x0a, 0x07, 0x4e, 0x65, 0x74, 0x77, 0x6f, 0x72,
	0x6b, 0x12, 0x14, 0x0a, 0x10, 0x45, 0x54, 0x48, 0x45, 0x52, 0x45, 0x55, 0x4d, 0x5f, 0x4d, 0x41,
	0x49, 0x4e, 0x4e, 0x45, 0x54, 0x10, 0x00, 0x12, 0x13, 0x0a, 0x0f, 0x45, 0x54, 0x48, 0x45, 0x52,
	0x45, 0x55, 0x4d, 0x5f, 0x47, 0x4f, 0x45, 0x52, 0x4c, 0x49, 0x10, 0x01, 0x12, 0x10, 0x0a, 0x0c,
	0x47, 0x4e, 0x4f, 0x53, 0x49, 0x53, 0x5f, 0x43, 0x48, 0x41, 0x49, 0x4e, 0x10, 0x02, 0x12, 0x10,
	0x0a, 0x0c, 0x42, 0x4c, 0x4f, 0x4f, 0x43, 0x4b, 0x5f, 0x43, 0x48, 0x41, 0x49, 0x4e, 0x10, 0x03,
	0x12, 0x11, 0x0a, 0x0d, 0x50, 0x4f, 0x4c, 0x59, 0x47, 0x4f, 0x4e, 0x5f, 0x43, 0x48, 0x41, 0x49,
	0x4e, 0x10, 0x04, 0x42, 0x57, 0x0a, 0x1b, 0x63, 0x6f, 0x6d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63,
	0x6b, 0x2e, 0x73, 0x64, 0x6b, 0x2e, 0x62, 0x72, 0x69, 0x64, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x5a, 0x38, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2d, 0x73, 0x64, 0x6b,
	0x2d, 0x67, 0x6f, 0x2f, 0x76, 0x32, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f,
	0x62, 0x72, 0x69, 0x64, 0x67, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_config_proto_rawDescOnce sync.Once
	file_config_proto_rawDescData = file_config_proto_rawDesc
)

func file_config_proto_rawDescGZIP() []byte {
	file_config_proto_rawDescOnce.Do(func() {
		file_config_proto_rawDescData = protoimpl.X.CompressGZIP(file_config_proto_rawDescData)
	})
	return file_config_proto_rawDescData
}

var file_config_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_config_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_config_proto_goTypes = []interface{}{
	(Network)(0),          // 0: bloock.Network
	(*ConfigData)(nil),    // 1: bloock.ConfigData
	(*Configuration)(nil), // 2: bloock.Configuration
	(*NetworkConfig)(nil), // 3: bloock.NetworkConfig
	nil,                   // 4: bloock.ConfigData.NetworksConfigEntry
}
var file_config_proto_depIdxs = []int32{
	2, // 0: bloock.ConfigData.config:type_name -> bloock.Configuration
	4, // 1: bloock.ConfigData.networks_config:type_name -> bloock.ConfigData.NetworksConfigEntry
	3, // 2: bloock.ConfigData.NetworksConfigEntry.value:type_name -> bloock.NetworkConfig
	3, // [3:3] is the sub-list for method output_type
	3, // [3:3] is the sub-list for method input_type
	3, // [3:3] is the sub-list for extension type_name
	3, // [3:3] is the sub-list for extension extendee
	0, // [0:3] is the sub-list for field type_name
}

func init() { file_config_proto_init() }
func file_config_proto_init() {
	if File_config_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_config_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ConfigData); i {
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
		file_config_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Configuration); i {
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
		file_config_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*NetworkConfig); i {
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
	file_config_proto_msgTypes[1].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_config_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_config_proto_goTypes,
		DependencyIndexes: file_config_proto_depIdxs,
		EnumInfos:         file_config_proto_enumTypes,
		MessageInfos:      file_config_proto_msgTypes,
	}.Build()
	File_config_proto = out.File
	file_config_proto_rawDesc = nil
	file_config_proto_goTypes = nil
	file_config_proto_depIdxs = nil
}
