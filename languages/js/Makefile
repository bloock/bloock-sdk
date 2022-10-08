.PHONY: install proto dev test fmt lint clean

copy-lib:
	rm -rfv src/ffi/native/*
	mkdir -p src/ffi/native
	cp ../../bloock-bridge/build/wasm/* src/ffi/native

proto:
	node scripts/proto.js

build: proto copy-lib
	yarn build

dev: build
	yarn start

test: build
	yarn run test

fmt:
	yarn run fmt

lint:
	yarn run lint

clean:
	yarn run clean

