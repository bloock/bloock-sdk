UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	rm -rfv lib/src/main/resources/*
	cp -r ../../bloock-bridge/build/native/* ./lib/src/main/resources/

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

