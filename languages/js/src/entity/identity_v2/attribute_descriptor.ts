export class AttributeDescriptor {
  displayName: string;
  technicalName: string;
  description?: string;
  required: boolean;

  constructor(
    displayName: string,
    technicalName: string,
    description: string,
    required: boolean,
  ) {
    this.displayName = displayName;
    this.technicalName = technicalName;
    this.description = description;
    this.required = required;
  }
}
