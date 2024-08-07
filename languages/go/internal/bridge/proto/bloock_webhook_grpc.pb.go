// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v5.26.1
// source: bloock_webhook.proto

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

// WebhookServiceClient is the client API for WebhookService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type WebhookServiceClient interface {
	VerifyWebhookSignature(ctx context.Context, in *VerifyWebhookSignatureRequest, opts ...grpc.CallOption) (*VerifyWebhookSignatureResponse, error)
}

type webhookServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewWebhookServiceClient(cc grpc.ClientConnInterface) WebhookServiceClient {
	return &webhookServiceClient{cc}
}

func (c *webhookServiceClient) VerifyWebhookSignature(ctx context.Context, in *VerifyWebhookSignatureRequest, opts ...grpc.CallOption) (*VerifyWebhookSignatureResponse, error) {
	out := new(VerifyWebhookSignatureResponse)
	err := c.cc.Invoke(ctx, "/bloock.WebhookService/VerifyWebhookSignature", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// WebhookServiceServer is the server API for WebhookService service.
// All implementations must embed UnimplementedWebhookServiceServer
// for forward compatibility
type WebhookServiceServer interface {
	VerifyWebhookSignature(context.Context, *VerifyWebhookSignatureRequest) (*VerifyWebhookSignatureResponse, error)
	mustEmbedUnimplementedWebhookServiceServer()
}

// UnimplementedWebhookServiceServer must be embedded to have forward compatible implementations.
type UnimplementedWebhookServiceServer struct {
}

func (UnimplementedWebhookServiceServer) VerifyWebhookSignature(context.Context, *VerifyWebhookSignatureRequest) (*VerifyWebhookSignatureResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method VerifyWebhookSignature not implemented")
}
func (UnimplementedWebhookServiceServer) mustEmbedUnimplementedWebhookServiceServer() {}

// UnsafeWebhookServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to WebhookServiceServer will
// result in compilation errors.
type UnsafeWebhookServiceServer interface {
	mustEmbedUnimplementedWebhookServiceServer()
}

func RegisterWebhookServiceServer(s grpc.ServiceRegistrar, srv WebhookServiceServer) {
	s.RegisterService(&WebhookService_ServiceDesc, srv)
}

func _WebhookService_VerifyWebhookSignature_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(VerifyWebhookSignatureRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(WebhookServiceServer).VerifyWebhookSignature(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.WebhookService/VerifyWebhookSignature",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(WebhookServiceServer).VerifyWebhookSignature(ctx, req.(*VerifyWebhookSignatureRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// WebhookService_ServiceDesc is the grpc.ServiceDesc for WebhookService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var WebhookService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bloock.WebhookService",
	HandlerType: (*WebhookServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "VerifyWebhookSignature",
			Handler:    _WebhookService_VerifyWebhookSignature_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "bloock_webhook.proto",
}
