copy_lib:
	rm -rfv ./bloock/_ffi/native/*
	cp -r ../../bloock-bridge/build/native/* ./bloock/_ffi/native/

proto:
	python3 -m grpc_tools.protoc -I../../bloock-bridge/proto --python_out=./bloock/_bridge/proto --mypy_out=./bloock/_bridge/proto --grpc_python_out=./bloock/_bridge/proto ../../bloock-bridge/proto/*.proto
	sed -i 's/^\(import.*_pb2\)/from . \1/' bloock/_bridge/proto/*.py

build: copy_lib proto
	echo "Building..."
	rm -rf build
	rm -f _bloock_lib.abi3.so
	pip3 install -r requirements.txt
	python3 setup.py build
	pip3 install --editable .

dev: copy_lib proto build
	python3 main.py

test:
	python3 -m unittest discover -s test/e2e

test-compat:
	python3 -m unittest discover -s test/compat

fmt:
	black .

typecheck:
	mypy bloock

lint:
	flake8 .

.PHONY: proto
