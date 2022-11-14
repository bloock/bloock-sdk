BLOOCK_VERSION := $(shell cat ../../../VERSION)
test:
	javac -classpath "../lib/build/libs/lib-$(BLOOCK_VERSION)-all.jar:." Test.java
	java -classpath "../lib/build/libs/lib-$(BLOOCK_VERSION)-all.jar:." -enableassertions Test
