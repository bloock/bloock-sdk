SHELL := /bin/bash

#
# BUILD TARGETS
#

define BUILD_RECIPE
$(1):
	$(2) cargo build --release --target $$@
	rm -rfv build/native/$$@/*
	mkdir -p build/native/$$@
	cp ../target/$$@/release/libbloock_bridge* build/native/$$@/
endef

define BUILD_CROSS_RECIPE
$(1):
	$(2) cross build --release --target $$@ --verbose
	rm -rfv build/native/$$@/*
	mkdir -p build/native/$$@
	cp ../target/$$@/release/libbloock_bridge* build/native/$$@/
endef

build-all: build-linux build-windows build-darwin build-wasm

# Linux

build-linux: aarch64-unknown-linux-gnu x86_64-unknown-linux-gnu x86_64-unknown-linux-musl

$(eval $(call BUILD_CROSS_RECIPE,aarch64-unknown-linux-gnu))
$(eval $(call BUILD_RECIPE,aarch64-unknown-linux-musl, RUSTFLAGS="-C target-feature=-crt-static"))
$(eval $(call BUILD_CROSS_RECIPE,x86_64-unknown-linux-gnu))
$(eval $(call BUILD_RECIPE,x86_64-unknown-linux-musl, RUSTFLAGS="-C target-feature=-crt-static"))

# Windows

build-windows: x86_64-pc-windows-gnu x86_64-pc-windows-msvc

$(eval $(call BUILD_RECIPE,x86_64-pc-windows-gnu))
$(eval $(call BUILD_RECIPE,x86_64-pc-windows-msvc))

# Darwin

build-darwin: aarch64-apple-darwin x86_64-apple-darwin

$(eval $(call BUILD_RECIPE,aarch64-apple-darwin))
$(eval $(call BUILD_RECIPE,x86_64-apple-darwin))

# Wasm

build-wasm: 
	rm -rfv build/wasm/*
	mkdir -p build/wasm
	wasm-pack -q build --out-dir build/wasm --target web
	rm build/wasm/.gitignore
	rm build/wasm/package.json

test:
	cargo test --release
