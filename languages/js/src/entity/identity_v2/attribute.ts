/**
 * Represents an attribute with an identifier and a corresponding value.
 */
export class Attribute<T> {
  id: string;
  value: T;

  /**
   * Constructs a Attribute object with the specified parameters.
   * @param id 
   * @param value 
   */
  constructor(id: string, value: T) {
    this.id = id;
    this.value = value;
  }
}
