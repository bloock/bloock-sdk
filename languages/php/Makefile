UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	rm -rfv lib/ffi/native/*
	cp ../../bloock-bridge/build/native/bloock_bridge.h Bloock/Ffi/native/
ifeq ($(UNAME_S),Linux)
	mkdir -p lib/ffi/native/x86_64_unknown_linux_musl
	cp ../../bloock-bridge/build/native/x86_64-unknown-linux-musl/* Bloock/Ffi/native/x86_64_unknown_linux_musl
endif
ifeq ($(UNAME_S),Darwin)
ifeq ($(UNAME_M),x86_64)
	mkdir -p lib/ffi/native/x86_64_apple_darwin
	cp ../../bloock-bridge/build/native/x86_64-apple-darwin/* Bloock/Ffi/native/x86_64_apple_darwin
else
	mkdir -p lib/ffi/native/aarch64_apple_darwin
	cp ../../bloock-bridge/build/native/aarch64-apple-darwin/* Bloock/Ffi/native/aarch64_apple_darwin
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

build: copy_lib
	./gradlew build -x test

test: copy_lib
	php ./vendor/bin/phpunit --configuration ./phpunit.xml

fmt.jar:
	$(eval URL := $(shell curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/google/google-java-format/releases/latest | jq '.assets[] | select(.name | test("all-deps.jar")) | .browser_download_url'))
	curl -L $(URL) > fmt.jar

fmt: fmt.jar
	$(eval FILES := $(shell git ls-files '*.java'))
	$(eval OPENS := $(shell echo "--add-opens jdk.compiler/com.sun.tools.javac."{api,tree,file,util,parser}"=ALL-UNNAMED"))
	java $(OPENS) -jar fmt.jar --replace $(FILES)

lint: fmt

clean:
	./gradlew clean

