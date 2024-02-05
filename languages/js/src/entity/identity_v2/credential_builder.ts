import { BloockBridge } from "../../bridge/bridge";
import { ConfigData } from "../../bridge/proto/config";
import { CreateCredentialRequestV2 } from "../../bridge/proto/identity_v2";
import { BooleanAttribute } from "./boolean_attribute";
import { CredentialReceipt } from "./credential_receipt";
import { DateAttribute } from "./date_attribute";
import { DateTimeAttribute } from "./datetime_attribute";
import {
  BooleanAttributeV2,
  DateAttributeV2,
  DateTimeAttributeV2,
  DecimalAttributeV2,
  IntegerAttributeV2,
  StringAttributeV2
} from "../../bridge/proto/identity_entities_v2";
import { Signer as SignerProto } from "../../bridge/proto/authenticity_entities";
import { Signer } from "../authenticity/signer";
import { DecimalAttribute } from "./decimal_attribute";
import { IntegerAttribute } from "./integer_attribute";
import { StringAttribute } from "./string_attribute";

/**
 * Helps construct credentials by specifying various attributes.
 */
export class CredentialBuilder {
  schemaId: string;
  issuerDid: string;
  holderDid: string;
  expiration: number;
  version: number;
  signer?: SignerProto;
  configData: ConfigData;

  stringAttributes: StringAttributeV2[];
  integerAttributes: IntegerAttributeV2[];
  decimalAttributes: DecimalAttributeV2[];
  booleanAttributes: BooleanAttributeV2[];
  dateAttributes: DateAttributeV2[];
  dateTimeAttributes: DateTimeAttributeV2[];

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
    schemaId: string,
    issuerDid: string,
    holderDid: string,
    expiration: number,
    version: number,
    configData: ConfigData
  ) {
    this.schemaId = schemaId;
    this.issuerDid = issuerDid;
    this.holderDid = holderDid;
    this.expiration = expiration;
    this.version = version;
    this.configData = configData;

    this.signer = undefined;
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
  public withBoleanAttribute(key: string, value: boolean): CredentialBuilder {
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
   * Sets the signer for the CredentialBuilder.
   * @param signer 
   * @returns 
   */
  public withSigner(signer: Signer): CredentialBuilder {
    this.signer = signer.toProto();
    return this;
  }

  /**
   * Creates and returns a Credential using the specified attributes.
   * @returns 
   */
  async build(): Promise<CredentialReceipt> {
    const bridge = new BloockBridge();

    const req = CreateCredentialRequestV2.fromPartial({
      configData: this.configData,
      schemaId: this.schemaId,
      issuerDid: this.issuerDid,
      holderDid: this.holderDid,
      expiration: this.expiration,
      version: this.version,
      signer: this.signer,
      stringAttributes: this.stringAttributes,
      integerAttributes: this.integerAttributes,
      decimalAttributes: this.decimalAttributes,
      booleanAttributes: this.booleanAttributes,
      dateAttributes: this.dateAttributes,
      datetimeAttributes: this.dateTimeAttributes
    });

    return bridge
      .getIdentityV2()
      .CreateCredential(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return CredentialReceipt.fromProto(res.credentialReceipt!);
      });
  }
}
