UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	cp ../c/*.h internal/ffi/native/
ifeq ($(UNAME_S),Linux)
	cp ../../target/release/libbloock_bridge.a internal/ffi/native/linux/
endif
ifeq ($(UNAME_S),Darwin)
ifeq ($(UNAME_M),x86_64)
	cp ../../target/release/libbloock_bridge.a internal/ffi/native/macos/amd64/
else
	cp ../c/lib.a internal/ffi/native/macos/arm64/
endif
endif

proto:
	protoc -I ../proto --go_out=./internal/bridge/proto \
	--go_opt=paths=source_relative \
	--go-grpc_out=./internal/bridge/proto \
	--go-grpc_opt=paths=source_relative \
	../proto/*.proto

dev: copy_lib proto
	go run cmd/main.go

test: copy_lib proto
	go test -v ./... -count=1

fmt:
	go fmt ./...

lint:
	if [ -n "$$(gofmt -l .)" ]; then \
		gofmt -l . && \
		exit 1; \
	fi

clean:
	go clean

.PHONY: copy_lib test fmt lint clean
