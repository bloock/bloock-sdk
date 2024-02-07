.PHONY: test docs

UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	find internal/ffi/native -type f ! -name '*.go' -delete

	cp ../../bloock-bridge/build/native/bloock_bridge.h internal/ffi/native/
ifeq ($(UNAME_S),Linux)
	cp ../../bloock-bridge/build/native/x86_64-unknown-linux-musl/* internal/ffi/native/x86_64_unknown_linux_musl
endif
ifeq ($(UNAME_S),Darwin)
ifeq ($(UNAME_M),x86_64)
	cp ../../bloock-bridge/build/native/x86_64-apple-darwin/* internal/ffi/native/x86_64_apple_darwin
else
	cp ../../bloock-bridge/build/native/aarch64-apple-darwin/* internal/ffi/native/aarch64_apple_darwin
endif
endif

proto:
	protoc -I ../../bloock-bridge/proto --go_out=./internal/bridge/proto \
	--go_opt=paths=source_relative \
	--go-grpc_out=./internal/bridge/proto \
	--go-grpc_opt=paths=source_relative \
	../../bloock-bridge/proto/*.proto

build:
	echo "Building"

dev: copy_lib proto
	go run cmd/main.go

test:
	go test -tags=e2e -v ./...

test-compat:
	go test -tags=compat -v ./...

fmt:
	go fmt ./...

lint:
	if [ -n "$$(gofmt -l .)" ]; then \
		gofmt -l . && \
		exit 1; \
	fi

clean:
	go clean

docs:
	gomarkdoc --exclude-dirs ./vendor/... --exclude-dirs ./internal/... --output 'docs/{{.Dir}}/{{.ImportPath}}.md' ./...
	@mv ./docs/.md ./docs/Bloock.md
	@echo "Replacing pattern in .md files..."
	@find ./docs -name node_modules -prune -o -name "*.md" -exec perl -pi'' -e 's{\[(.*?)\]\(<(.*?)>\)}{[$$1]($$2)}g' {} \;
