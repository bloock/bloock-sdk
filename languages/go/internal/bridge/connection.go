package bridge

import (
	"context"
	"fmt"

	"github.com/bloock/bloock-sdk-go/internal/ffi"
	grpc "google.golang.org/grpc"
	"google.golang.org/protobuf/proto"
)

type BloockConnection struct{}

func NewBloockConnection() grpc.ClientConnInterface {
	return BloockConnection{}
}

// Invoke implements grpc.ClientConnInterface
func (BloockConnection) Invoke(ctx context.Context, method string, args interface{}, reply interface{}, opts ...grpc.CallOption) error {
	in, ok := args.(proto.Message)
	if !ok {
		return fmt.Errorf("args was not an instance of proto.Message")
	}

	b, err := proto.Marshal(in)
	if err != nil {
		return err
	}

	result, err := ffi.Request(method, b)
	if err != nil {
		return err
	}

	out, ok := reply.(proto.Message)
	if !ok {
		return fmt.Errorf("reply was not an instance of proto.Message")
	}
	err = proto.Unmarshal(result, out)
	if err != nil {
		return err
	}

	return nil
}

// NewStream implements grpc.ClientConnInterface
func (BloockConnection) NewStream(ctx context.Context, desc *grpc.StreamDesc, method string, opts ...grpc.CallOption) (grpc.ClientStream, error) {
	panic("unimplemented")
}
