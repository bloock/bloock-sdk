.PHONY: test hashing-test http-test web3-test \
	hashing-wasm-test http-wasm-test web3-wasm-test \
	fmt hashing-fmt http-fmt web3-fmt

build: hashing-build http-build web3-build

hashing-build:
	cd hashing && cargo build

http-build:
	cd http && cargo build

web3-build:
	cd web3 && cargo build

build-wasm: hashing-build-wasm http-build-wasm web3-build-wasm

hashing-build-wasm:
	cd hashing && wasm-pack build

http-build-wasm:
	cd http && wasm-pack build -- --no-default-features --features wasm

web3-build-wasm:
	cd web3 && wasm-pack build -- --no-default-features --features wasm

test: hashing-test http-test web3-test

hashing-test:
	cd hashing && cargo test

http-test:
	cd http && cargo test

web3-test:
	cd web3 && cargo test

wasm-test: hashing-wasm-test http-wasm-test web3-wasm-test

hashing-wasm-test:
	cd hashing && wasm-pack test --node --firefox --chrome --safari --headless

http-wasm-test:
	cd http && wasm-pack test --node --firefox --chrome --headless -- --no-default-features --features wasm

web3-wasm-test:
	cd web3 && wasm-pack test --node --firefox --chrome --headless -- --no-default-features --features wasm
