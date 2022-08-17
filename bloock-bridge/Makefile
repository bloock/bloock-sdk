SHELL := /bin/bash

build:
	cargo build --release
	diplomat-tool c c/
	diplomat-tool cpp cpp/ --docs cpp/docs/

build-wasm:
	wasm-pack -q build -- --no-default-features --features wasm
	mkdir -p js/tmp
	diplomat-tool js js/tmp --docs js/docs/
	make -C js copy-lib
	rm -r js/tmp

go-dev: build
	make -C go dev

java-dev: build
	make -C java dev

js-dev: build-wasm
	make -C js dev
