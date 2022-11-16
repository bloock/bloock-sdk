// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.7
// source: anchor.proto

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

// AnchorServiceClient is the client API for AnchorService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type AnchorServiceClient interface {
	GetAnchor(ctx context.Context, in *GetAnchorRequest, opts ...grpc.CallOption) (*GetAnchorResponse, error)
	WaitAnchor(ctx context.Context, in *WaitAnchorRequest, opts ...grpc.CallOption) (*WaitAnchorResponse, error)
}

type anchorServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewAnchorServiceClient(cc grpc.ClientConnInterface) AnchorServiceClient {
	return &anchorServiceClient{cc}
}

func (c *anchorServiceClient) GetAnchor(ctx context.Context, in *GetAnchorRequest, opts ...grpc.CallOption) (*GetAnchorResponse, error) {
	out := new(GetAnchorResponse)
	err := c.cc.Invoke(ctx, "/bloock.AnchorService/GetAnchor", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *anchorServiceClient) WaitAnchor(ctx context.Context, in *WaitAnchorRequest, opts ...grpc.CallOption) (*WaitAnchorResponse, error) {
	out := new(WaitAnchorResponse)
	err := c.cc.Invoke(ctx, "/bloock.AnchorService/WaitAnchor", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// AnchorServiceServer is the server API for AnchorService service.
// All implementations must embed UnimplementedAnchorServiceServer
// for forward compatibility
type AnchorServiceServer interface {
	GetAnchor(context.Context, *GetAnchorRequest) (*GetAnchorResponse, error)
	WaitAnchor(context.Context, *WaitAnchorRequest) (*WaitAnchorResponse, error)
	mustEmbedUnimplementedAnchorServiceServer()
}

// UnimplementedAnchorServiceServer must be embedded to have forward compatible implementations.
type UnimplementedAnchorServiceServer struct {
}

func (UnimplementedAnchorServiceServer) GetAnchor(context.Context, *GetAnchorRequest) (*GetAnchorResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAnchor not implemented")
}
func (UnimplementedAnchorServiceServer) WaitAnchor(context.Context, *WaitAnchorRequest) (*WaitAnchorResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method WaitAnchor not implemented")
}
func (UnimplementedAnchorServiceServer) mustEmbedUnimplementedAnchorServiceServer() {}

// UnsafeAnchorServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to AnchorServiceServer will
// result in compilation errors.
type UnsafeAnchorServiceServer interface {
	mustEmbedUnimplementedAnchorServiceServer()
}

func RegisterAnchorServiceServer(s grpc.ServiceRegistrar, srv AnchorServiceServer) {
	s.RegisterService(&AnchorService_ServiceDesc, srv)
}

func _AnchorService_GetAnchor_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetAnchorRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AnchorServiceServer).GetAnchor(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.AnchorService/GetAnchor",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AnchorServiceServer).GetAnchor(ctx, req.(*GetAnchorRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _AnchorService_WaitAnchor_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(WaitAnchorRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AnchorServiceServer).WaitAnchor(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.AnchorService/WaitAnchor",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AnchorServiceServer).WaitAnchor(ctx, req.(*WaitAnchorRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// AnchorService_ServiceDesc is the grpc.ServiceDesc for AnchorService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var AnchorService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bloock.AnchorService",
	HandlerType: (*AnchorServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetAnchor",
			Handler:    _AnchorService_GetAnchor_Handler,
		},
		{
			MethodName: "WaitAnchor",
			Handler:    _AnchorService_WaitAnchor_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "anchor.proto",
}
