.PHONY: build c-build wasm-build  \
	test core-test hashing-test http-test web3-test c-test wasm-test go-test js-test php-test  \
	fmt fmt-rust fmt-go fmt-js fmt-php \
	lint clippy lint-js lint-go \
	clean clean-rust clean-wasm-api clean-go clean-js 

build: c-build wasm-build

c-build:
	cargo build -p bloock-c-api --release

wasm-build:
	$(MAKE) -C bloock-wasm-api build


test: core-test libs-test c-test wasm-test go-test js-test 

core-test:
	cargo test -p bloock-core --release

libs-test:
	$(MAKE) -C bloock-libs test
	$(MAKE) -C bloock-libs wasm-test

c-test:
	cargo test -p bloock-c-api --release

wasm-test:
	$(MAKE) -C bloock-wasm-api test

go-test: c-build
	$(MAKE) -C languages/go test

js-test: wasm-build
	$(MAKE) -C languages/js test

php-test: c-build
	$(MAKE) -C languages/php test


go-dev: c-build
	$(MAKE) -C languages/go dev

js-dev: wasm-build
	$(MAKE) -C languages/js dev

php-dev: c-build
	$(MAKE) -C languages/php dev


fmt: fmt-rust fmt-js fmt-go fmt-php

fmt-rust:
	cargo fmt

fmt-go:
	$(MAKE) -C languages/go fmt

fmt-js:
	$(MAKE) -C languages/js fmt

fmt-php:
	$(MAKE) -C languages/php fmt


lint: clippy lint-js lint-go lint-php lint-rust
	$(MAKE) fmt

clippy:
	cargo clippy --all-features --all-targets -- -D warnings

lint-js:
	$(MAKE) -C languages/js lint

lint-go:
	$(MAKE) -C languages/go lint

lint-php:
	$(MAKE) -C languages/php lint


clean: clean-rust clean-wasm-api clean-go clean-js 

clean-rust:
	cargo clean

clean-wasm-api:
	$(MAKE) -C bloock-wasm-api clean

clean-go:
	$(MAKE) -C languages/go clean

clean-js:
	$(MAKE) -C languages/js clean
