import { BloockBridge } from "../../bridge/bridge";
import { ConfigData } from "../../bridge/proto/bloock_config";
import { CreateCredentialRequest } from "../../bridge/proto/bloock_identity";
import {
  BooleanAttribute as BooleanAttributeProto,
  DateAttribute as DateAttributeProto,
  DateTimeAttribute as DateTimeAttributeProto,
  DecimalAttribute as DecimalAttributeProto,
  IntegerAttribute as IntegerAttributeProto,
  StringAttribute as StringAttributeProto
} from "../../bridge/proto/bloock_identity_entities";
import { Key as KeyProto } from "../../bridge/proto/bloock_keys_entities";
import { BooleanAttribute } from "./boolean_attribute";
import { CredentialReceipt } from "./credential_receipt";
import { DateAttribute } from "./date_attribute";
import { DateTimeAttribute } from "./datetime_attribute";
import { DecimalAttribute } from "./decimal_attribute";
import { IntegerAttribute } from "./integer_attribute";
import { Issuer } from "./issuer";
import { StringAttribute } from "./string_attribute";

/**
 * Helps construct credentials by specifying various attributes.
 */
export class CredentialBuilder {
  schemaId: string;
  holderDid: string;
  expiration: number;
  version: number;
  key?: KeyProto;
  configData: ConfigData;

  stringAttributes: StringAttributeProto[];
  integerAttributes: IntegerAttributeProto[];
  decimalAttributes: DecimalAttributeProto[];
  booleanAttributes: BooleanAttributeProto[];
  dateAttributes: DateAttributeProto[];
  dateTimeAttributes: DateTimeAttributeProto[];

  /**
   * Creates a new CredentialBuilder instance with the specified parameters.
   * @param schemaId
   * @param issuerDid
   * @param holderDid
   * @param expiration
   * @param version
   * @param configData
   */
  constructor(
    issuer: Issuer,
    schemaId: string,
    holderDid: string,
    expiration: number,
    version: number,
    configData: ConfigData
  ) {
    this.schemaId = schemaId;
    this.holderDid = holderDid;
    this.expiration = expiration;
    this.version = version;
    this.configData = configData;

    this.key = issuer.key.toProto();
    this.stringAttributes = [];
    this.integerAttributes = [];
    this.decimalAttributes = [];
    this.booleanAttributes = [];
    this.dateAttributes = [];
    this.dateTimeAttributes = [];
  }

  /**
   * Adds a string attribute to the CredentialBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withStringAttribute(key: string, value: string): CredentialBuilder {
    this.stringAttributes.push(new StringAttribute(key, value));
    return this;
  }

  /**
   * Adds an integer attribute to the CredentialBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withIntegerAttribute(key: string, value: number): CredentialBuilder {
    this.integerAttributes.push(new IntegerAttribute(key, value));
    return this;
  }

  /**
   * Adds a decimal attribute to the CredentialBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withDecimalAttribute(key: string, value: number): CredentialBuilder {
    this.decimalAttributes.push(new DecimalAttribute(key, value));
    return this;
  }

  /**
   * Adds a boolean attribute to the CredentialBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withBooleanAttribute(key: string, value: boolean): CredentialBuilder {
    this.booleanAttributes.push(new BooleanAttribute(key, value));
    return this;
  }

  /**
   * Adds a date attribute to the CredentialBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withDateAttribute(key: string, value: Date): CredentialBuilder {
    this.dateAttributes.push(new DateAttribute(key, value).toProto());
    return this;
  }

  /**
   * Adds a datetime attribute to the CredentialBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withDateTimeAttribute(key: string, value: Date): CredentialBuilder {
    this.dateTimeAttributes.push(new DateTimeAttribute(key, value).toProto());
    return this;
  }

  /**
   * Creates and returns a Credential using the specified attributes.
   * @returns
   */
  async build(): Promise<CredentialReceipt> {
    const bridge = new BloockBridge();

    const req = CreateCredentialRequest.fromPartial({
      configData: this.configData,
      schemaId: this.schemaId,
      holderDid: this.holderDid,
      expiration: this.expiration,
      version: this.version,
      key: this.key,
      stringAttributes: this.stringAttributes,
      integerAttributes: this.integerAttributes,
      decimalAttributes: this.decimalAttributes,
      booleanAttributes: this.booleanAttributes,
      dateAttributes: this.dateAttributes,
      datetimeAttributes: this.dateTimeAttributes
    });

    return bridge
      .getIdentity()
      .CreateCredential(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return CredentialReceipt.fromProto(res.credentialReceipt!);
      });
  }
}
