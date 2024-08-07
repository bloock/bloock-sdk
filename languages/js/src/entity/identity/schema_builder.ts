import { BloockBridge } from "../../bridge/bridge";
import { ConfigData } from "../../bridge/proto/bloock_config";
import { BuildSchemaRequest } from "../../bridge/proto/bloock_identity";
import { BooleanAttributeDescriptor } from "./boolean_attribute_descriptor";
import { DateAttributeDescriptor } from "./date_attribute_descriptor";
import { DateTimeAttributeDescriptor } from "./datetime_attribute_descriptor";
import { DecimalAttributeDescriptor } from "./decimal_attribute_descriptor";
import { DecimalEnumAttributeDescriptor } from "./decimal_enum_attribute_descriptor";
import { IntegerAttributeDescriptor } from "./integer_attribute_descriptor";
import { IntegerEnumAttributeDescriptor } from "./integer_enum_attribute_descriptor";
import { Schema } from "./schema";
import { StringAttributeDescriptor } from "./string_attribute_descriptor";
import { StringEnumAttributeDescriptor } from "./string_enum_attribute_descriptor";

/**
 * Is a builder pattern for constructing schema instances.
 */
export class SchemaBuilder {
  displayName: string;
  schemaType: string;
  version: string;
  description: string;
  configData: ConfigData;

  stringAttributes: StringAttributeDescriptor[];
  integerAttributes: IntegerAttributeDescriptor[];
  decimalAttributes: DecimalAttributeDescriptor[];
  booleanAttributes: BooleanAttributeDescriptor[];
  dateAttributes: DateAttributeDescriptor[];
  dateTimeAttributes: DateTimeAttributeDescriptor[];
  stringEnumAttributes: StringEnumAttributeDescriptor[];
  integerEnumAttributes: IntegerEnumAttributeDescriptor[];
  decimalEnumAttributes: DecimalEnumAttributeDescriptor[];

  /**
   * Creates a new instance of SchemaBuilder with initial values.
   * @param displayName
   * @param schemaType
   * @param version
   * @param description
   * @param configData
   */
  constructor(
    displayName: string,
    schemaType: string,
    version: string,
    description: string,
    configData: ConfigData
  ) {
    this.displayName = displayName;
    this.schemaType = schemaType;
    this.version = version;
    this.description = description;
    this.configData = configData;
    this.stringAttributes = [];
    this.integerAttributes = [];
    this.decimalAttributes = [];
    this.booleanAttributes = [];
    this.dateAttributes = [];
    this.dateTimeAttributes = [];
    this.stringEnumAttributes = [];
    this.integerEnumAttributes = [];
    this.decimalEnumAttributes = [];
  }

  /**
   * Adds a string attribute descriptor to the schema builder.
   * @param name
   * @param technicalName
   * @param description
   * @param required
   * @returns
   */
  public addStringAttribute(
    name: string,
    technicalName: string,
    description: string,
    required: boolean
  ): SchemaBuilder {
    this.stringAttributes.push(
      new StringAttributeDescriptor(name, technicalName, description, required)
    );
    return this;
  }

  /**
   * Adds an integer attribute descriptor to the schema builder.
   * @param name
   * @param technicalName
   * @param description
   * @param required
   * @returns
   */
  public addIntegerAttribute(
    name: string,
    technicalName: string,
    description: string,
    required: boolean
  ): SchemaBuilder {
    this.integerAttributes.push(
      new IntegerAttributeDescriptor(name, technicalName, description, required)
    );
    return this;
  }

  /**
   * Adds a decimal attribute descriptor to the schema builder.
   * @param name
   * @param technicalName
   * @param description
   * @param required
   * @returns
   */
  public addDecimalAttribute(
    name: string,
    technicalName: string,
    description: string,
    required: boolean
  ): SchemaBuilder {
    this.decimalAttributes.push(
      new IntegerAttributeDescriptor(name, technicalName, description, required)
    );
    return this;
  }

  /**
   * Adds a boolean attribute descriptor to the schema builder.
   * @param name
   * @param technicalName
   * @param description
   * @param required
   * @returns
   */
  public addBooleanAttribute(
    name: string,
    technicalName: string,
    description: string,
    required: boolean
  ): SchemaBuilder {
    this.booleanAttributes.push(
      new BooleanAttributeDescriptor(name, technicalName, description, required)
    );
    return this;
  }

  /**
   * Adds a date attribute descriptor to the schema builder.
   * @param name
   * @param technicalName
   * @param description
   * @param required
   * @returns
   */
  public addDateAttribute(
    name: string,
    technicalName: string,
    description: string,
    required: boolean
  ): SchemaBuilder {
    this.dateAttributes.push(
      new DateAttributeDescriptor(name, technicalName, description, required)
    );
    return this;
  }

  /**
   * Adds a datetime attribute descriptor to the schema builder.
   * @param name
   * @param technicalName
   * @param description
   * @param required
   * @returns
   */
  public addDateTimeAttribute(
    name: string,
    technicalName: string,
    description: string,
    required: boolean
  ): SchemaBuilder {
    this.dateTimeAttributes.push(
      new DateTimeAttributeDescriptor(
        name,
        technicalName,
        description,
        required
      )
    );
    return this;
  }

  /**
   * Adds a string enum attribute descriptor to the schema builder.
   * @param name
   * @param technicalName
   * @param description
   * @param required
   * @param enumeration
   * @returns
   */
  public addStringEnumAttribute(
    name: string,
    technicalName: string,
    description: string,
    required: boolean,
    enumeration: string[]
  ): SchemaBuilder {
    this.stringEnumAttributes.push(
      new StringEnumAttributeDescriptor(
        name,
        technicalName,
        description,
        required,
        enumeration
      )
    );
    return this;
  }

  /**
   * Adds an integer enum attribute descriptor to the schema builder.
   * @param name
   * @param technicalName
   * @param description
   * @param required
   * @param enumeration
   * @returns
   */
  public addIntegerEnumAttribute(
    name: string,
    technicalName: string,
    description: string,
    required: boolean,
    enumeration: number[]
  ): SchemaBuilder {
    this.integerEnumAttributes.push(
      new IntegerEnumAttributeDescriptor(
        name,
        technicalName,
        description,
        required,
        enumeration
      )
    );
    return this;
  }

  /**
   * Adds a decimal enum attribute descriptor to the schema builder.
   * @param name
   * @param technicalName
   * @param description
   * @param required
   * @param enumeration
   * @returns
   */
  public addDecimalEnumAttribute(
    name: string,
    technicalName: string,
    description: string,
    required: boolean,
    enumeration: number[]
  ): SchemaBuilder {
    this.decimalEnumAttributes.push(
      new DecimalEnumAttributeDescriptor(
        name,
        technicalName,
        description,
        required,
        enumeration
      )
    );
    return this;
  }

  /**
   * Creates a schema using the configured attributes.
   * @returns
   */
  async build(): Promise<Schema> {
    const bridge = new BloockBridge();

    const req = BuildSchemaRequest.fromPartial({
      configData: this.configData,
      displayName: this.displayName,
      schemaType: this.schemaType,
      version: this.version,
      description: this.description,
      stringAttributes: this.stringAttributes.map(a => a.toProto()),
      integerAttributes: this.integerAttributes.map(a => a.toProto()),
      decimalAttributes: this.decimalAttributes.map(a => a.toProto()),
      booleanAttributes: this.booleanAttributes.map(a => a.toProto()),
      dateAttributes: this.dateAttributes.map(a => a.toProto()),
      datetimeAttributes: this.dateTimeAttributes.map(a => a.toProto()),
      stringEnumAttributes: this.stringEnumAttributes.map(a => a.toProto()),
      integerEnumAttributes: this.integerEnumAttributes.map(a => a.toProto()),
      decimalEnumAttributes: this.decimalEnumAttributes.map(a => a.toProto())
    });

    return bridge
      .getIdentity()
      .BuildSchema(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Schema.fromProto(res.schema!);
      });
  }
}
