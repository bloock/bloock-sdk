.PHONY: install proto dev test fmt lint clean

install: .make.deps.installed

# Only reinstall deps when package.json changes.
.make.deps.installed: package.json
	yarn install --network-timeout 100000
	@touch $@

copy-lib:
	cp tmp/BloockBridge.d.ts src/ffi/native
	cp tmp/BloockBridge.js src/ffi/native
	cp tmp/diplomat-runtime.d.ts src/ffi/native
	cp tmp/diplomat-runtime.js src/ffi/native
	cp tmp/index.d.ts src/ffi/native
	cp tmp/index.js src/ffi/native

	grep -v "diplomat-wasm.mjs" src/ffi/native/BloockBridge.js > tmpfile && mv tmpfile src/ffi/native/BloockBridge.js
	sed -i '' 's/'diplomat-wasm.mjs'/'diplomat-wasm.js'/g' src/ffi/native/BloockBridge.js
	sed -i '' 's/static request(arg_request_type, arg_payload)/static request(wasm, arg_request_type, arg_payload)/g' src/ffi/native/BloockBridge.js
	sed -i '' 's/static request(request_type: string, payload: string)/static request(wasm: any, request_type: string, payload: string)/g' src/ffi/native/BloockBridge.d.ts
	
	cp ../../target/wasm32-unknown-unknown/release/bloock_bridge.wasm src/ffi/native

proto:
	node bin/proto.cjs

build: install proto
	yarn build

dev: build
	yarn start

test: build
	yarn run test

fmt:
	yarn run fmt

lint:
	yarn run lint

clean:
	yarn run clean

