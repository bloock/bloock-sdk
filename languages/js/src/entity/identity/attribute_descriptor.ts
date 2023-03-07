export class AttributeDescriptor {
  displayName: string;
  technicalName: string;
  description?: string;

  constructor(
    displayName: string,
    technicalName: string,
    description?: string
  ) {
    this.displayName = displayName;
    this.technicalName = technicalName;
    this.description = description;
  }
}
