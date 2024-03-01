import { BloockBridge } from "../../bridge/bridge";
import { ConfigData } from "../../bridge/proto/config";
import { CreateCoreCredentialRequest } from "../../bridge/proto/identity_core";
import {
  BooleanAttribute as BooleanAttributeProto,
  DateAttribute as DateAttributeProto,
  DateTimeAttribute as DateTimeAttributeProto,
  DecimalAttribute as DecimalAttributeProto,
  IntegerAttribute as IntegerAttributeProto,
  StringAttribute as StringAttributeProto
} from "../../bridge/proto/identity_entities";
import { Key as KeyProto } from "../../bridge/proto/keys_entities";
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
export class CredentialCoreBuilder {
  schemaId: string;
  issuerDid: string;
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
   * Creates a new CredentialCoreBuilder instance with the specified parameters.
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
    this.issuerDid = issuer.did.did;
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
   * Adds a string attribute to the CredentialCoreBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withStringAttribute(
    key: string,
    value: string
  ): CredentialCoreBuilder {
    this.stringAttributes.push(new StringAttribute(key, value));
    return this;
  }

  /**
   * Adds an integer attribute to the CredentialCoreBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withIntegerAttribute(
    key: string,
    value: number
  ): CredentialCoreBuilder {
    this.integerAttributes.push(new IntegerAttribute(key, value));
    return this;
  }

  /**
   * Adds a decimal attribute to the CredentialCoreBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withDecimalAttribute(
    key: string,
    value: number
  ): CredentialCoreBuilder {
    this.decimalAttributes.push(new DecimalAttribute(key, value));
    return this;
  }

  /**
   * Adds a boolean attribute to the CredentialCoreBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withBooleanAttribute(
    key: string,
    value: boolean
  ): CredentialCoreBuilder {
    this.booleanAttributes.push(new BooleanAttribute(key, value));
    return this;
  }

  /**
   * Adds a date attribute to the CredentialCoreBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withDateAttribute(key: string, value: Date): CredentialCoreBuilder {
    this.dateAttributes.push(new DateAttribute(key, value).toProto());
    return this;
  }

  /**
   * Adds a datetime attribute to the CredentialCoreBuilder.
   * @param key
   * @param value
   * @returns
   */
  public withDateTimeAttribute(
    key: string,
    value: Date
  ): CredentialCoreBuilder {
    this.dateTimeAttributes.push(new DateTimeAttribute(key, value).toProto());
    return this;
  }

  /**
   * Creates and returns a Credential using the specified attributes.
   * @returns
   */
  async build(): Promise<CredentialReceipt> {
    const bridge = new BloockBridge();

    const req = CreateCoreCredentialRequest.fromPartial({
      configData: this.configData,
      schemaId: this.schemaId,
      issuerDid: this.issuerDid,
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
      .getIdentityCore()
      .CreateCoreCredential(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return CredentialReceipt.fromProto(res.credentialReceipt!);
      });
  }
}
