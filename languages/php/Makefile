.PHONY: test docs

UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	rm -rfv Bloock/Ffi/native/*
	cp ../../bloock-bridge/build/native/bloock_bridge.h Bloock/Ffi/native/
ifeq ($(UNAME_S),Linux)
	mkdir -p Bloock/Ffi/native/x86_64-unknown-linux-musl
	cp ../../bloock-bridge/build/native/x86_64-unknown-linux-musl/* Bloock/Ffi/native/x86_64-unknown-linux-musl
endif
ifeq ($(UNAME_S),Darwin)
ifeq ($(UNAME_M),x86_64)
	mkdir -p Bloock/Ffi/native/x86_64-apple-darwin
	cp ../../bloock-bridge/build/native/x86_64-apple-darwin/* Bloock/Ffi/native/x86_64-apple-darwin
else
	mkdir -p Bloock/Ffi/native/aarch64-apple-darwin
	cp ../../bloock-bridge/build/native/aarch64-apple-darwin/* Bloock/Ffi/native/aarch64-apple-darwin
endif
endif

proto:
	protoc -I ../../bloock-bridge/proto \
	--php_out=./protobuf \
	--grpc_out=./protobuf \
	--plugin=protoc-gen-grpc=/usr/local/bin/grpc_php_plugin \
	../../bloock-bridge/proto/*.proto

	#sed -i 's/Bloock\/Bridge\/Proto/Bloock\\Bridge\\Proto/' Bloock/Bridge/Proto/*.php
	sed -i 's/\\Grpc\\BaseStub/\\Bloock\\Bridge\\Connection/' protobuf/Bloock/*.php
	sed -i 's/\\Grpc\\UnaryCall/mixed/' protobuf/Bloock/*.php

build:
	echo "Building"
	
test:
	php ./vendor/bin/phpunit --configuration ./phpunit.xml --testsuite e2e_tests

test-compat:
	php ./vendor/bin/phpunit --configuration ./phpunit.xml --testsuite compat_tests

fmt:

lint: fmt

docs:
	docker run --rm -v ".:/data" "phpdoc/phpdoc:3" --directory=/data/Bloock --ignore "**/Bridge" --ignore "**/Ffi" --target=docs --template='vendor/saggre/phpdocumentor-markdown/themes/markdown'
	sudo apt-get install sed=4.1f
	find ./docs -type f -name '*.md' -exec sed -i 's~(../../Exception.md)~~g' {} \;
