.PHONY: build test lint fmt fmtcheck typecheck docs repl clean install wasm

WASM_FILES = src/bloock_wasm_api.js src/bloock_wasm_api.d.ts src/bloock_wasm_api_bg.wasm src/bloock_wasm_api_bg.wasm.d.ts

dev: build
	yarn start

# Build the WASM lib; then build the TS lib.
build: install wasm
	yarn build

# Run the TS lib's test suite.
test: install wasm
	yarn test

# Check formatting and types and run ESLint.
lint: fmtcheck typecheck
	yarn lint

# Tell ESLint to auto-fix some issues.
lint-fix: install
	yarn fix

# Run the formatter, updating offending files.
fmt: install
	yarn fmt

# Run the formatter without updating offending files.
fmtcheck: install
	yarn fmtcheck

# Run the TS compiler to typecheck the TS lib.
typecheck: install wasm
	yarn tsc

# Build the TS lib documentation.
docs: install wasm
	yarn docs-build

# Start a REPL session.
repl: build
	./bin/repl.js

# Remove existing build.
clean: install
	yarn clean
	rm -f $(WASM_FILES)

install: .make.deps.installed

# Only reinstall deps when package.json changes.
.make.deps.installed: package.json
	yarn install --network-timeout 100000
	@touch $@

wasm: $(WASM_FILES)

# Rebuild the WASM core.
$(WASM_FILES):
	$(MAKE) -C ../../bloock-wasm-api nodejs
	$(MAKE) -C ../../bloock-wasm-api bundler
