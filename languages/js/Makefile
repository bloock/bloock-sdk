.PHONY: test

copy_lib:
	rm -rfv src/ffi/native/*
	mkdir -p src/ffi/native
	cp ../../bloock-bridge/build/wasm/* src/ffi/native

proto:
	node scripts/proto.js

build:
	yarn build

dev: copy_lib build
	yarn start

test: build
	yarn run test

test-compat: build
	yarn run compat

fmt:
	yarn run fix

lint:
	yarn run lint

clean:
	yarn run clean

docs:
	yarn run docs
