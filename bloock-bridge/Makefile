SHELL := /bin/bash

build:
	cargo build --release
	bash gen_all.sh

go-dev: build
	make -C go dev

java-dev: build
	make -C java dev

js-dev: build
	make -C js dev

.PHONY: init
init:
	@if [ $$(uname) == "Darwin" ] ; then cargo install cargo-lipo ; fi
	cargo install cbindgen
	cargo install protobuf-codegen
