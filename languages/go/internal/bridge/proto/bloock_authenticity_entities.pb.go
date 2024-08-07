// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v5.26.1
// source: bloock_authenticity_entities.proto

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

type HashAlg int32

const (
	HashAlg_SHA_256    HashAlg = 0
	HashAlg_KECCAK_256 HashAlg = 1
	HashAlg_POSEIDON   HashAlg = 2
	HashAlg_NONE       HashAlg = 3
)

// Enum value maps for HashAlg.
var (
	HashAlg_name = map[int32]string{
		0: "SHA_256",
		1: "KECCAK_256",
		2: "POSEIDON",
		3: "NONE",
	}
	HashAlg_value = map[string]int32{
		"SHA_256":    0,
		"KECCAK_256": 1,
		"POSEIDON":   2,
		"NONE":       3,
	}
)

func (x HashAlg) Enum() *HashAlg {
	p := new(HashAlg)
	*p = x
	return p
}

func (x HashAlg) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (HashAlg) Descriptor() protoreflect.EnumDescriptor {
	return file_bloock_authenticity_entities_proto_enumTypes[0].Descriptor()
}

func (HashAlg) Type() protoreflect.EnumType {
	return &file_bloock_authenticity_entities_proto_enumTypes[0]
}

func (x HashAlg) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use HashAlg.Descriptor instead.
func (HashAlg) EnumDescriptor() ([]byte, []int) {
	return file_bloock_authenticity_entities_proto_rawDescGZIP(), []int{0}
}

type Signer struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	LocalKey           *LocalKey           `protobuf:"bytes,1,opt,name=local_key,json=localKey,proto3,oneof" json:"local_key,omitempty"`
	ManagedKey         *ManagedKey         `protobuf:"bytes,2,opt,name=managed_key,json=managedKey,proto3,oneof" json:"managed_key,omitempty"`
	LocalCertificate   *LocalCertificate   `protobuf:"bytes,3,opt,name=local_certificate,json=localCertificate,proto3,oneof" json:"local_certificate,omitempty"`
	ManagedCertificate *ManagedCertificate `protobuf:"bytes,4,opt,name=managed_certificate,json=managedCertificate,proto3,oneof" json:"managed_certificate,omitempty"`
	HashAlg            *HashAlg            `protobuf:"varint,5,opt,name=hash_alg,json=hashAlg,proto3,enum=bloock.HashAlg,oneof" json:"hash_alg,omitempty"`
	AccessControl      *AccessControl      `protobuf:"bytes,6,opt,name=access_control,json=accessControl,proto3,oneof" json:"access_control,omitempty"`
}

func (x *Signer) Reset() {
	*x = Signer{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bloock_authenticity_entities_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Signer) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Signer) ProtoMessage() {}

func (x *Signer) ProtoReflect() protoreflect.Message {
	mi := &file_bloock_authenticity_entities_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Signer.ProtoReflect.Descriptor instead.
func (*Signer) Descriptor() ([]byte, []int) {
	return file_bloock_authenticity_entities_proto_rawDescGZIP(), []int{0}
}

func (x *Signer) GetLocalKey() *LocalKey {
	if x != nil {
		return x.LocalKey
	}
	return nil
}

func (x *Signer) GetManagedKey() *ManagedKey {
	if x != nil {
		return x.ManagedKey
	}
	return nil
}

func (x *Signer) GetLocalCertificate() *LocalCertificate {
	if x != nil {
		return x.LocalCertificate
	}
	return nil
}

func (x *Signer) GetManagedCertificate() *ManagedCertificate {
	if x != nil {
		return x.ManagedCertificate
	}
	return nil
}

func (x *Signer) GetHashAlg() HashAlg {
	if x != nil && x.HashAlg != nil {
		return *x.HashAlg
	}
	return HashAlg_SHA_256
}

func (x *Signer) GetAccessControl() *AccessControl {
	if x != nil {
		return x.AccessControl
	}
	return nil
}

type Signature struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Signature   string  `protobuf:"bytes,1,opt,name=signature,proto3" json:"signature,omitempty"`
	Alg         string  `protobuf:"bytes,2,opt,name=alg,proto3" json:"alg,omitempty"`
	Kid         string  `protobuf:"bytes,3,opt,name=kid,proto3" json:"kid,omitempty"`
	MessageHash string  `protobuf:"bytes,4,opt,name=message_hash,json=messageHash,proto3" json:"message_hash,omitempty"`
	Subject     *string `protobuf:"bytes,5,opt,name=subject,proto3,oneof" json:"subject,omitempty"`
	HashAlg     *string `protobuf:"bytes,6,opt,name=hash_alg,json=hashAlg,proto3,oneof" json:"hash_alg,omitempty"`
}

func (x *Signature) Reset() {
	*x = Signature{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bloock_authenticity_entities_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Signature) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Signature) ProtoMessage() {}

func (x *Signature) ProtoReflect() protoreflect.Message {
	mi := &file_bloock_authenticity_entities_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Signature.ProtoReflect.Descriptor instead.
func (*Signature) Descriptor() ([]byte, []int) {
	return file_bloock_authenticity_entities_proto_rawDescGZIP(), []int{1}
}

func (x *Signature) GetSignature() string {
	if x != nil {
		return x.Signature
	}
	return ""
}

func (x *Signature) GetAlg() string {
	if x != nil {
		return x.Alg
	}
	return ""
}

func (x *Signature) GetKid() string {
	if x != nil {
		return x.Kid
	}
	return ""
}

func (x *Signature) GetMessageHash() string {
	if x != nil {
		return x.MessageHash
	}
	return ""
}

func (x *Signature) GetSubject() string {
	if x != nil && x.Subject != nil {
		return *x.Subject
	}
	return ""
}

func (x *Signature) GetHashAlg() string {
	if x != nil && x.HashAlg != nil {
		return *x.HashAlg
	}
	return ""
}

var File_bloock_authenticity_entities_proto protoreflect.FileDescriptor

var file_bloock_authenticity_entities_proto_rawDesc = []byte{
	0x0a, 0x22, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x5f, 0x61, 0x75, 0x74, 0x68, 0x65, 0x6e, 0x74,
	0x69, 0x63, 0x69, 0x74, 0x79, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69, 0x65, 0x73, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x1a, 0x1a, 0x62, 0x6c,
	0x6f, 0x6f, 0x63, 0x6b, 0x5f, 0x6b, 0x65, 0x79, 0x73, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69,
	0x65, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xf4, 0x03, 0x0a, 0x06, 0x53, 0x69, 0x67,
	0x6e, 0x65, 0x72, 0x12, 0x32, 0x0a, 0x09, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x5f, 0x6b, 0x65, 0x79,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x10, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e,
	0x4c, 0x6f, 0x63, 0x61, 0x6c, 0x4b, 0x65, 0x79, 0x48, 0x00, 0x52, 0x08, 0x6c, 0x6f, 0x63, 0x61,
	0x6c, 0x4b, 0x65, 0x79, 0x88, 0x01, 0x01, 0x12, 0x38, 0x0a, 0x0b, 0x6d, 0x61, 0x6e, 0x61, 0x67,
	0x65, 0x64, 0x5f, 0x6b, 0x65, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x64, 0x4b, 0x65, 0x79,
	0x48, 0x01, 0x52, 0x0a, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x64, 0x4b, 0x65, 0x79, 0x88, 0x01,
	0x01, 0x12, 0x4a, 0x0a, 0x11, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x5f, 0x63, 0x65, 0x72, 0x74, 0x69,
	0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x18, 0x2e, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4c, 0x6f, 0x63, 0x61, 0x6c, 0x43, 0x65, 0x72, 0x74, 0x69,
	0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x48, 0x02, 0x52, 0x10, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x43,
	0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x88, 0x01, 0x01, 0x12, 0x50, 0x0a,
	0x13, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x64, 0x5f, 0x63, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69,
	0x63, 0x61, 0x74, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x62, 0x6c, 0x6f,
	0x6f, 0x63, 0x6b, 0x2e, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x64, 0x43, 0x65, 0x72, 0x74, 0x69,
	0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x48, 0x03, 0x52, 0x12, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65,
	0x64, 0x43, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x88, 0x01, 0x01, 0x12,
	0x2f, 0x0a, 0x08, 0x68, 0x61, 0x73, 0x68, 0x5f, 0x61, 0x6c, 0x67, 0x18, 0x05, 0x20, 0x01, 0x28,
	0x0e, 0x32, 0x0f, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x48, 0x61, 0x73, 0x68, 0x41,
	0x6c, 0x67, 0x48, 0x04, 0x52, 0x07, 0x68, 0x61, 0x73, 0x68, 0x41, 0x6c, 0x67, 0x88, 0x01, 0x01,
	0x12, 0x41, 0x0a, 0x0e, 0x61, 0x63, 0x63, 0x65, 0x73, 0x73, 0x5f, 0x63, 0x6f, 0x6e, 0x74, 0x72,
	0x6f, 0x6c, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63,
	0x6b, 0x2e, 0x41, 0x63, 0x63, 0x65, 0x73, 0x73, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x48,
	0x05, 0x52, 0x0d, 0x61, 0x63, 0x63, 0x65, 0x73, 0x73, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c,
	0x88, 0x01, 0x01, 0x42, 0x0c, 0x0a, 0x0a, 0x5f, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x5f, 0x6b, 0x65,
	0x79, 0x42, 0x0e, 0x0a, 0x0c, 0x5f, 0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x64, 0x5f, 0x6b, 0x65,
	0x79, 0x42, 0x14, 0x0a, 0x12, 0x5f, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x5f, 0x63, 0x65, 0x72, 0x74,
	0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x42, 0x16, 0x0a, 0x14, 0x5f, 0x6d, 0x61, 0x6e, 0x61,
	0x67, 0x65, 0x64, 0x5f, 0x63, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x42,
	0x0b, 0x0a, 0x09, 0x5f, 0x68, 0x61, 0x73, 0x68, 0x5f, 0x61, 0x6c, 0x67, 0x42, 0x11, 0x0a, 0x0f,
	0x5f, 0x61, 0x63, 0x63, 0x65, 0x73, 0x73, 0x5f, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x22,
	0xc8, 0x01, 0x0a, 0x09, 0x53, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x12, 0x1c, 0x0a,
	0x09, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x09, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x74, 0x75, 0x72, 0x65, 0x12, 0x10, 0x0a, 0x03, 0x61,
	0x6c, 0x67, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x61, 0x6c, 0x67, 0x12, 0x10, 0x0a,
	0x03, 0x6b, 0x69, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x69, 0x64, 0x12,
	0x21, 0x0a, 0x0c, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x5f, 0x68, 0x61, 0x73, 0x68, 0x18,
	0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x48, 0x61,
	0x73, 0x68, 0x12, 0x1d, 0x0a, 0x07, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x18, 0x05, 0x20,
	0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x07, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x88, 0x01,
	0x01, 0x12, 0x1e, 0x0a, 0x08, 0x68, 0x61, 0x73, 0x68, 0x5f, 0x61, 0x6c, 0x67, 0x18, 0x06, 0x20,
	0x01, 0x28, 0x09, 0x48, 0x01, 0x52, 0x07, 0x68, 0x61, 0x73, 0x68, 0x41, 0x6c, 0x67, 0x88, 0x01,
	0x01, 0x42, 0x0a, 0x0a, 0x08, 0x5f, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x42, 0x0b, 0x0a,
	0x09, 0x5f, 0x68, 0x61, 0x73, 0x68, 0x5f, 0x61, 0x6c, 0x67, 0x2a, 0x3e, 0x0a, 0x07, 0x48, 0x61,
	0x73, 0x68, 0x41, 0x6c, 0x67, 0x12, 0x0b, 0x0a, 0x07, 0x53, 0x48, 0x41, 0x5f, 0x32, 0x35, 0x36,
	0x10, 0x00, 0x12, 0x0e, 0x0a, 0x0a, 0x4b, 0x45, 0x43, 0x43, 0x41, 0x4b, 0x5f, 0x32, 0x35, 0x36,
	0x10, 0x01, 0x12, 0x0c, 0x0a, 0x08, 0x50, 0x4f, 0x53, 0x45, 0x49, 0x44, 0x4f, 0x4e, 0x10, 0x02,
	0x12, 0x08, 0x0a, 0x04, 0x4e, 0x4f, 0x4e, 0x45, 0x10, 0x03, 0x42, 0x57, 0x0a, 0x1b, 0x63, 0x6f,
	0x6d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x73, 0x64, 0x6b, 0x2e, 0x62, 0x72, 0x69,
	0x64, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x5a, 0x38, 0x67, 0x69, 0x74, 0x68, 0x75,
	0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2f, 0x62, 0x6c, 0x6f,
	0x6f, 0x63, 0x6b, 0x2d, 0x73, 0x64, 0x6b, 0x2d, 0x67, 0x6f, 0x2f, 0x76, 0x32, 0x2f, 0x69, 0x6e,
	0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x62, 0x72, 0x69, 0x64, 0x67, 0x65, 0x2f, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_bloock_authenticity_entities_proto_rawDescOnce sync.Once
	file_bloock_authenticity_entities_proto_rawDescData = file_bloock_authenticity_entities_proto_rawDesc
)

func file_bloock_authenticity_entities_proto_rawDescGZIP() []byte {
	file_bloock_authenticity_entities_proto_rawDescOnce.Do(func() {
		file_bloock_authenticity_entities_proto_rawDescData = protoimpl.X.CompressGZIP(file_bloock_authenticity_entities_proto_rawDescData)
	})
	return file_bloock_authenticity_entities_proto_rawDescData
}

var file_bloock_authenticity_entities_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_bloock_authenticity_entities_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_bloock_authenticity_entities_proto_goTypes = []interface{}{
	(HashAlg)(0),               // 0: bloock.HashAlg
	(*Signer)(nil),             // 1: bloock.Signer
	(*Signature)(nil),          // 2: bloock.Signature
	(*LocalKey)(nil),           // 3: bloock.LocalKey
	(*ManagedKey)(nil),         // 4: bloock.ManagedKey
	(*LocalCertificate)(nil),   // 5: bloock.LocalCertificate
	(*ManagedCertificate)(nil), // 6: bloock.ManagedCertificate
	(*AccessControl)(nil),      // 7: bloock.AccessControl
}
var file_bloock_authenticity_entities_proto_depIdxs = []int32{
	3, // 0: bloock.Signer.local_key:type_name -> bloock.LocalKey
	4, // 1: bloock.Signer.managed_key:type_name -> bloock.ManagedKey
	5, // 2: bloock.Signer.local_certificate:type_name -> bloock.LocalCertificate
	6, // 3: bloock.Signer.managed_certificate:type_name -> bloock.ManagedCertificate
	0, // 4: bloock.Signer.hash_alg:type_name -> bloock.HashAlg
	7, // 5: bloock.Signer.access_control:type_name -> bloock.AccessControl
	6, // [6:6] is the sub-list for method output_type
	6, // [6:6] is the sub-list for method input_type
	6, // [6:6] is the sub-list for extension type_name
	6, // [6:6] is the sub-list for extension extendee
	0, // [0:6] is the sub-list for field type_name
}

func init() { file_bloock_authenticity_entities_proto_init() }
func file_bloock_authenticity_entities_proto_init() {
	if File_bloock_authenticity_entities_proto != nil {
		return
	}
	file_bloock_keys_entities_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_bloock_authenticity_entities_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Signer); i {
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
		file_bloock_authenticity_entities_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Signature); i {
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
	file_bloock_authenticity_entities_proto_msgTypes[0].OneofWrappers = []interface{}{}
	file_bloock_authenticity_entities_proto_msgTypes[1].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_bloock_authenticity_entities_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_bloock_authenticity_entities_proto_goTypes,
		DependencyIndexes: file_bloock_authenticity_entities_proto_depIdxs,
		EnumInfos:         file_bloock_authenticity_entities_proto_enumTypes,
		MessageInfos:      file_bloock_authenticity_entities_proto_msgTypes,
	}.Build()
	File_bloock_authenticity_entities_proto = out.File
	file_bloock_authenticity_entities_proto_rawDesc = nil
	file_bloock_authenticity_entities_proto_goTypes = nil
	file_bloock_authenticity_entities_proto_depIdxs = nil
}
