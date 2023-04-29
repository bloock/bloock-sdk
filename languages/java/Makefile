.PHONY: test

UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

copy_lib:
	rm -rfv src/main/resources/*

	mkdir -p src/main/resources
	cp -r ../../bloock-bridge/build/native/* src/main/resources/

dev: copy_lib
	./gradlew run

build: copy_lib
	./gradlew build -x test

test:
	./gradlew test

test-compat:
	./gradlew compatTest

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

