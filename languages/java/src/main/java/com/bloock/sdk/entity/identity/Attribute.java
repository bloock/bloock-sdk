package com.bloock.sdk.entity.identity;

public class Attribute<T> {
  String id;
  T value;

  public Attribute(String id, T value) {
    this.id = id;
    this.value = value;
  }
}
