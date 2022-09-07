build: hashing-build executor-build http-build web3-build

hashing-build:
	cd hashing && cargo build

executor-build:
	cd executor && cargo build

http-build:
	cd http && cargo build

web3-build:
	cd web3 && cargo build

test: hashing-test builder-test executor-test http-test web3-test

hashing-test:
	cd hashing && cargo test

builder-test:
	cd builder && cargo test

executor-test:
	cd executor && cargo test

http-test:
	cd http && cargo test

web3-test:
	cd web3 && cargo test

wasm-test: hashing-wasm-test builder-wasm-test http-wasm-test web3-wasm-test

hashing-wasm-test:
	cd hashing && wasm-pack test --firefox --headless 
	cd hashing && wasm-pack test --chrome --headless 
	cd hashing && wasm-pack test --node

builder-wasm-test:
	cd builder && wasm-pack test --firefox --headless 
	cd builder && wasm-pack test --chrome --headless 
	cd builder && wasm-pack test --node

http-wasm-test:
	cd http && wasm-pack test --firefox --headless 
	cd http && wasm-pack test --chrome --headless 

web3-wasm-test:
	cd web3 && wasm-pack test --firefox --headless 
	cd web3 && wasm-pack test --chrome --headless 
