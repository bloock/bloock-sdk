SHELL := /bin/bash

build:
	cargo build --release
	bash gen_all.sh

go-dev: build
	make -C go dev

.PHONY: init
init:
	@if [ $$(uname) == "Darwin" ] ; then cargo install cargo-lipo ; fi
	cargo install cbindgen
	cargo install protobuf-codegen
