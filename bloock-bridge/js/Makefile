.PHONY: install proto dev test fmt lint clean

install: .make.deps.installed

# Only reinstall deps when package.json changes.
.make.deps.installed: package.json
	yarn install --network-timeout 100000
	@touch $@

proto:
	echo "Unimplemented"

dev: install proto
	npm start

test: install proto
	npm test

fmt:
	echo "Unimplemented"

lint:
	echo "Unimplemented"

clean:
	echo "Unimplemented"

