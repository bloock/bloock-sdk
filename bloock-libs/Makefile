build: hashing-build executor-build http-build web3-build

hashing-build:
	cd hashing && cargo build

executor-build:
	cd executor && cargo build

http-build:
	cd http && cargo build

web3-build:
	cd web3 && cargo build

test: hashing-test document-test executor-test http-test web3-test

hashing-test:
	cd hashing && cargo test

document-test:
	cd document && cargo test

executor-test:
	cd executor && cargo test

http-test:
	cd http && cargo test

web3-test:
	cd web3 && cargo test

wasm-test: hashing-wasm-test document-wasm-test http-wasm-test web3-wasm-test

hashing-wasm-test:
	cd hashing && wasm-pack test --firefox --headless 
	cd hashing && wasm-pack test --chrome --headless 
	cd hashing && wasm-pack test --node

document-wasm-test:
	cd document && wasm-pack test --firefox --headless 
	cd document && wasm-pack test --chrome --headless 
	cd document && wasm-pack test --node

http-wasm-test:
	cd http && wasm-pack test --firefox --headless 
	cd http && wasm-pack test --chrome --headless 

web3-wasm-test:
	cd web3 && wasm-pack test --firefox --headless 
	cd web3 && wasm-pack test --chrome --headless 
