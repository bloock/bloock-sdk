UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	cp ../../bloock-c-api/bloock.h internal/ffi/native/
ifeq ($(UNAME_S),Linux)
	cp ../../target/release/libbloock.a internal/ffi/native/linux/
endif
ifeq ($(UNAME_S),Darwin)
ifeq ($(UNAME_M),x86_64)
	cp ../../target/release/libbloock.dylib internal/ffi/native/macos/amd64/
else
	cp ../../target/release/libbloock.a internal/ffi/native/macos/arm64/
endif
endif

dev: copy_lib
	go run cmd/main.go

test: copy_lib
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
