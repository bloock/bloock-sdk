// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v4.23.4
// source: identity.proto

package proto

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// IdentityServiceClient is the client API for IdentityService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type IdentityServiceClient interface {
	CreateIdentity(ctx context.Context, in *CreateIdentityRequest, opts ...grpc.CallOption) (*CreateIdentityResponse, error)
	LoadIdentity(ctx context.Context, in *LoadIdentityRequest, opts ...grpc.CallOption) (*LoadIdentityResponse, error)
	BuildSchema(ctx context.Context, in *BuildSchemaRequest, opts ...grpc.CallOption) (*BuildSchemaResponse, error)
	GetSchema(ctx context.Context, in *GetSchemaRequest, opts ...grpc.CallOption) (*GetSchemaResponse, error)
	CreateCredential(ctx context.Context, in *CreateCredentialRequest, opts ...grpc.CallOption) (*CreateCredentialResponse, error)
	GetOffer(ctx context.Context, in *GetOfferRequest, opts ...grpc.CallOption) (*GetOfferResponse, error)
	WaitOffer(ctx context.Context, in *WaitOfferRequest, opts ...grpc.CallOption) (*WaitOfferResponse, error)
	CredentialOfferToJson(ctx context.Context, in *CredentialOfferToJsonRequest, opts ...grpc.CallOption) (*CredentialOfferToJsonResponse, error)
	CredentialOfferFromJson(ctx context.Context, in *CredentialOfferFromJsonRequest, opts ...grpc.CallOption) (*CredentialOfferFromJsonResponse, error)
	CredentialOfferRedeem(ctx context.Context, in *CredentialOfferRedeemRequest, opts ...grpc.CallOption) (*CredentialOfferRedeemResponse, error)
	CredentialToJson(ctx context.Context, in *CredentialToJsonRequest, opts ...grpc.CallOption) (*CredentialToJsonResponse, error)
	CredentialFromJson(ctx context.Context, in *CredentialFromJsonRequest, opts ...grpc.CallOption) (*CredentialFromJsonResponse, error)
	VerifyCredential(ctx context.Context, in *VerifyCredentialRequest, opts ...grpc.CallOption) (*VerifyCredentialResponse, error)
	RevokeCredential(ctx context.Context, in *RevokeCredentialRequest, opts ...grpc.CallOption) (*RevokeCredentialResponse, error)
}

type identityServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewIdentityServiceClient(cc grpc.ClientConnInterface) IdentityServiceClient {
	return &identityServiceClient{cc}
}

func (c *identityServiceClient) CreateIdentity(ctx context.Context, in *CreateIdentityRequest, opts ...grpc.CallOption) (*CreateIdentityResponse, error) {
	out := new(CreateIdentityResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/CreateIdentity", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) LoadIdentity(ctx context.Context, in *LoadIdentityRequest, opts ...grpc.CallOption) (*LoadIdentityResponse, error) {
	out := new(LoadIdentityResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/LoadIdentity", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) BuildSchema(ctx context.Context, in *BuildSchemaRequest, opts ...grpc.CallOption) (*BuildSchemaResponse, error) {
	out := new(BuildSchemaResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/BuildSchema", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) GetSchema(ctx context.Context, in *GetSchemaRequest, opts ...grpc.CallOption) (*GetSchemaResponse, error) {
	out := new(GetSchemaResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/GetSchema", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) CreateCredential(ctx context.Context, in *CreateCredentialRequest, opts ...grpc.CallOption) (*CreateCredentialResponse, error) {
	out := new(CreateCredentialResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/CreateCredential", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) GetOffer(ctx context.Context, in *GetOfferRequest, opts ...grpc.CallOption) (*GetOfferResponse, error) {
	out := new(GetOfferResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/GetOffer", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) WaitOffer(ctx context.Context, in *WaitOfferRequest, opts ...grpc.CallOption) (*WaitOfferResponse, error) {
	out := new(WaitOfferResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/WaitOffer", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) CredentialOfferToJson(ctx context.Context, in *CredentialOfferToJsonRequest, opts ...grpc.CallOption) (*CredentialOfferToJsonResponse, error) {
	out := new(CredentialOfferToJsonResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/CredentialOfferToJson", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) CredentialOfferFromJson(ctx context.Context, in *CredentialOfferFromJsonRequest, opts ...grpc.CallOption) (*CredentialOfferFromJsonResponse, error) {
	out := new(CredentialOfferFromJsonResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/CredentialOfferFromJson", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) CredentialOfferRedeem(ctx context.Context, in *CredentialOfferRedeemRequest, opts ...grpc.CallOption) (*CredentialOfferRedeemResponse, error) {
	out := new(CredentialOfferRedeemResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/CredentialOfferRedeem", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) CredentialToJson(ctx context.Context, in *CredentialToJsonRequest, opts ...grpc.CallOption) (*CredentialToJsonResponse, error) {
	out := new(CredentialToJsonResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/CredentialToJson", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) CredentialFromJson(ctx context.Context, in *CredentialFromJsonRequest, opts ...grpc.CallOption) (*CredentialFromJsonResponse, error) {
	out := new(CredentialFromJsonResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/CredentialFromJson", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) VerifyCredential(ctx context.Context, in *VerifyCredentialRequest, opts ...grpc.CallOption) (*VerifyCredentialResponse, error) {
	out := new(VerifyCredentialResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/VerifyCredential", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *identityServiceClient) RevokeCredential(ctx context.Context, in *RevokeCredentialRequest, opts ...grpc.CallOption) (*RevokeCredentialResponse, error) {
	out := new(RevokeCredentialResponse)
	err := c.cc.Invoke(ctx, "/bloock.IdentityService/RevokeCredential", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// IdentityServiceServer is the server API for IdentityService service.
// All implementations must embed UnimplementedIdentityServiceServer
// for forward compatibility
type IdentityServiceServer interface {
	CreateIdentity(context.Context, *CreateIdentityRequest) (*CreateIdentityResponse, error)
	LoadIdentity(context.Context, *LoadIdentityRequest) (*LoadIdentityResponse, error)
	BuildSchema(context.Context, *BuildSchemaRequest) (*BuildSchemaResponse, error)
	GetSchema(context.Context, *GetSchemaRequest) (*GetSchemaResponse, error)
	CreateCredential(context.Context, *CreateCredentialRequest) (*CreateCredentialResponse, error)
	GetOffer(context.Context, *GetOfferRequest) (*GetOfferResponse, error)
	WaitOffer(context.Context, *WaitOfferRequest) (*WaitOfferResponse, error)
	CredentialOfferToJson(context.Context, *CredentialOfferToJsonRequest) (*CredentialOfferToJsonResponse, error)
	CredentialOfferFromJson(context.Context, *CredentialOfferFromJsonRequest) (*CredentialOfferFromJsonResponse, error)
	CredentialOfferRedeem(context.Context, *CredentialOfferRedeemRequest) (*CredentialOfferRedeemResponse, error)
	CredentialToJson(context.Context, *CredentialToJsonRequest) (*CredentialToJsonResponse, error)
	CredentialFromJson(context.Context, *CredentialFromJsonRequest) (*CredentialFromJsonResponse, error)
	VerifyCredential(context.Context, *VerifyCredentialRequest) (*VerifyCredentialResponse, error)
	RevokeCredential(context.Context, *RevokeCredentialRequest) (*RevokeCredentialResponse, error)
	mustEmbedUnimplementedIdentityServiceServer()
}

// UnimplementedIdentityServiceServer must be embedded to have forward compatible implementations.
type UnimplementedIdentityServiceServer struct {
}

func (UnimplementedIdentityServiceServer) CreateIdentity(context.Context, *CreateIdentityRequest) (*CreateIdentityResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateIdentity not implemented")
}
func (UnimplementedIdentityServiceServer) LoadIdentity(context.Context, *LoadIdentityRequest) (*LoadIdentityResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method LoadIdentity not implemented")
}
func (UnimplementedIdentityServiceServer) BuildSchema(context.Context, *BuildSchemaRequest) (*BuildSchemaResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method BuildSchema not implemented")
}
func (UnimplementedIdentityServiceServer) GetSchema(context.Context, *GetSchemaRequest) (*GetSchemaResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetSchema not implemented")
}
func (UnimplementedIdentityServiceServer) CreateCredential(context.Context, *CreateCredentialRequest) (*CreateCredentialResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateCredential not implemented")
}
func (UnimplementedIdentityServiceServer) GetOffer(context.Context, *GetOfferRequest) (*GetOfferResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetOffer not implemented")
}
func (UnimplementedIdentityServiceServer) WaitOffer(context.Context, *WaitOfferRequest) (*WaitOfferResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method WaitOffer not implemented")
}
func (UnimplementedIdentityServiceServer) CredentialOfferToJson(context.Context, *CredentialOfferToJsonRequest) (*CredentialOfferToJsonResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CredentialOfferToJson not implemented")
}
func (UnimplementedIdentityServiceServer) CredentialOfferFromJson(context.Context, *CredentialOfferFromJsonRequest) (*CredentialOfferFromJsonResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CredentialOfferFromJson not implemented")
}
func (UnimplementedIdentityServiceServer) CredentialOfferRedeem(context.Context, *CredentialOfferRedeemRequest) (*CredentialOfferRedeemResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CredentialOfferRedeem not implemented")
}
func (UnimplementedIdentityServiceServer) CredentialToJson(context.Context, *CredentialToJsonRequest) (*CredentialToJsonResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CredentialToJson not implemented")
}
func (UnimplementedIdentityServiceServer) CredentialFromJson(context.Context, *CredentialFromJsonRequest) (*CredentialFromJsonResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CredentialFromJson not implemented")
}
func (UnimplementedIdentityServiceServer) VerifyCredential(context.Context, *VerifyCredentialRequest) (*VerifyCredentialResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method VerifyCredential not implemented")
}
func (UnimplementedIdentityServiceServer) RevokeCredential(context.Context, *RevokeCredentialRequest) (*RevokeCredentialResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RevokeCredential not implemented")
}
func (UnimplementedIdentityServiceServer) mustEmbedUnimplementedIdentityServiceServer() {}

// UnsafeIdentityServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to IdentityServiceServer will
// result in compilation errors.
type UnsafeIdentityServiceServer interface {
	mustEmbedUnimplementedIdentityServiceServer()
}

func RegisterIdentityServiceServer(s grpc.ServiceRegistrar, srv IdentityServiceServer) {
	s.RegisterService(&IdentityService_ServiceDesc, srv)
}

func _IdentityService_CreateIdentity_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateIdentityRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).CreateIdentity(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/CreateIdentity",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).CreateIdentity(ctx, req.(*CreateIdentityRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_LoadIdentity_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LoadIdentityRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).LoadIdentity(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/LoadIdentity",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).LoadIdentity(ctx, req.(*LoadIdentityRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_BuildSchema_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BuildSchemaRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).BuildSchema(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/BuildSchema",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).BuildSchema(ctx, req.(*BuildSchemaRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_GetSchema_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetSchemaRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).GetSchema(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/GetSchema",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).GetSchema(ctx, req.(*GetSchemaRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_CreateCredential_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateCredentialRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).CreateCredential(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/CreateCredential",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).CreateCredential(ctx, req.(*CreateCredentialRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_GetOffer_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetOfferRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).GetOffer(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/GetOffer",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).GetOffer(ctx, req.(*GetOfferRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_WaitOffer_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(WaitOfferRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).WaitOffer(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/WaitOffer",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).WaitOffer(ctx, req.(*WaitOfferRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_CredentialOfferToJson_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CredentialOfferToJsonRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).CredentialOfferToJson(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/CredentialOfferToJson",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).CredentialOfferToJson(ctx, req.(*CredentialOfferToJsonRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_CredentialOfferFromJson_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CredentialOfferFromJsonRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).CredentialOfferFromJson(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/CredentialOfferFromJson",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).CredentialOfferFromJson(ctx, req.(*CredentialOfferFromJsonRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_CredentialOfferRedeem_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CredentialOfferRedeemRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).CredentialOfferRedeem(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/CredentialOfferRedeem",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).CredentialOfferRedeem(ctx, req.(*CredentialOfferRedeemRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_CredentialToJson_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CredentialToJsonRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).CredentialToJson(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/CredentialToJson",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).CredentialToJson(ctx, req.(*CredentialToJsonRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_CredentialFromJson_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CredentialFromJsonRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).CredentialFromJson(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/CredentialFromJson",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).CredentialFromJson(ctx, req.(*CredentialFromJsonRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_VerifyCredential_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(VerifyCredentialRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).VerifyCredential(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/VerifyCredential",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).VerifyCredential(ctx, req.(*VerifyCredentialRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IdentityService_RevokeCredential_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RevokeCredentialRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IdentityServiceServer).RevokeCredential(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.IdentityService/RevokeCredential",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IdentityServiceServer).RevokeCredential(ctx, req.(*RevokeCredentialRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// IdentityService_ServiceDesc is the grpc.ServiceDesc for IdentityService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var IdentityService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bloock.IdentityService",
	HandlerType: (*IdentityServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "CreateIdentity",
			Handler:    _IdentityService_CreateIdentity_Handler,
		},
		{
			MethodName: "LoadIdentity",
			Handler:    _IdentityService_LoadIdentity_Handler,
		},
		{
			MethodName: "BuildSchema",
			Handler:    _IdentityService_BuildSchema_Handler,
		},
		{
			MethodName: "GetSchema",
			Handler:    _IdentityService_GetSchema_Handler,
		},
		{
			MethodName: "CreateCredential",
			Handler:    _IdentityService_CreateCredential_Handler,
		},
		{
			MethodName: "GetOffer",
			Handler:    _IdentityService_GetOffer_Handler,
		},
		{
			MethodName: "WaitOffer",
			Handler:    _IdentityService_WaitOffer_Handler,
		},
		{
			MethodName: "CredentialOfferToJson",
			Handler:    _IdentityService_CredentialOfferToJson_Handler,
		},
		{
			MethodName: "CredentialOfferFromJson",
			Handler:    _IdentityService_CredentialOfferFromJson_Handler,
		},
		{
			MethodName: "CredentialOfferRedeem",
			Handler:    _IdentityService_CredentialOfferRedeem_Handler,
		},
		{
			MethodName: "CredentialToJson",
			Handler:    _IdentityService_CredentialToJson_Handler,
		},
		{
			MethodName: "CredentialFromJson",
			Handler:    _IdentityService_CredentialFromJson_Handler,
		},
		{
			MethodName: "VerifyCredential",
			Handler:    _IdentityService_VerifyCredential_Handler,
		},
		{
			MethodName: "RevokeCredential",
			Handler:    _IdentityService_RevokeCredential_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "identity.proto",
}
