// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v4.25.3
// source: encryption.proto

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

// EncryptionServiceClient is the client API for EncryptionService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type EncryptionServiceClient interface {
	Encrypt(ctx context.Context, in *EncryptRequest, opts ...grpc.CallOption) (*EncryptResponse, error)
	Decrypt(ctx context.Context, in *DecryptRequest, opts ...grpc.CallOption) (*DecryptResponse, error)
	GetEncryptionAlg(ctx context.Context, in *EncryptionAlgRequest, opts ...grpc.CallOption) (*EncryptionAlgResponse, error)
}

type encryptionServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewEncryptionServiceClient(cc grpc.ClientConnInterface) EncryptionServiceClient {
	return &encryptionServiceClient{cc}
}

func (c *encryptionServiceClient) Encrypt(ctx context.Context, in *EncryptRequest, opts ...grpc.CallOption) (*EncryptResponse, error) {
	out := new(EncryptResponse)
	err := c.cc.Invoke(ctx, "/bloock.EncryptionService/Encrypt", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *encryptionServiceClient) Decrypt(ctx context.Context, in *DecryptRequest, opts ...grpc.CallOption) (*DecryptResponse, error) {
	out := new(DecryptResponse)
	err := c.cc.Invoke(ctx, "/bloock.EncryptionService/Decrypt", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *encryptionServiceClient) GetEncryptionAlg(ctx context.Context, in *EncryptionAlgRequest, opts ...grpc.CallOption) (*EncryptionAlgResponse, error) {
	out := new(EncryptionAlgResponse)
	err := c.cc.Invoke(ctx, "/bloock.EncryptionService/GetEncryptionAlg", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// EncryptionServiceServer is the server API for EncryptionService service.
// All implementations must embed UnimplementedEncryptionServiceServer
// for forward compatibility
type EncryptionServiceServer interface {
	Encrypt(context.Context, *EncryptRequest) (*EncryptResponse, error)
	Decrypt(context.Context, *DecryptRequest) (*DecryptResponse, error)
	GetEncryptionAlg(context.Context, *EncryptionAlgRequest) (*EncryptionAlgResponse, error)
	mustEmbedUnimplementedEncryptionServiceServer()
}

// UnimplementedEncryptionServiceServer must be embedded to have forward compatible implementations.
type UnimplementedEncryptionServiceServer struct {
}

func (UnimplementedEncryptionServiceServer) Encrypt(context.Context, *EncryptRequest) (*EncryptResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Encrypt not implemented")
}
func (UnimplementedEncryptionServiceServer) Decrypt(context.Context, *DecryptRequest) (*DecryptResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Decrypt not implemented")
}
func (UnimplementedEncryptionServiceServer) GetEncryptionAlg(context.Context, *EncryptionAlgRequest) (*EncryptionAlgResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetEncryptionAlg not implemented")
}
func (UnimplementedEncryptionServiceServer) mustEmbedUnimplementedEncryptionServiceServer() {}

// UnsafeEncryptionServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to EncryptionServiceServer will
// result in compilation errors.
type UnsafeEncryptionServiceServer interface {
	mustEmbedUnimplementedEncryptionServiceServer()
}

func RegisterEncryptionServiceServer(s grpc.ServiceRegistrar, srv EncryptionServiceServer) {
	s.RegisterService(&EncryptionService_ServiceDesc, srv)
}

func _EncryptionService_Encrypt_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EncryptRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(EncryptionServiceServer).Encrypt(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.EncryptionService/Encrypt",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(EncryptionServiceServer).Encrypt(ctx, req.(*EncryptRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _EncryptionService_Decrypt_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DecryptRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(EncryptionServiceServer).Decrypt(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.EncryptionService/Decrypt",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(EncryptionServiceServer).Decrypt(ctx, req.(*DecryptRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _EncryptionService_GetEncryptionAlg_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EncryptionAlgRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(EncryptionServiceServer).GetEncryptionAlg(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.EncryptionService/GetEncryptionAlg",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(EncryptionServiceServer).GetEncryptionAlg(ctx, req.(*EncryptionAlgRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// EncryptionService_ServiceDesc is the grpc.ServiceDesc for EncryptionService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var EncryptionService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bloock.EncryptionService",
	HandlerType: (*EncryptionServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Encrypt",
			Handler:    _EncryptionService_Encrypt_Handler,
		},
		{
			MethodName: "Decrypt",
			Handler:    _EncryptionService_Decrypt_Handler,
		},
		{
			MethodName: "GetEncryptionAlg",
			Handler:    _EncryptionService_GetEncryptionAlg_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "encryption.proto",
}
