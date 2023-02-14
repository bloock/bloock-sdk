// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.5
// source: authenticity.proto

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

// AuthenticityServiceClient is the client API for AuthenticityService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type AuthenticityServiceClient interface {
	GenerateEcdsaKeys(ctx context.Context, in *GenerateEcdsaKeysRequest, opts ...grpc.CallOption) (*GenerateEcdsaKeysResponse, error)
	Sign(ctx context.Context, in *SignRequest, opts ...grpc.CallOption) (*SignResponse, error)
	Verify(ctx context.Context, in *VerifyRequest, opts ...grpc.CallOption) (*VerifyResponse, error)
	GetSignatures(ctx context.Context, in *GetSignaturesRequest, opts ...grpc.CallOption) (*GetSignaturesResponse, error)
	GetSignatureCommonName(ctx context.Context, in *SignatureCommonNameRequest, opts ...grpc.CallOption) (*SignatureCommonNameResponse, error)
}

type authenticityServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewAuthenticityServiceClient(cc grpc.ClientConnInterface) AuthenticityServiceClient {
	return &authenticityServiceClient{cc}
}

func (c *authenticityServiceClient) GenerateEcdsaKeys(ctx context.Context, in *GenerateEcdsaKeysRequest, opts ...grpc.CallOption) (*GenerateEcdsaKeysResponse, error) {
	out := new(GenerateEcdsaKeysResponse)
	err := c.cc.Invoke(ctx, "/bloock.AuthenticityService/GenerateEcdsaKeys", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *authenticityServiceClient) Sign(ctx context.Context, in *SignRequest, opts ...grpc.CallOption) (*SignResponse, error) {
	out := new(SignResponse)
	err := c.cc.Invoke(ctx, "/bloock.AuthenticityService/Sign", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *authenticityServiceClient) Verify(ctx context.Context, in *VerifyRequest, opts ...grpc.CallOption) (*VerifyResponse, error) {
	out := new(VerifyResponse)
	err := c.cc.Invoke(ctx, "/bloock.AuthenticityService/Verify", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *authenticityServiceClient) GetSignatures(ctx context.Context, in *GetSignaturesRequest, opts ...grpc.CallOption) (*GetSignaturesResponse, error) {
	out := new(GetSignaturesResponse)
	err := c.cc.Invoke(ctx, "/bloock.AuthenticityService/GetSignatures", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *authenticityServiceClient) GetSignatureCommonName(ctx context.Context, in *SignatureCommonNameRequest, opts ...grpc.CallOption) (*SignatureCommonNameResponse, error) {
	out := new(SignatureCommonNameResponse)
	err := c.cc.Invoke(ctx, "/bloock.AuthenticityService/GetSignatureCommonName", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// AuthenticityServiceServer is the server API for AuthenticityService service.
// All implementations must embed UnimplementedAuthenticityServiceServer
// for forward compatibility
type AuthenticityServiceServer interface {
	GenerateEcdsaKeys(context.Context, *GenerateEcdsaKeysRequest) (*GenerateEcdsaKeysResponse, error)
	Sign(context.Context, *SignRequest) (*SignResponse, error)
	Verify(context.Context, *VerifyRequest) (*VerifyResponse, error)
	GetSignatures(context.Context, *GetSignaturesRequest) (*GetSignaturesResponse, error)
	GetSignatureCommonName(context.Context, *SignatureCommonNameRequest) (*SignatureCommonNameResponse, error)
	mustEmbedUnimplementedAuthenticityServiceServer()
}

// UnimplementedAuthenticityServiceServer must be embedded to have forward compatible implementations.
type UnimplementedAuthenticityServiceServer struct {
}

func (UnimplementedAuthenticityServiceServer) GenerateEcdsaKeys(context.Context, *GenerateEcdsaKeysRequest) (*GenerateEcdsaKeysResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GenerateEcdsaKeys not implemented")
}
func (UnimplementedAuthenticityServiceServer) Sign(context.Context, *SignRequest) (*SignResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Sign not implemented")
}
func (UnimplementedAuthenticityServiceServer) Verify(context.Context, *VerifyRequest) (*VerifyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Verify not implemented")
}
func (UnimplementedAuthenticityServiceServer) GetSignatures(context.Context, *GetSignaturesRequest) (*GetSignaturesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetSignatures not implemented")
}
func (UnimplementedAuthenticityServiceServer) GetSignatureCommonName(context.Context, *SignatureCommonNameRequest) (*SignatureCommonNameResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetSignatureCommonName not implemented")
}
func (UnimplementedAuthenticityServiceServer) mustEmbedUnimplementedAuthenticityServiceServer() {}

// UnsafeAuthenticityServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to AuthenticityServiceServer will
// result in compilation errors.
type UnsafeAuthenticityServiceServer interface {
	mustEmbedUnimplementedAuthenticityServiceServer()
}

func RegisterAuthenticityServiceServer(s grpc.ServiceRegistrar, srv AuthenticityServiceServer) {
	s.RegisterService(&AuthenticityService_ServiceDesc, srv)
}

func _AuthenticityService_GenerateEcdsaKeys_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GenerateEcdsaKeysRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthenticityServiceServer).GenerateEcdsaKeys(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.AuthenticityService/GenerateEcdsaKeys",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthenticityServiceServer).GenerateEcdsaKeys(ctx, req.(*GenerateEcdsaKeysRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _AuthenticityService_Sign_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SignRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthenticityServiceServer).Sign(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.AuthenticityService/Sign",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthenticityServiceServer).Sign(ctx, req.(*SignRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _AuthenticityService_Verify_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(VerifyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthenticityServiceServer).Verify(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.AuthenticityService/Verify",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthenticityServiceServer).Verify(ctx, req.(*VerifyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _AuthenticityService_GetSignatures_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetSignaturesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthenticityServiceServer).GetSignatures(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.AuthenticityService/GetSignatures",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthenticityServiceServer).GetSignatures(ctx, req.(*GetSignaturesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _AuthenticityService_GetSignatureCommonName_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SignatureCommonNameRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthenticityServiceServer).GetSignatureCommonName(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.AuthenticityService/GetSignatureCommonName",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthenticityServiceServer).GetSignatureCommonName(ctx, req.(*SignatureCommonNameRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// AuthenticityService_ServiceDesc is the grpc.ServiceDesc for AuthenticityService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var AuthenticityService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bloock.AuthenticityService",
	HandlerType: (*AuthenticityServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GenerateEcdsaKeys",
			Handler:    _AuthenticityService_GenerateEcdsaKeys_Handler,
		},
		{
			MethodName: "Sign",
			Handler:    _AuthenticityService_Sign_Handler,
		},
		{
			MethodName: "Verify",
			Handler:    _AuthenticityService_Verify_Handler,
		},
		{
			MethodName: "GetSignatures",
			Handler:    _AuthenticityService_GetSignatures_Handler,
		},
		{
			MethodName: "GetSignatureCommonName",
			Handler:    _AuthenticityService_GetSignatureCommonName_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "authenticity.proto",
}
