/**
 * Represents a descriptor for an attribute.
 */
export class AttributeDescriptor {
  /**
   * Is the human-readable display name of the attribute.
   */
  displayName: string;
  /**
   * Is the identifier for the attribute.
   */
  technicalName: string;
  /**
   * Is a description providing additional information about the attribute.
   */
  description?: string;
  /**
   * Specifies whether the attribute is required.
   */
  required: boolean;

  /**
   * Constructs an AttributeDescriptor object with the specified parameters.
   * @param displayName 
   * @param technicalName 
   * @param description 
   * @param required 
   */
  constructor(
    displayName: string,
    technicalName: string,
    description: string,
    required: boolean
  ) {
    this.displayName = displayName;
    this.technicalName = technicalName;
    this.description = description;
    this.required = required;
  }
}
