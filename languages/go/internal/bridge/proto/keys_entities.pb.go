// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v4.23.4
// source: keys_entities.proto

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

type KeyType int32

const (
	KeyType_EcP256k KeyType = 0
	KeyType_Rsa2048 KeyType = 1
	KeyType_Rsa3072 KeyType = 2
	KeyType_Rsa4096 KeyType = 3
	KeyType_Aes128  KeyType = 4
	KeyType_Aes256  KeyType = 5
	KeyType_Bjj     KeyType = 6
)

// Enum value maps for KeyType.
var (
	KeyType_name = map[int32]string{
		0: "EcP256k",
		1: "Rsa2048",
		2: "Rsa3072",
		3: "Rsa4096",
		4: "Aes128",
		5: "Aes256",
		6: "Bjj",
	}
	KeyType_value = map[string]int32{
		"EcP256k": 0,
		"Rsa2048": 1,
		"Rsa3072": 2,
		"Rsa4096": 3,
		"Aes128":  4,
		"Aes256":  5,
		"Bjj":     6,
	}
)

func (x KeyType) Enum() *KeyType {
	p := new(KeyType)
	*p = x
	return p
}

func (x KeyType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (KeyType) Descriptor() protoreflect.EnumDescriptor {
	return file_keys_entities_proto_enumTypes[0].Descriptor()
}

func (KeyType) Type() protoreflect.EnumType {
	return &file_keys_entities_proto_enumTypes[0]
}

func (x KeyType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use KeyType.Descriptor instead.
func (KeyType) EnumDescriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{0}
}

type KeyProtectionLevel int32

const (
	KeyProtectionLevel_SOFTWARE KeyProtectionLevel = 0
	KeyProtectionLevel_HSM      KeyProtectionLevel = 1
)

// Enum value maps for KeyProtectionLevel.
var (
	KeyProtectionLevel_name = map[int32]string{
		0: "SOFTWARE",
		1: "HSM",
	}
	KeyProtectionLevel_value = map[string]int32{
		"SOFTWARE": 0,
		"HSM":      1,
	}
)

func (x KeyProtectionLevel) Enum() *KeyProtectionLevel {
	p := new(KeyProtectionLevel)
	*p = x
	return p
}

func (x KeyProtectionLevel) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (KeyProtectionLevel) Descriptor() protoreflect.EnumDescriptor {
	return file_keys_entities_proto_enumTypes[1].Descriptor()
}

func (KeyProtectionLevel) Type() protoreflect.EnumType {
	return &file_keys_entities_proto_enumTypes[1]
}

func (x KeyProtectionLevel) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use KeyProtectionLevel.Descriptor instead.
func (KeyProtectionLevel) EnumDescriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{1}
}

type CertificateType int32

const (
	CertificateType_PEM CertificateType = 0
	CertificateType_PFX CertificateType = 1
)

// Enum value maps for CertificateType.
var (
	CertificateType_name = map[int32]string{
		0: "PEM",
		1: "PFX",
	}
	CertificateType_value = map[string]int32{
		"PEM": 0,
		"PFX": 1,
	}
)

func (x CertificateType) Enum() *CertificateType {
	p := new(CertificateType)
	*p = x
	return p
}

func (x CertificateType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (CertificateType) Descriptor() protoreflect.EnumDescriptor {
	return file_keys_entities_proto_enumTypes[2].Descriptor()
}

func (CertificateType) Type() protoreflect.EnumType {
	return &file_keys_entities_proto_enumTypes[2]
}

func (x CertificateType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use CertificateType.Descriptor instead.
func (CertificateType) EnumDescriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{2}
}

type LocalKey struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Key        string  `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`
	KeyType    KeyType `protobuf:"varint,2,opt,name=key_type,json=keyType,proto3,enum=bloock.KeyType" json:"key_type,omitempty"`
	PrivateKey *string `protobuf:"bytes,3,opt,name=private_key,json=privateKey,proto3,oneof" json:"private_key,omitempty"`
}

func (x *LocalKey) Reset() {
	*x = LocalKey{}
	if protoimpl.UnsafeEnabled {
		mi := &file_keys_entities_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LocalKey) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LocalKey) ProtoMessage() {}

func (x *LocalKey) ProtoReflect() protoreflect.Message {
	mi := &file_keys_entities_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LocalKey.ProtoReflect.Descriptor instead.
func (*LocalKey) Descriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{0}
}

func (x *LocalKey) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

func (x *LocalKey) GetKeyType() KeyType {
	if x != nil {
		return x.KeyType
	}
	return KeyType_EcP256k
}

func (x *LocalKey) GetPrivateKey() string {
	if x != nil && x.PrivateKey != nil {
		return *x.PrivateKey
	}
	return ""
}

type ManagedKeyParams struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Protection KeyProtectionLevel `protobuf:"varint,1,opt,name=protection,proto3,enum=bloock.KeyProtectionLevel" json:"protection,omitempty"`
	KeyType    KeyType            `protobuf:"varint,2,opt,name=key_type,json=keyType,proto3,enum=bloock.KeyType" json:"key_type,omitempty"`
	Name       *string            `protobuf:"bytes,3,opt,name=name,proto3,oneof" json:"name,omitempty"`
	Expiration *int64             `protobuf:"varint,4,opt,name=expiration,proto3,oneof" json:"expiration,omitempty"`
}

func (x *ManagedKeyParams) Reset() {
	*x = ManagedKeyParams{}
	if protoimpl.UnsafeEnabled {
		mi := &file_keys_entities_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ManagedKeyParams) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ManagedKeyParams) ProtoMessage() {}

func (x *ManagedKeyParams) ProtoReflect() protoreflect.Message {
	mi := &file_keys_entities_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ManagedKeyParams.ProtoReflect.Descriptor instead.
func (*ManagedKeyParams) Descriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{1}
}

func (x *ManagedKeyParams) GetProtection() KeyProtectionLevel {
	if x != nil {
		return x.Protection
	}
	return KeyProtectionLevel_SOFTWARE
}

func (x *ManagedKeyParams) GetKeyType() KeyType {
	if x != nil {
		return x.KeyType
	}
	return KeyType_EcP256k
}

func (x *ManagedKeyParams) GetName() string {
	if x != nil && x.Name != nil {
		return *x.Name
	}
	return ""
}

func (x *ManagedKeyParams) GetExpiration() int64 {
	if x != nil && x.Expiration != nil {
		return *x.Expiration
	}
	return 0
}

type ManagedKey struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id         string             `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Key        string             `protobuf:"bytes,2,opt,name=key,proto3" json:"key,omitempty"`
	Protection KeyProtectionLevel `protobuf:"varint,3,opt,name=protection,proto3,enum=bloock.KeyProtectionLevel" json:"protection,omitempty"`
	KeyType    KeyType            `protobuf:"varint,4,opt,name=key_type,json=keyType,proto3,enum=bloock.KeyType" json:"key_type,omitempty"`
	Name       string             `protobuf:"bytes,5,opt,name=name,proto3" json:"name,omitempty"`
	Expiration int64              `protobuf:"varint,6,opt,name=expiration,proto3" json:"expiration,omitempty"`
}

func (x *ManagedKey) Reset() {
	*x = ManagedKey{}
	if protoimpl.UnsafeEnabled {
		mi := &file_keys_entities_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ManagedKey) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ManagedKey) ProtoMessage() {}

func (x *ManagedKey) ProtoReflect() protoreflect.Message {
	mi := &file_keys_entities_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ManagedKey.ProtoReflect.Descriptor instead.
func (*ManagedKey) Descriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{2}
}

func (x *ManagedKey) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *ManagedKey) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

func (x *ManagedKey) GetProtection() KeyProtectionLevel {
	if x != nil {
		return x.Protection
	}
	return KeyProtectionLevel_SOFTWARE
}

func (x *ManagedKey) GetKeyType() KeyType {
	if x != nil {
		return x.KeyType
	}
	return KeyType_EcP256k
}

func (x *ManagedKey) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *ManagedKey) GetExpiration() int64 {
	if x != nil {
		return x.Expiration
	}
	return 0
}

type CertificateSubject struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	CommonName         string  `protobuf:"bytes,1,opt,name=common_name,json=commonName,proto3" json:"common_name,omitempty"`
	OrganizationalUnit *string `protobuf:"bytes,2,opt,name=organizational_unit,json=organizationalUnit,proto3,oneof" json:"organizational_unit,omitempty"`
	Organization       *string `protobuf:"bytes,3,opt,name=organization,proto3,oneof" json:"organization,omitempty"`
	Location           *string `protobuf:"bytes,4,opt,name=location,proto3,oneof" json:"location,omitempty"`
	State              *string `protobuf:"bytes,5,opt,name=state,proto3,oneof" json:"state,omitempty"`
	Country            *string `protobuf:"bytes,6,opt,name=country,proto3,oneof" json:"country,omitempty"`
}

func (x *CertificateSubject) Reset() {
	*x = CertificateSubject{}
	if protoimpl.UnsafeEnabled {
		mi := &file_keys_entities_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CertificateSubject) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CertificateSubject) ProtoMessage() {}

func (x *CertificateSubject) ProtoReflect() protoreflect.Message {
	mi := &file_keys_entities_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CertificateSubject.ProtoReflect.Descriptor instead.
func (*CertificateSubject) Descriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{3}
}

func (x *CertificateSubject) GetCommonName() string {
	if x != nil {
		return x.CommonName
	}
	return ""
}

func (x *CertificateSubject) GetOrganizationalUnit() string {
	if x != nil && x.OrganizationalUnit != nil {
		return *x.OrganizationalUnit
	}
	return ""
}

func (x *CertificateSubject) GetOrganization() string {
	if x != nil && x.Organization != nil {
		return *x.Organization
	}
	return ""
}

func (x *CertificateSubject) GetLocation() string {
	if x != nil && x.Location != nil {
		return *x.Location
	}
	return ""
}

func (x *CertificateSubject) GetState() string {
	if x != nil && x.State != nil {
		return *x.State
	}
	return ""
}

func (x *CertificateSubject) GetCountry() string {
	if x != nil && x.Country != nil {
		return *x.Country
	}
	return ""
}

type LocalCertificateParams struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	KeyType  KeyType             `protobuf:"varint,1,opt,name=key_type,json=keyType,proto3,enum=bloock.KeyType" json:"key_type,omitempty"`
	Password string              `protobuf:"bytes,2,opt,name=password,proto3" json:"password,omitempty"`
	Subject  *CertificateSubject `protobuf:"bytes,3,opt,name=subject,proto3" json:"subject,omitempty"`
}

func (x *LocalCertificateParams) Reset() {
	*x = LocalCertificateParams{}
	if protoimpl.UnsafeEnabled {
		mi := &file_keys_entities_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LocalCertificateParams) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LocalCertificateParams) ProtoMessage() {}

func (x *LocalCertificateParams) ProtoReflect() protoreflect.Message {
	mi := &file_keys_entities_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LocalCertificateParams.ProtoReflect.Descriptor instead.
func (*LocalCertificateParams) Descriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{4}
}

func (x *LocalCertificateParams) GetKeyType() KeyType {
	if x != nil {
		return x.KeyType
	}
	return KeyType_EcP256k
}

func (x *LocalCertificateParams) GetPassword() string {
	if x != nil {
		return x.Password
	}
	return ""
}

func (x *LocalCertificateParams) GetSubject() *CertificateSubject {
	if x != nil {
		return x.Subject
	}
	return nil
}

type LocalCertificate struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Pkcs12 []byte `protobuf:"bytes,1,opt,name=pkcs12,proto3" json:"pkcs12,omitempty"`
}

func (x *LocalCertificate) Reset() {
	*x = LocalCertificate{}
	if protoimpl.UnsafeEnabled {
		mi := &file_keys_entities_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LocalCertificate) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LocalCertificate) ProtoMessage() {}

func (x *LocalCertificate) ProtoReflect() protoreflect.Message {
	mi := &file_keys_entities_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LocalCertificate.ProtoReflect.Descriptor instead.
func (*LocalCertificate) Descriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{5}
}

func (x *LocalCertificate) GetPkcs12() []byte {
	if x != nil {
		return x.Pkcs12
	}
	return nil
}

type ManagedCertificateParams struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	KeyType    KeyType             `protobuf:"varint,1,opt,name=key_type,json=keyType,proto3,enum=bloock.KeyType" json:"key_type,omitempty"`
	Expiration int32               `protobuf:"varint,2,opt,name=expiration,proto3" json:"expiration,omitempty"`
	Subject    *CertificateSubject `protobuf:"bytes,3,opt,name=subject,proto3" json:"subject,omitempty"`
}

func (x *ManagedCertificateParams) Reset() {
	*x = ManagedCertificateParams{}
	if protoimpl.UnsafeEnabled {
		mi := &file_keys_entities_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ManagedCertificateParams) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ManagedCertificateParams) ProtoMessage() {}

func (x *ManagedCertificateParams) ProtoReflect() protoreflect.Message {
	mi := &file_keys_entities_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ManagedCertificateParams.ProtoReflect.Descriptor instead.
func (*ManagedCertificateParams) Descriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{6}
}

func (x *ManagedCertificateParams) GetKeyType() KeyType {
	if x != nil {
		return x.KeyType
	}
	return KeyType_EcP256k
}

func (x *ManagedCertificateParams) GetExpiration() int32 {
	if x != nil {
		return x.Expiration
	}
	return 0
}

func (x *ManagedCertificateParams) GetSubject() *CertificateSubject {
	if x != nil {
		return x.Subject
	}
	return nil
}

type ManagedCertificate struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id         string             `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Key        string             `protobuf:"bytes,2,opt,name=key,proto3" json:"key,omitempty"`
	Protection KeyProtectionLevel `protobuf:"varint,3,opt,name=protection,proto3,enum=bloock.KeyProtectionLevel" json:"protection,omitempty"`
	KeyType    KeyType            `protobuf:"varint,4,opt,name=key_type,json=keyType,proto3,enum=bloock.KeyType" json:"key_type,omitempty"`
	Expiration int64              `protobuf:"varint,6,opt,name=expiration,proto3" json:"expiration,omitempty"`
}

func (x *ManagedCertificate) Reset() {
	*x = ManagedCertificate{}
	if protoimpl.UnsafeEnabled {
		mi := &file_keys_entities_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ManagedCertificate) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ManagedCertificate) ProtoMessage() {}

func (x *ManagedCertificate) ProtoReflect() protoreflect.Message {
	mi := &file_keys_entities_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ManagedCertificate.ProtoReflect.Descriptor instead.
func (*ManagedCertificate) Descriptor() ([]byte, []int) {
	return file_keys_entities_proto_rawDescGZIP(), []int{7}
}

func (x *ManagedCertificate) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *ManagedCertificate) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

func (x *ManagedCertificate) GetProtection() KeyProtectionLevel {
	if x != nil {
		return x.Protection
	}
	return KeyProtectionLevel_SOFTWARE
}

func (x *ManagedCertificate) GetKeyType() KeyType {
	if x != nil {
		return x.KeyType
	}
	return KeyType_EcP256k
}

func (x *ManagedCertificate) GetExpiration() int64 {
	if x != nil {
		return x.Expiration
	}
	return 0
}

var File_keys_entities_proto protoreflect.FileDescriptor

var file_keys_entities_proto_rawDesc = []byte{
	0x0a, 0x13, 0x6b, 0x65, 0x79, 0x73, 0x5f, 0x65, 0x6e, 0x74, 0x69, 0x74, 0x69, 0x65, 0x73, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x22, 0x7e, 0x0a,
	0x08, 0x4c, 0x6f, 0x63, 0x61, 0x6c, 0x4b, 0x65, 0x79, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x2a, 0x0a, 0x08, 0x6b,
	0x65, 0x79, 0x5f, 0x74, 0x79, 0x70, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x0f, 0x2e,
	0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65, 0x52, 0x07,
	0x6b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65, 0x12, 0x24, 0x0a, 0x0b, 0x70, 0x72, 0x69, 0x76, 0x61,
	0x74, 0x65, 0x5f, 0x6b, 0x65, 0x79, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x0a,
	0x70, 0x72, 0x69, 0x76, 0x61, 0x74, 0x65, 0x4b, 0x65, 0x79, 0x88, 0x01, 0x01, 0x42, 0x0e, 0x0a,
	0x0c, 0x5f, 0x70, 0x72, 0x69, 0x76, 0x61, 0x74, 0x65, 0x5f, 0x6b, 0x65, 0x79, 0x22, 0xd0, 0x01,
	0x0a, 0x10, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x64, 0x4b, 0x65, 0x79, 0x50, 0x61, 0x72, 0x61,
	0x6d, 0x73, 0x12, 0x3a, 0x0a, 0x0a, 0x70, 0x72, 0x6f, 0x74, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x1a, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e,
	0x4b, 0x65, 0x79, 0x50, 0x72, 0x6f, 0x74, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x4c, 0x65, 0x76,
	0x65, 0x6c, 0x52, 0x0a, 0x70, 0x72, 0x6f, 0x74, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x2a,
	0x0a, 0x08, 0x6b, 0x65, 0x79, 0x5f, 0x74, 0x79, 0x70, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0e,
	0x32, 0x0f, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4b, 0x65, 0x79, 0x54, 0x79, 0x70,
	0x65, 0x52, 0x07, 0x6b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65, 0x12, 0x17, 0x0a, 0x04, 0x6e, 0x61,
	0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65,
	0x88, 0x01, 0x01, 0x12, 0x23, 0x0a, 0x0a, 0x65, 0x78, 0x70, 0x69, 0x72, 0x61, 0x74, 0x69, 0x6f,
	0x6e, 0x18, 0x04, 0x20, 0x01, 0x28, 0x03, 0x48, 0x01, 0x52, 0x0a, 0x65, 0x78, 0x70, 0x69, 0x72,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x88, 0x01, 0x01, 0x42, 0x07, 0x0a, 0x05, 0x5f, 0x6e, 0x61, 0x6d,
	0x65, 0x42, 0x0d, 0x0a, 0x0b, 0x5f, 0x65, 0x78, 0x70, 0x69, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e,
	0x22, 0xca, 0x01, 0x0a, 0x0a, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x64, 0x4b, 0x65, 0x79, 0x12,
	0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12,
	0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65,
	0x79, 0x12, 0x3a, 0x0a, 0x0a, 0x70, 0x72, 0x6f, 0x74, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x1a, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4b,
	0x65, 0x79, 0x50, 0x72, 0x6f, 0x74, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x4c, 0x65, 0x76, 0x65,
	0x6c, 0x52, 0x0a, 0x70, 0x72, 0x6f, 0x74, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x2a, 0x0a,
	0x08, 0x6b, 0x65, 0x79, 0x5f, 0x74, 0x79, 0x70, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0e, 0x32,
	0x0f, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65,
	0x52, 0x07, 0x6b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1e, 0x0a,
	0x0a, 0x65, 0x78, 0x70, 0x69, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x06, 0x20, 0x01, 0x28,
	0x03, 0x52, 0x0a, 0x65, 0x78, 0x70, 0x69, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x22, 0xbb, 0x02,
	0x0a, 0x12, 0x43, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x53, 0x75, 0x62,
	0x6a, 0x65, 0x63, 0x74, 0x12, 0x1f, 0x0a, 0x0b, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x5f, 0x6e,
	0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a, 0x63, 0x6f, 0x6d, 0x6d, 0x6f,
	0x6e, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x34, 0x0a, 0x13, 0x6f, 0x72, 0x67, 0x61, 0x6e, 0x69, 0x7a,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x61, 0x6c, 0x5f, 0x75, 0x6e, 0x69, 0x74, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x48, 0x00, 0x52, 0x12, 0x6f, 0x72, 0x67, 0x61, 0x6e, 0x69, 0x7a, 0x61, 0x74, 0x69,
	0x6f, 0x6e, 0x61, 0x6c, 0x55, 0x6e, 0x69, 0x74, 0x88, 0x01, 0x01, 0x12, 0x27, 0x0a, 0x0c, 0x6f,
	0x72, 0x67, 0x61, 0x6e, 0x69, 0x7a, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x09, 0x48, 0x01, 0x52, 0x0c, 0x6f, 0x72, 0x67, 0x61, 0x6e, 0x69, 0x7a, 0x61, 0x74, 0x69, 0x6f,
	0x6e, 0x88, 0x01, 0x01, 0x12, 0x1f, 0x0a, 0x08, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e,
	0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x48, 0x02, 0x52, 0x08, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x69,
	0x6f, 0x6e, 0x88, 0x01, 0x01, 0x12, 0x19, 0x0a, 0x05, 0x73, 0x74, 0x61, 0x74, 0x65, 0x18, 0x05,
	0x20, 0x01, 0x28, 0x09, 0x48, 0x03, 0x52, 0x05, 0x73, 0x74, 0x61, 0x74, 0x65, 0x88, 0x01, 0x01,
	0x12, 0x1d, 0x0a, 0x07, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x72, 0x79, 0x18, 0x06, 0x20, 0x01, 0x28,
	0x09, 0x48, 0x04, 0x52, 0x07, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x72, 0x79, 0x88, 0x01, 0x01, 0x42,
	0x16, 0x0a, 0x14, 0x5f, 0x6f, 0x72, 0x67, 0x61, 0x6e, 0x69, 0x7a, 0x61, 0x74, 0x69, 0x6f, 0x6e,
	0x61, 0x6c, 0x5f, 0x75, 0x6e, 0x69, 0x74, 0x42, 0x0f, 0x0a, 0x0d, 0x5f, 0x6f, 0x72, 0x67, 0x61,
	0x6e, 0x69, 0x7a, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x42, 0x0b, 0x0a, 0x09, 0x5f, 0x6c, 0x6f, 0x63,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x42, 0x08, 0x0a, 0x06, 0x5f, 0x73, 0x74, 0x61, 0x74, 0x65, 0x42,
	0x0a, 0x0a, 0x08, 0x5f, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x72, 0x79, 0x22, 0x96, 0x01, 0x0a, 0x16,
	0x4c, 0x6f, 0x63, 0x61, 0x6c, 0x43, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65,
	0x50, 0x61, 0x72, 0x61, 0x6d, 0x73, 0x12, 0x2a, 0x0a, 0x08, 0x6b, 0x65, 0x79, 0x5f, 0x74, 0x79,
	0x70, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x0f, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63,
	0x6b, 0x2e, 0x4b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65, 0x52, 0x07, 0x6b, 0x65, 0x79, 0x54, 0x79,
	0x70, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x70, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64, 0x12, 0x34,
	0x0a, 0x07, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x1a, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69,
	0x63, 0x61, 0x74, 0x65, 0x53, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x52, 0x07, 0x73, 0x75, 0x62,
	0x6a, 0x65, 0x63, 0x74, 0x22, 0x2a, 0x0a, 0x10, 0x4c, 0x6f, 0x63, 0x61, 0x6c, 0x43, 0x65, 0x72,
	0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x12, 0x16, 0x0a, 0x06, 0x70, 0x6b, 0x63, 0x73,
	0x31, 0x32, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x06, 0x70, 0x6b, 0x63, 0x73, 0x31, 0x32,
	0x22, 0x9c, 0x01, 0x0a, 0x18, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x64, 0x43, 0x65, 0x72, 0x74,
	0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x50, 0x61, 0x72, 0x61, 0x6d, 0x73, 0x12, 0x2a, 0x0a,
	0x08, 0x6b, 0x65, 0x79, 0x5f, 0x74, 0x79, 0x70, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32,
	0x0f, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65,
	0x52, 0x07, 0x6b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65, 0x12, 0x1e, 0x0a, 0x0a, 0x65, 0x78, 0x70,
	0x69, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0a, 0x65,
	0x78, 0x70, 0x69, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x34, 0x0a, 0x07, 0x73, 0x75, 0x62,
	0x6a, 0x65, 0x63, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x62, 0x6c, 0x6f,
	0x6f, 0x63, 0x6b, 0x2e, 0x43, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x53,
	0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x52, 0x07, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74, 0x22,
	0xbe, 0x01, 0x0a, 0x12, 0x4d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x64, 0x43, 0x65, 0x72, 0x74, 0x69,
	0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x3a, 0x0a, 0x0a, 0x70, 0x72, 0x6f, 0x74,
	0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x1a, 0x2e, 0x62,
	0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e, 0x4b, 0x65, 0x79, 0x50, 0x72, 0x6f, 0x74, 0x65, 0x63, 0x74,
	0x69, 0x6f, 0x6e, 0x4c, 0x65, 0x76, 0x65, 0x6c, 0x52, 0x0a, 0x70, 0x72, 0x6f, 0x74, 0x65, 0x63,
	0x74, 0x69, 0x6f, 0x6e, 0x12, 0x2a, 0x0a, 0x08, 0x6b, 0x65, 0x79, 0x5f, 0x74, 0x79, 0x70, 0x65,
	0x18, 0x04, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x0f, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2e,
	0x4b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65, 0x52, 0x07, 0x6b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65,
	0x12, 0x1e, 0x0a, 0x0a, 0x65, 0x78, 0x70, 0x69, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x06,
	0x20, 0x01, 0x28, 0x03, 0x52, 0x0a, 0x65, 0x78, 0x70, 0x69, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e,
	0x2a, 0x5e, 0x0a, 0x07, 0x4b, 0x65, 0x79, 0x54, 0x79, 0x70, 0x65, 0x12, 0x0b, 0x0a, 0x07, 0x45,
	0x63, 0x50, 0x32, 0x35, 0x36, 0x6b, 0x10, 0x00, 0x12, 0x0b, 0x0a, 0x07, 0x52, 0x73, 0x61, 0x32,
	0x30, 0x34, 0x38, 0x10, 0x01, 0x12, 0x0b, 0x0a, 0x07, 0x52, 0x73, 0x61, 0x33, 0x30, 0x37, 0x32,
	0x10, 0x02, 0x12, 0x0b, 0x0a, 0x07, 0x52, 0x73, 0x61, 0x34, 0x30, 0x39, 0x36, 0x10, 0x03, 0x12,
	0x0a, 0x0a, 0x06, 0x41, 0x65, 0x73, 0x31, 0x32, 0x38, 0x10, 0x04, 0x12, 0x0a, 0x0a, 0x06, 0x41,
	0x65, 0x73, 0x32, 0x35, 0x36, 0x10, 0x05, 0x12, 0x07, 0x0a, 0x03, 0x42, 0x6a, 0x6a, 0x10, 0x06,
	0x2a, 0x2b, 0x0a, 0x12, 0x4b, 0x65, 0x79, 0x50, 0x72, 0x6f, 0x74, 0x65, 0x63, 0x74, 0x69, 0x6f,
	0x6e, 0x4c, 0x65, 0x76, 0x65, 0x6c, 0x12, 0x0c, 0x0a, 0x08, 0x53, 0x4f, 0x46, 0x54, 0x57, 0x41,
	0x52, 0x45, 0x10, 0x00, 0x12, 0x07, 0x0a, 0x03, 0x48, 0x53, 0x4d, 0x10, 0x01, 0x2a, 0x23, 0x0a,
	0x0f, 0x43, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x54, 0x79, 0x70, 0x65,
	0x12, 0x07, 0x0a, 0x03, 0x50, 0x45, 0x4d, 0x10, 0x00, 0x12, 0x07, 0x0a, 0x03, 0x50, 0x46, 0x58,
	0x10, 0x01, 0x42, 0x57, 0x0a, 0x1b, 0x63, 0x6f, 0x6d, 0x2e, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b,
	0x2e, 0x73, 0x64, 0x6b, 0x2e, 0x62, 0x72, 0x69, 0x64, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x5a, 0x38, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x62, 0x6c,
	0x6f, 0x6f, 0x63, 0x6b, 0x2f, 0x62, 0x6c, 0x6f, 0x6f, 0x63, 0x6b, 0x2d, 0x73, 0x64, 0x6b, 0x2d,
	0x67, 0x6f, 0x2f, 0x76, 0x32, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x62,
	0x72, 0x69, 0x64, 0x67, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x33,
}

var (
	file_keys_entities_proto_rawDescOnce sync.Once
	file_keys_entities_proto_rawDescData = file_keys_entities_proto_rawDesc
)

func file_keys_entities_proto_rawDescGZIP() []byte {
	file_keys_entities_proto_rawDescOnce.Do(func() {
		file_keys_entities_proto_rawDescData = protoimpl.X.CompressGZIP(file_keys_entities_proto_rawDescData)
	})
	return file_keys_entities_proto_rawDescData
}

var file_keys_entities_proto_enumTypes = make([]protoimpl.EnumInfo, 3)
var file_keys_entities_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_keys_entities_proto_goTypes = []interface{}{
	(KeyType)(0),                     // 0: bloock.KeyType
	(KeyProtectionLevel)(0),          // 1: bloock.KeyProtectionLevel
	(CertificateType)(0),             // 2: bloock.CertificateType
	(*LocalKey)(nil),                 // 3: bloock.LocalKey
	(*ManagedKeyParams)(nil),         // 4: bloock.ManagedKeyParams
	(*ManagedKey)(nil),               // 5: bloock.ManagedKey
	(*CertificateSubject)(nil),       // 6: bloock.CertificateSubject
	(*LocalCertificateParams)(nil),   // 7: bloock.LocalCertificateParams
	(*LocalCertificate)(nil),         // 8: bloock.LocalCertificate
	(*ManagedCertificateParams)(nil), // 9: bloock.ManagedCertificateParams
	(*ManagedCertificate)(nil),       // 10: bloock.ManagedCertificate
}
var file_keys_entities_proto_depIdxs = []int32{
	0,  // 0: bloock.LocalKey.key_type:type_name -> bloock.KeyType
	1,  // 1: bloock.ManagedKeyParams.protection:type_name -> bloock.KeyProtectionLevel
	0,  // 2: bloock.ManagedKeyParams.key_type:type_name -> bloock.KeyType
	1,  // 3: bloock.ManagedKey.protection:type_name -> bloock.KeyProtectionLevel
	0,  // 4: bloock.ManagedKey.key_type:type_name -> bloock.KeyType
	0,  // 5: bloock.LocalCertificateParams.key_type:type_name -> bloock.KeyType
	6,  // 6: bloock.LocalCertificateParams.subject:type_name -> bloock.CertificateSubject
	0,  // 7: bloock.ManagedCertificateParams.key_type:type_name -> bloock.KeyType
	6,  // 8: bloock.ManagedCertificateParams.subject:type_name -> bloock.CertificateSubject
	1,  // 9: bloock.ManagedCertificate.protection:type_name -> bloock.KeyProtectionLevel
	0,  // 10: bloock.ManagedCertificate.key_type:type_name -> bloock.KeyType
	11, // [11:11] is the sub-list for method output_type
	11, // [11:11] is the sub-list for method input_type
	11, // [11:11] is the sub-list for extension type_name
	11, // [11:11] is the sub-list for extension extendee
	0,  // [0:11] is the sub-list for field type_name
}

func init() { file_keys_entities_proto_init() }
func file_keys_entities_proto_init() {
	if File_keys_entities_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_keys_entities_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LocalKey); i {
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
		file_keys_entities_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ManagedKeyParams); i {
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
		file_keys_entities_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ManagedKey); i {
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
		file_keys_entities_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CertificateSubject); i {
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
		file_keys_entities_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LocalCertificateParams); i {
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
		file_keys_entities_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LocalCertificate); i {
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
		file_keys_entities_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ManagedCertificateParams); i {
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
		file_keys_entities_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ManagedCertificate); i {
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
	file_keys_entities_proto_msgTypes[0].OneofWrappers = []interface{}{}
	file_keys_entities_proto_msgTypes[1].OneofWrappers = []interface{}{}
	file_keys_entities_proto_msgTypes[3].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_keys_entities_proto_rawDesc,
			NumEnums:      3,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_keys_entities_proto_goTypes,
		DependencyIndexes: file_keys_entities_proto_depIdxs,
		EnumInfos:         file_keys_entities_proto_enumTypes,
		MessageInfos:      file_keys_entities_proto_msgTypes,
	}.Build()
	File_keys_entities_proto = out.File
	file_keys_entities_proto_rawDesc = nil
	file_keys_entities_proto_goTypes = nil
	file_keys_entities_proto_depIdxs = nil
}
