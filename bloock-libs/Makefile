build: hasher-build executor-build http-build web3-build

hasher-build:
	cd hasher && cargo build

executor-build:
	cd executor && cargo build

http-build:
	cd http && cargo build

web3-build:
	cd web3 && cargo build

test: hasher-test signer-test encrypter-test publisher-test executor-test http-test web3-test

hasher-test:
	cd hasher && cargo test

signer-test:
	cd signer && cargo test

encrypter-test:
	cd encrypter && cargo test

publisher-test:
	cd publisher && cargo test

executor-test:
	cd executor && cargo test

http-test:
	cd http && cargo test

web3-test:
	cd web3 && cargo test

wasm-test: hasher-wasm-test signer-wasm-test encrypter-wasm-test publisher-wasm-test http-wasm-test web3-wasm-test

hasher-wasm-test:
	cd hasher && wasm-pack test --firefox --headless 
	cd hasher && wasm-pack test --chrome --headless 
	cd hasher && wasm-pack test --node

signer-wasm-test:
	cd signer && wasm-pack test --firefox --headless 
	cd signer && wasm-pack test --chrome --headless 
	cd signer && wasm-pack test --node

encrypter-wasm-test:
	cd encrypter && wasm-pack test --firefox --headless 
	cd encrypter && wasm-pack test --chrome --headless 
	cd encrypter && wasm-pack test --node

publisher-wasm-test:
	cd publisher && wasm-pack test --firefox --headless 
	cd publisher && wasm-pack test --chrome --headless 
	cd publisher && wasm-pack test --node

http-wasm-test:
	cd http && wasm-pack test --firefox --headless 
	cd http && wasm-pack test --chrome --headless 

web3-wasm-test:
	cd web3 && wasm-pack test --firefox --headless 
	cd web3 && wasm-pack test --chrome --headless 
