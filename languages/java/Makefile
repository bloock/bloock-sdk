UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	rm -rfv src/main/resources/*

ifeq ($(UNAME_S),Linux)
	mkdir -p src/main/resources/linux
	cp ../../bloock-bridge/build/native/x86_64-unknown-linux-musl/* src/main/resources/linux/
endif
ifeq ($(UNAME_S),Darwin)
	mkdir -p src/main/resources/macos
	cp ../../bloock-bridge/build/native/aarch64-apple-darwin/* src/main/resources/macos/
endif

dev: copy_lib
	./gradlew run

build: copy_lib
	./gradlew build -x test

test: copy_lib
	./gradlew test

fmt.jar:
	$(eval URL := $(shell curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/google/google-java-format/releases/latest | jq '.assets[] | select(.name | test("all-deps.jar")) | .browser_download_url'))
	curl -L $(URL) > fmt.jar

fmt: fmt.jar
	$(eval FILES := $(shell git ls-files '*.java'))
	$(eval OPENS := $(shell echo "--add-opens jdk.compiler/com.sun.tools.javac."{api,tree,file,util,parser}"=ALL-UNNAMED"))
	java $(OPENS) -jar fmt.jar --replace $(FILES)

lint: fmt

clean:
	./gradlew clean

