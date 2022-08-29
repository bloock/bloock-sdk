// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.5
// source: record.proto

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

// RecordServiceClient is the client API for RecordService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type RecordServiceClient interface {
	SendRecords(ctx context.Context, in *SendRecordsRequest, opts ...grpc.CallOption) (*SendRecordsResponse, error)
	FromHash(ctx context.Context, in *FromHashRequest, opts ...grpc.CallOption) (*Record, error)
	FromHex(ctx context.Context, in *FromHexRequest, opts ...grpc.CallOption) (*FromHexResponse, error)
	FromString(ctx context.Context, in *FromStringRequest, opts ...grpc.CallOption) (*Record, error)
	FromTypedArray(ctx context.Context, in *FromTypedArrayRequest, opts ...grpc.CallOption) (*Record, error)
}

type recordServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewRecordServiceClient(cc grpc.ClientConnInterface) RecordServiceClient {
	return &recordServiceClient{cc}
}

func (c *recordServiceClient) SendRecords(ctx context.Context, in *SendRecordsRequest, opts ...grpc.CallOption) (*SendRecordsResponse, error) {
	out := new(SendRecordsResponse)
	err := c.cc.Invoke(ctx, "/bloock.RecordService/SendRecords", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *recordServiceClient) FromHash(ctx context.Context, in *FromHashRequest, opts ...grpc.CallOption) (*Record, error) {
	out := new(Record)
	err := c.cc.Invoke(ctx, "/bloock.RecordService/FromHash", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *recordServiceClient) FromHex(ctx context.Context, in *FromHexRequest, opts ...grpc.CallOption) (*FromHexResponse, error) {
	out := new(FromHexResponse)
	err := c.cc.Invoke(ctx, "/bloock.RecordService/FromHex", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *recordServiceClient) FromString(ctx context.Context, in *FromStringRequest, opts ...grpc.CallOption) (*Record, error) {
	out := new(Record)
	err := c.cc.Invoke(ctx, "/bloock.RecordService/FromString", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *recordServiceClient) FromTypedArray(ctx context.Context, in *FromTypedArrayRequest, opts ...grpc.CallOption) (*Record, error) {
	out := new(Record)
	err := c.cc.Invoke(ctx, "/bloock.RecordService/FromTypedArray", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// RecordServiceServer is the server API for RecordService service.
// All implementations must embed UnimplementedRecordServiceServer
// for forward compatibility
type RecordServiceServer interface {
	SendRecords(context.Context, *SendRecordsRequest) (*SendRecordsResponse, error)
	FromHash(context.Context, *FromHashRequest) (*Record, error)
	FromHex(context.Context, *FromHexRequest) (*FromHexResponse, error)
	FromString(context.Context, *FromStringRequest) (*Record, error)
	FromTypedArray(context.Context, *FromTypedArrayRequest) (*Record, error)
	mustEmbedUnimplementedRecordServiceServer()
}

// UnimplementedRecordServiceServer must be embedded to have forward compatible implementations.
type UnimplementedRecordServiceServer struct {
}

func (UnimplementedRecordServiceServer) SendRecords(context.Context, *SendRecordsRequest) (*SendRecordsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SendRecords not implemented")
}
func (UnimplementedRecordServiceServer) FromHash(context.Context, *FromHashRequest) (*Record, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FromHash not implemented")
}
func (UnimplementedRecordServiceServer) FromHex(context.Context, *FromHexRequest) (*FromHexResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FromHex not implemented")
}
func (UnimplementedRecordServiceServer) FromString(context.Context, *FromStringRequest) (*Record, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FromString not implemented")
}
func (UnimplementedRecordServiceServer) FromTypedArray(context.Context, *FromTypedArrayRequest) (*Record, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FromTypedArray not implemented")
}
func (UnimplementedRecordServiceServer) mustEmbedUnimplementedRecordServiceServer() {}

// UnsafeRecordServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to RecordServiceServer will
// result in compilation errors.
type UnsafeRecordServiceServer interface {
	mustEmbedUnimplementedRecordServiceServer()
}

func RegisterRecordServiceServer(s grpc.ServiceRegistrar, srv RecordServiceServer) {
	s.RegisterService(&RecordService_ServiceDesc, srv)
}

func _RecordService_SendRecords_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SendRecordsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RecordServiceServer).SendRecords(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.RecordService/SendRecords",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RecordServiceServer).SendRecords(ctx, req.(*SendRecordsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RecordService_FromHash_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FromHashRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RecordServiceServer).FromHash(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.RecordService/FromHash",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RecordServiceServer).FromHash(ctx, req.(*FromHashRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RecordService_FromHex_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FromHexRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RecordServiceServer).FromHex(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.RecordService/FromHex",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RecordServiceServer).FromHex(ctx, req.(*FromHexRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RecordService_FromString_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FromStringRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RecordServiceServer).FromString(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.RecordService/FromString",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RecordServiceServer).FromString(ctx, req.(*FromStringRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RecordService_FromTypedArray_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FromTypedArrayRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RecordServiceServer).FromTypedArray(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bloock.RecordService/FromTypedArray",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RecordServiceServer).FromTypedArray(ctx, req.(*FromTypedArrayRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// RecordService_ServiceDesc is the grpc.ServiceDesc for RecordService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var RecordService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bloock.RecordService",
	HandlerType: (*RecordServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SendRecords",
			Handler:    _RecordService_SendRecords_Handler,
		},
		{
			MethodName: "FromHash",
			Handler:    _RecordService_FromHash_Handler,
		},
		{
			MethodName: "FromHex",
			Handler:    _RecordService_FromHex_Handler,
		},
		{
			MethodName: "FromString",
			Handler:    _RecordService_FromString_Handler,
		},
		{
			MethodName: "FromTypedArray",
			Handler:    _RecordService_FromTypedArray_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "record.proto",
}
