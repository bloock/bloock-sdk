UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	cp ../c/*.h app/src/main/java/bloock/sdk/java/native/
ifeq ($(UNAME_S),Linux)
	cp ../c/lib.a app/src/main/java/bloock/sdk/java/native/
endif
ifeq ($(UNAME_S),Darwin)
ifeq ($(UNAME_M),x86_64)
	cp ../../target/release/libbloock_bridge.a app/src/main/java/bloock/sdk/java/native/
else
	cp ../c/lib.a app/src/main/java/bloock/sdk/java/native/
endif
endif

dev: copy_lib
	./gradlew run

test: copy_lib
	./gradlew test

fmt:
	echo "Unimplemented"

lint:
	echo "Unimplemented"

clean:
	echo "Unimplemented"

.PHONY: copy_lib test fmt lint clean
