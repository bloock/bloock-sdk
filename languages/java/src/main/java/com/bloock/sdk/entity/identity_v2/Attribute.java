package com.bloock.sdk.entity.identity_v2;

/**
 * Represents an attribute with an identifier and a corresponding value.
 * @param <T>
 */
public class Attribute<T> {
  String id;
  T value;

  /**
   * Constructs a Attribute object with the specified parameters.
   * @param id
   * @param value
   */
  public Attribute(String id, T value) {
    this.id = id;
    this.value = value;
  }
}
