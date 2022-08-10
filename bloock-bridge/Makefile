SHELL := /bin/bash

gen: 
	mkdir -p js/tmp
	diplomat-tool js js/tmp --docs js/docs/
	make -C js copy-lib
	rm -r js/tmp
	diplomat-tool c c/
	diplomat-tool cpp cpp/ --docs cpp/docs/

build:
	cargo build --release
	make gen

build-wasm:
	wasm-pack -q build -- --no-default-features --features wasm
	make gen

go-dev: build
	make -C go dev

java-dev: build
	make -C java dev

js-dev: build-wasm
	make -C js dev

.PHONY: init
init:
	@if [ $$(uname) == "Darwin" ] ; then cargo install cargo-lipo ; fi
	cargo install cbindgen
	cargo install protobuf-codegen
