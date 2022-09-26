build: hasher-build executor-build http-build web3-build

hasher-build:
	cd hasher && cargo build --release

executor-build:
	cd executor && cargo build --release

http-build:
	cd http && cargo build --release

web3-build:
	cd web3 && cargo build --release

test: hasher-test signer-test encrypter-test publisher-test executor-test http-test web3-test

hasher-test:
	cd hasher && cargo test --release

signer-test:
	cd signer && cargo test --release

encrypter-test:
	cd encrypter && cargo test --release

publisher-test:
	cd publisher && cargo test --release

executor-test:
	cd executor && cargo test --release

http-test:
	cd http && cargo test --release

web3-test:
	cd web3 && cargo test --release

wasm-test: hasher-wasm-test signer-wasm-test encrypter-wasm-test publisher-wasm-test http-wasm-test web3-wasm-test

hasher-wasm-test:
	cd hasher && wasm-pack test --firefox --headless --release
	cd hasher && wasm-pack test --chrome --headless --release
	cd hasher && wasm-pack test --node --release

signer-wasm-test:
	cd signer && wasm-pack test --firefox --headless --release
	cd signer && wasm-pack test --chrome --headless --release
	cd signer && wasm-pack test --node --release

encrypter-wasm-test:
	cd encrypter && wasm-pack test --firefox --headless --release
	cd encrypter && wasm-pack test --chrome --headless --release
	cd encrypter && wasm-pack test --node --release

publisher-wasm-test:
	cd publisher && wasm-pack test --firefox --headless --release
	cd publisher && wasm-pack test --chrome --headless --release
	cd publisher && wasm-pack test --node  --release

http-wasm-test:
	cd http && wasm-pack test --firefox --headless --release
	cd http && wasm-pack test --chrome --headless --release
	cd http && wasm-pack test --node  --release

web3-wasm-test:
	cd web3 && wasm-pack test --firefox --headless --release
	cd web3 && wasm-pack test --chrome --headless --release
	cd web3 && wasm-pack test --node  --release
