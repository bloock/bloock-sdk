SHELL := /bin/bash

#
# BUILD TARGETS
#

define BUILD_RECIPE
$(1):
	cargo build --release --target $$@
	rm -rfv build/native/$$@/*
	mkdir -p build/native/$$@
	cp ../target/$$@/release/libbloock_bridge$(2) build/native/$$@/
endef

build-all: build-linux build-windows build-darwin build-wasm

# Linux

build-linux: aarch64-unknown-linux-gnu x86_64-unknown-linux-gnu i686-unknown-linux-gnu

$(eval $(call BUILD_RECIPE,aarch64-unknown-linux-gnu,.a))
$(eval $(call BUILD_RECIPE,x86_64-unknown-linux-gnu,.a))
$(eval $(call BUILD_RECIPE,i686-unknown-linux-gnu,.a))

# Windows

build-windows: x86_64-pc-windows-gnu i686-pc-windows-gnu

$(eval $(call BUILD_RECIPE,x86_64-pc-windows-gnu,.lib))
$(eval $(call BUILD_RECIPE,i686-pc-windows-gnu,.lib))

# Darwin

build-darwin: aarch64-apple-darwin x86_64-apple-darwin

$(eval $(call BUILD_RECIPE,aarch64-apple-darwin,.a))
$(eval $(call BUILD_RECIPE,x86_64-apple-darwin,.a))

# Wasm

build-wasm: 
	rm -rfv build/wasm/*
	mkdir -p build/wasm
	wasm-pack -q build --out-dir build/wasm --target web
	rm build/wasm/.gitignore
	rm build/wasm/package.json
