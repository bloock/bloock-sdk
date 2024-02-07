.PHONY: build test

copy_lib:
	rm -rfv ./bloock/_ffi/native/*
	cp -r ../../bloock-bridge/build/native/* ./bloock/_ffi/native/

proto:
	python3 -m grpc_tools.protoc -I../../bloock-bridge/proto --python_out=./bloock/_bridge/proto --mypy_out=./bloock/_bridge/proto --grpc_python_out=./bloock/_bridge/proto ../../bloock-bridge/proto/*.proto
	sed -i 's/^\(import.*_pb2\)/from . \1/' bloock/_bridge/proto/*.py

build:
	pip3 install cibuildwheel==2.12.3
	python3 -m cibuildwheel --output-dir wheelhouse
	pip3 install pyotp

dev: copy_lib proto build
	python3 main.py

test:
	pip3 install pyotp
	python3 -m unittest discover -s test/e2e

test-compat:
	python3 -m unittest discover -s test/compat

fmt:
	black .

typecheck:
	mypy bloock

lint:
	flake8 .

docs:
	mkdir -p docs
	pydoc-markdown
	rm docs/sidebar.json

.PHONY: proto docs
