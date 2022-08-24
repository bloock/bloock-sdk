UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	rm -rfv app/src/main/resources/*
	cp -r ../../bloock-bridge/build/native/* app/src/main/resources/

dev: copy_lib
	./gradlew run

test: copy_lib
	./gradlew test

fmt:
	echo "Unimplemented"

lint:
	echo "Unimplemented"

clean:
	./gradlew clean

