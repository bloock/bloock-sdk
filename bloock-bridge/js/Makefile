.PHONY: install proto dev test fmt lint clean

install: .make.deps.installed

# Only reinstall deps when package.json changes.
.make.deps.installed: package.json
	yarn install --network-timeout 100000
	@touch $@

proto:
	yarn run grpc_tools_node_protoc \
		--js_out=import_style=commonjs,binary:./src/bridge/proto \
		--grpc_out=./src/bridge/proto \
		--plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
		-I ../proto \
		../proto/*.proto
	yarn run grpc_tools_node_protoc \
		--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
		--ts_out=./src/bridge/proto \
		-I ../proto \
		../proto/*.proto

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
	yarn run clea

