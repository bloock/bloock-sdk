.PHONY: build c-build wasm-build  \
	test core-test hasher-test http-test web3-test c-test wasm-test go-test js-test php-test  \
	fmt fmt-rust fmt-go fmt-js fmt-php \
	lint clippy lint-js lint-go \
	clean clean-rust clean-wasm-api clean-go clean-js 

bridge-build:
	$(MAKE) -C bloock-bridge build

rust-test: libs-test core-test bridge-test 

bridge-test:
	$(MAKE) -C bloock-bridge test

core-test:
	$(MAKE) -C bloock-core test

libs-test:
	$(MAKE) -C bloock-libs test

go-test: c-build
	$(MAKE) -C languages/go test

js-test: wasm-build
	$(MAKE) -C languages/js test

php-test: c-build
	$(MAKE) -C languages/php test


go-dev: c-build
	$(MAKE) -C bloock-bridge go-dev

js-dev: wasm-build
	$(MAKE) -C bloock-bridge js-dev

php-dev: c-build
	$(MAKE) -C bloock-bridge php-dev


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
