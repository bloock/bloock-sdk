// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v4.25.3
// source: identity_core.proto

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

type CreateCoreCredentialRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ConfigData         *ConfigData          `protobuf:"bytes,1,opt,name=config_data,json=configData,proto3" json:"config_data,omitempty"`
	SchemaId           string               `protobuf:"bytes,2,opt,name=schema_id,json=schemaId,proto3" json:"schema_id,omitempty"`
	IssuerDid          string               `protobuf:"bytes,3,opt,name=issuer_did,json=issuerDid,proto3" json:"issuer_did,omitempty"`
	HolderDid          string               `protobuf:"bytes,4,opt,name=holder_did,json=holderDid,proto3" json:"holder_did,omitempty"`
	Expiration         int64                `protobuf:"varint,5,opt,name=expiration,proto3" json:"expiration,omitempty"`
	Version            *int32               `protobuf:"varint,6,opt,name=version,proto3,oneof" json:"version,omitempty"`
	Key                *Key                 `protobuf:"bytes,7,opt,name=key,proto3" json:"key,omitempty"`
	StringAttributes   []*StringAttribute   `protobuf:"bytes,8,rep,name=string_attributes,json=stringAttributes,proto3" json:"string_attributes,omitempty"`
	IntegerAttributes  []*IntegerAttribute  `protobuf:"bytes,9,rep,name=integer_attributes,json=integerAttributes,proto3" json:"integer_attributes,omitempty"`
	DecimalAttributes  []*DecimalAttribute  `protobuf:"bytes,10,rep,name=decimal_attributes,json=decimalAttributes,proto3" json:"decimal_attributes,omitempty"`
	BooleanAttributes  []*BooleanAttribute  `protobuf:"bytes,11,rep,name=boolean_attributes,json=booleanAttributes,proto3" json:"boolean_attributes,omitempty"`
	DateAttributes     []*DateAttribute     `protobuf:"bytes,12,rep,name=date_attributes,json=dateAttributes,proto3" json:"date_attributes,omitempty"`
	DatetimeAttributes []*DateTimeAttribute `protobuf:"bytes,13,rep,name=datetime_attributes,json=datetimeAttributes,proto3" json:"datetime_attributes,omitempty"`
}

func (x *CreateCoreCredentialRequest) Reset() {
	*x = CreateCoreCredentialRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_identity_core_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateCoreCredentialRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateCoreCredentialRequest) ProtoMessage() {}

func (x *CreateCoreCredentialRequest) ProtoReflect() protoreflect.Message {
	mi := &file_identity_core_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateCoreCredentialRequest.ProtoReflect.Descriptor instead.
func (*CreateCoreCredentialRequest) Descriptor() ([]byte, []int) {
	return file_identity_core_proto_rawDescGZIP(), []int{0}
}

func (x *CreateCoreCredentialRequest) GetConfigData() *ConfigData {
	if x != nil {
		return x.ConfigData
	}
	return nil
}

func (x *CreateCoreCredentialRequest) GetSchemaId() string {
	if x != nil {
		return x.SchemaId
	}
	return ""
}

func (x *CreateCoreCredentialRequest) GetIssuerDid() string {
	if x != nil {
		return x.IssuerDid
	}
	return ""
}

func (x *CreateCoreCredentialRequest) GetHolderDid() string {
	if x != nil {
		return x.HolderDid
	}
	return ""
}

func (x *CreateCoreCredentialRequest) GetExpiration() int64 {
	if x != nil {
		return x.Expiration
	}
	return 0
}

func (x *CreateCoreCredentialRequest) GetVersion() int32 {
	if x != nil && x.Version != nil {
		return *x.Version
	}
	return 0
}

func (x *CreateCoreCredentialRequest) GetKey() *Key {
	if x != nil {
		return x.Key
	}
	return nil
}

func (x *CreateCoreCredentialRequest) GetStringAttributes() []*StringAttribute {
	if x != nil {
		return x.StringAttributes
	}
	return nil
}

func (x *CreateCoreCredentialRequest) GetIntegerAttributes() []*IntegerAttribute {
	if x != nil {
		return x.IntegerAttributes
	}
	return nil
}

func (x *CreateCoreCredentialRequest) GetDecimalAttributes() []*DecimalAttribute {
	if x != nil {
		return x.DecimalAttributes
	}
	return nil
}

func (x *CreateCoreCredentialRequest) GetBooleanAttributes() []*BooleanAttribute {
	if x != nil {
		return x.BooleanAttributes
	}
	return nil
}

func (x *CreateCoreCredentialRequest) GetDateAttributes() []*DateAttribute {
	if x != nil {
		return x.DateAttributes
	}
	return nil
}

func (x *CreateCoreCredentialRequest) GetDatetimeAttributes() []*DateTimeAttribute {
	if x != nil {
		return x.DatetimeAttributes
	}
	return nil
}

type CreateCoreCredentialResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	CredentialReceipt *CredentialReceipt `protobuf:"bytes,1,opt,name=credential_receipt,json=credentialReceipt,proto3" json:"credential_receipt,omitempty"`
	Error             *Error             `protobuf:"bytes,2,opt,name=error,proto3,oneof" json:"error,omitempty"`
}

func (x *CreateCoreCredentialResponse) Reset() {
	*x = CreateCoreCredentialResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_identity_core_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateCoreCredentialResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateCoreCredentialResponse) ProtoMessage() {}

func (x *CreateCoreCredentialResponse) ProtoReflect() protoreflect.Message {
	mi := &file_identity_core_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateCoreCredentialResponse.ProtoReflect.Descriptor instead.
func (*CreateCoreCredentialResponse) Descriptor() ([]byte, []int) {
	return file_identity_core_proto_rawDescGZIP(), []int{1}
}

func (x *CreateCoreCredentialResponse) GetCredentialReceipt() *CredentialReceipt {
	if x != nil {
		return x.CredentialReceipt
	}
	return nil
}

func (x *CreateCoreCredentialResponse) GetError() *Error {
	if x != nil {
		return x.Error
	}
	return nil
}

var File_identity_core_proto protoreflect.FileDescriptor

var file_identity_core_proto_rawDesc = []byte{
	0x0a, 0x13, 0x69, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x79, 0x5f, 0x63, 0x6f, 0x72, 0x65, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x1a, 0x0c, 0x63,
	0x6f, 0x6e, 0x66, 0x69, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x17, 0x69, 0x64, 0x65,
	0x6e, 0x74, 0x69, 0x74, 0x79, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69, 0x65, 0x73, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x0c, 0x73, 0x68, 0x61, 0x72, 0x65, 0x64, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x1a, 0x13, 0x6b, 0x65, 0x79, 0x73, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69, 0x65,
	0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xc4, 0x05, 0x0a, 0x1b, 0x43, 0x72, 0x65, 0x61,
	0x74, 0x65, 0x43, 0x6f, 0x72, 0x65, 0x43, 0x72, 0x65, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x61, 0x6c,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x33, 0x0a, 0x0b, 0x63, 0x6f, 0x6e, 0x66, 0x69,
	0x67, 0x5f, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61,
	0x52, 0x0a, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x44, 0x61, 0x74, 0x61, 0x12, 0x1b, 0x0a, 0x09,
	0x73, 0x63, 0x68, 0x65, 0x6d, 0x61, 0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x08, 0x73, 0x63, 0x68, 0x65, 0x6d, 0x61, 0x49, 0x64, 0x12, 0x1d, 0x0a, 0x0a, 0x69, 0x73, 0x73,
	0x75, 0x65, 0x72, 0x5f, 0x64, 0x69, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x69,
	0x73, 0x73, 0x75, 0x65, 0x72, 0x44, 0x69, 0x64, 0x12, 0x1d, 0x0a, 0x0a, 0x68, 0x6f, 0x6c, 0x64,
	0x65, 0x72, 0x5f, 0x64, 0x69, 0x64, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x68, 0x6f,
	0x6c, 0x64, 0x65, 0x72, 0x44, 0x69, 0x64, 0x12, 0x1e, 0x0a, 0x0a, 0x65, 0x78, 0x70, 0x69, 0x72,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x05, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0a, 0x65, 0x78, 0x70,
	0x69, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x1d, 0x0a, 0x07, 0x76, 0x65, 0x72, 0x73, 0x69,
	0x6f, 0x6e, 0x18, 0x06, 0x20, 0x01, 0x28, 0x05, 0x48, 0x00, 0x52, 0x07, 0x76, 0x65, 0x72, 0x73,
	0x69, 0x6f, 0x6e, 0x88, 0x01, 0x01, 0x12, 0x1d, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x07, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x0b, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4b, 0x65, 0x79,
	0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x44, 0x0a, 0x11, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x5f,
	0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x18, 0x08, 0x20, 0x03, 0x28, 0x0b,
	0x32, 0x17, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67,
	0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x52, 0x10, 0x73, 0x74, 0x72, 0x69, 0x6e,
	0x67, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x12, 0x47, 0x0a, 0x12, 0x69,
	0x6e, 0x74, 0x65, 0x67, 0x65, 0x72, 0x5f, 0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65,
	0x73, 0x18, 0x09, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x18, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b,
	0x2e, 0x49, 0x6e, 0x74, 0x65, 0x67, 0x65, 0x72, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74,
	0x65, 0x52, 0x11, 0x69, 0x6e, 0x74, 0x65, 0x67, 0x65, 0x72, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62,
	0x75, 0x74, 0x65, 0x73, 0x12, 0x47, 0x0a, 0x12, 0x64, 0x65, 0x63, 0x69, 0x6d, 0x61, 0x6c, 0x5f,
	0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x18, 0x0a, 0x20, 0x03, 0x28, 0x0b,
	0x32, 0x18, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x44, 0x65, 0x63, 0x69, 0x6d, 0x61,
	0x6c, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x52, 0x11, 0x64, 0x65, 0x63, 0x69,
	0x6d, 0x61, 0x6c, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x12, 0x47, 0x0a,
	0x12, 0x62, 0x6f, 0x6f, 0x6c, 0x65, 0x61, 0x6e, 0x5f, 0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75,
	0x74, 0x65, 0x73, 0x18, 0x0b, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x18, 0x2e, 0x62, 0x6c, 0x6f, 0x6f,
	0x63, 0x6b, 0x2e, 0x42, 0x6f, 0x6f, 0x6c, 0x65, 0x61, 0x6e, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62,
	0x75, 0x74, 0x65, 0x52, 0x11, 0x62, 0x6f, 0x6f, 0x6c, 0x65, 0x61, 0x6e, 0x41, 0x74, 0x74, 0x72,
	0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x12, 0x3e, 0x0a, 0x0f, 0x64, 0x61, 0x74, 0x65, 0x5f, 0x61,
	0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x18, 0x0c, 0x20, 0x03, 0x28, 0x0b, 0x32,
	0x15, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x44, 0x61, 0x74, 0x65, 0x41, 0x74, 0x74,
	0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x52, 0x0e, 0x64, 0x61, 0x74, 0x65, 0x41, 0x74, 0x74, 0x72,
	0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x12, 0x4a, 0x0a, 0x13, 0x64, 0x61, 0x74, 0x65, 0x74, 0x69,
	0x6d, 0x65, 0x5f, 0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x18, 0x0d, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x19, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x44, 0x61, 0x74,
	0x65, 0x54, 0x69, 0x6d, 0x65, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x52, 0x12,
	0x64, 0x61, 0x74, 0x65, 0x74, 0x69, 0x6d, 0x65, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74,
	0x65, 0x73, 0x42, 0x0a, 0x0a, 0x08, 0x5f, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x22, 0x9c,
	0x01, 0x0a, 0x1c, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x43, 0x6f, 0x72, 0x65, 0x43, 0x72, 0x65,
	0x64, 0x65, 0x6e, 0x74, 0x69, 0x61, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12,
	0x48, 0x0a, 0x12, 0x63, 0x72, 0x65, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x61, 0x6c, 0x5f, 0x72, 0x65,
	0x63, 0x65, 0x69, 0x70, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x19, 0x2e, 0x62, 0x6c,
	0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x72, 0x65, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x61, 0x6c, 0x52,
	0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x52, 0x11, 0x63, 0x72, 0x65, 0x64, 0x65, 0x6e, 0x74, 0x69,
	0x61, 0x6c, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x12, 0x28, 0x0a, 0x05, 0x65, 0x72, 0x72,
	0x6f, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63,
	0x6b, 0x2e, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x48, 0x00, 0x52, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72,
	0x88, 0x01, 0x01, 0x42, 0x08, 0x0a, 0x06, 0x5f, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x32, 0x78, 0x0a,
	0x13, 0x49, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x79, 0x43, 0x6f, 0x72, 0x65, 0x53, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x12, 0x61, 0x0a, 0x14, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x43, 0x6f,
	0x72, 0x65, 0x43, 0x72, 0x65, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x61, 0x6c, 0x12, 0x23, 0x2e, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x43, 0x6f, 0x72, 0x65,
	0x43, 0x72, 0x65, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x61, 0x6c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x24, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74,
	0x65, 0x43, 0x6f, 0x72, 0x65, 0x43, 0x72, 0x65, 0x64, 0x65, 0x6e, 0x74, 0x69, 0x61, 0x6c, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x57, 0x0a, 0x1b, 0x63, 0x6f, 0x6d, 0x2e, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x73, 0x64, 0x6b, 0x2e, 0x62, 0x72, 0x69, 0x64, 0x67, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x5a, 0x38, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63,
	0x6f, 0x6d, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b,
	0x2d, 0x73, 0x64, 0x6b, 0x2d, 0x67, 0x6f, 0x2f, 0x76, 0x32, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72,
	0x6e, 0x61, 0x6c, 0x2f, 0x62, 0x72, 0x69, 0x64, 0x67, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_identity_core_proto_rawDescOnce sync.Once
	file_identity_core_proto_rawDescData = file_identity_core_proto_rawDesc
)

func file_identity_core_proto_rawDescGZIP() []byte {
	file_identity_core_proto_rawDescOnce.Do(func() {
		file_identity_core_proto_rawDescData = protoimpl.X.CompressGZIP(file_identity_core_proto_rawDescData)
	})
	return file_identity_core_proto_rawDescData
}

var file_identity_core_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_identity_core_proto_goTypes = []interface{}{
	(*CreateCoreCredentialRequest)(nil),  // 0: bloock.CreateCoreCredentialRequest
	(*CreateCoreCredentialResponse)(nil), // 1: bloock.CreateCoreCredentialResponse
	(*ConfigData)(nil),                   // 2: bloock.ConfigData
	(*Key)(nil),                          // 3: bloock.Key
	(*StringAttribute)(nil),              // 4: bloock.StringAttribute
	(*IntegerAttribute)(nil),             // 5: bloock.IntegerAttribute
	(*DecimalAttribute)(nil),             // 6: bloock.DecimalAttribute
	(*BooleanAttribute)(nil),             // 7: bloock.BooleanAttribute
	(*DateAttribute)(nil),                // 8: bloock.DateAttribute
	(*DateTimeAttribute)(nil),            // 9: bloock.DateTimeAttribute
	(*CredentialReceipt)(nil),            // 10: bloock.CredentialReceipt
	(*Error)(nil),                        // 11: bloock.Error
}
var file_identity_core_proto_depIdxs = []int32{
	2,  // 0: bloock.CreateCoreCredentialRequest.config_data:type_name -> bloock.ConfigData
	3,  // 1: bloock.CreateCoreCredentialRequest.key:type_name -> bloock.Key
	4,  // 2: bloock.CreateCoreCredentialRequest.string_attributes:type_name -> bloock.StringAttribute
	5,  // 3: bloock.CreateCoreCredentialRequest.integer_attributes:type_name -> bloock.IntegerAttribute
	6,  // 4: bloock.CreateCoreCredentialRequest.decimal_attributes:type_name -> bloock.DecimalAttribute
	7,  // 5: bloock.CreateCoreCredentialRequest.boolean_attributes:type_name -> bloock.BooleanAttribute
	8,  // 6: bloock.CreateCoreCredentialRequest.date_attributes:type_name -> bloock.DateAttribute
	9,  // 7: bloock.CreateCoreCredentialRequest.datetime_attributes:type_name -> bloock.DateTimeAttribute
	10, // 8: bloock.CreateCoreCredentialResponse.credential_receipt:type_name -> bloock.CredentialReceipt
	11, // 9: bloock.CreateCoreCredentialResponse.error:type_name -> bloock.Error
	0,  // 10: bloock.IdentityCoreService.CreateCoreCredential:input_type -> bloock.CreateCoreCredentialRequest
	1,  // 11: bloock.IdentityCoreService.CreateCoreCredential:output_type -> bloock.CreateCoreCredentialResponse
	11, // [11:12] is the sub-list for method output_type
	10, // [10:11] is the sub-list for method input_type
	10, // [10:10] is the sub-list for extension type_name
	10, // [10:10] is the sub-list for extension extendee
	0,  // [0:10] is the sub-list for field type_name
}

func init() { file_identity_core_proto_init() }
func file_identity_core_proto_init() {
	if File_identity_core_proto != nil {
		return
	}
	file_config_proto_init()
	file_identity_entities_proto_init()
	file_shared_proto_init()
	file_keys_entities_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_identity_core_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateCoreCredentialRequest); i {
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
		file_identity_core_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateCoreCredentialResponse); i {
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
	file_identity_core_proto_msgTypes[0].OneofWrappers = []interface{}{}
	file_identity_core_proto_msgTypes[1].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_identity_core_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_identity_core_proto_goTypes,
		DependencyIndexes: file_identity_core_proto_depIdxs,
		MessageInfos:      file_identity_core_proto_msgTypes,
	}.Build()
	File_identity_core_proto = out.File
	file_identity_core_proto_rawDesc = nil
	file_identity_core_proto_goTypes = nil
	file_identity_core_proto_depIdxs = nil
}
