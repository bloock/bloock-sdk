BLOOCK_VERSION := $(shell cat ../../../VERSION)
test:
	javac -classpath "../build/libs/bloock-sdk-$(BLOOCK_VERSION)-all.jar:." Test.java
	java -classpath "../build/libs/bloock-sdk-$(BLOOCK_VERSION)-all.jar:." -enableassertions Test
