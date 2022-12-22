#!/bin/bash
# Tiny script to change the version number of the SDK

read -p "Enter version number: " version

current=$(cat VERSION)

echo $version > VERSION

sed -i "s/\"version\": \"$current\"/\"version\": \"$version\"/g" languages/js/package.json

sed -i "s/__version__ = \"$current\"/__version__ = \"$version\"/g" languages/python/bloock/__init__.py

sed -i "s/version = '$current'/version = '$version'/g" languages/java/build.gradle

sed -i "s/^version = \"$current\"/version = \"$version\"/g" bloock-bridge/Cargo.toml
sed -i "s/^version = \"$current\"/version = \"$version\"/g" bloock-core/Cargo.toml
