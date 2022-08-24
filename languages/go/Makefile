copy_lib:
	rm -rfv ./internal/ffi/native/*
	cp -r ../../bloock-bridge/native/* ./internal/ffi/native/

proto:
	protoc -I ../../bloock-bridge/proto --go_out=./internal/bridge/proto \
	--go_opt=paths=source_relative \
	--go-grpc_out=./internal/bridge/proto \
	--go-grpc_opt=paths=source_relative \
	../../bloock-bridge/proto/*.proto

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
