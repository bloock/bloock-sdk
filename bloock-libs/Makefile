build: hasher-build executor-build http-build web3-build

hasher-build:
	cd hasher && cargo build --release

executor-build:
	cd executor && cargo build --release

http-build:
	cd http && cargo build --release

web3-build:
	cd web3 && cargo build --release

metadata-build:
	cd metadata && cargo build --release

keys-build:
	cd keys && cargo build --release

test: hasher-test signer-test encrypter-test executor-test http-test web3-test keys-test

hasher-test:
	cd hasher && cargo test --release

signer-test:
	cd signer && cargo test --release

encrypter-test:
	cd encrypter && cargo test --release

executor-test:
	cd executor && cargo test --release

http-test:
	cd http && cargo test --release

web3-test:
	cd web3 && cargo test --release

metadata-test:
	cd metadata && cargo test --release

keys-test:
	cd keys && cargo test --release

wasm-test: http-wasm-test

hasher-wasm-test:
	cd hasher && wasm-pack test --firefox --headless --release
	cd hasher && wasm-pack test --chrome --headless --release
	cd hasher && wasm-pack test --node --release

signer-wasm-test:
	cd signer && wasm-pack test --chrome --headless --release
	cd signer && wasm-pack test --node --release

encrypter-wasm-test:
	cd encrypter && wasm-pack test --chrome --headless --release
	cd encrypter && wasm-pack test --node --release

http-wasm-test:
	cd http && wasm-pack test --chrome --headless --release
	cd http && wasm-pack test --node  --release

web3-wasm-test:
	cd web3 && wasm-pack test --chrome --headless --release
	cd web3 && wasm-pack test --node  --release

metadata-wasm-test:
	cd metadata && wasm-pack test --chrome --headless --release
	cd metadata && wasm-pack test --node  --release
