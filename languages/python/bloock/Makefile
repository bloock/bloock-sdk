build:
	echo "Building bloock..."
	rm -rf build
	rm -f _bloock_lib.abi3.so
	pip3 install -r requirements.txt
	python3 setup.py build
	pip3 install --editable .

.PHONY: build
