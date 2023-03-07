export class Attribute<T> {
  id: string;
  value: T;

  constructor(id: string, value: T) {
    this.id = id;
    this.value = value;
  }
}
