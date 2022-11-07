UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	rm -rfv lib/src/main/resources/*

ifeq ($(UNAME_S),Linux)
	mkdir -p lib/src/main/resources/linux
	cp ../../bloock-bridge/build/native/x86_64-unknown-linux-musl/* lib/src/main/resources/linux/
endif
ifeq ($(UNAME_S),Darwin)
	mkdir -p lib/src/main/resources/macos
	cp ../../bloock-bridge/build/native/x86_64-apple-darwin/* lib/src/main/resources/macos/
endif

dev: copy_lib
	./gradlew run

build: copy_lib
	./gradlew build

test: copy_lib
	./gradlew test

fmt:
	echo "Unimplemented"

lint:
	echo "Unimplemented"

clean:
	./gradlew clean

