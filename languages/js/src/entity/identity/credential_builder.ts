import { BloockBridge } from "../../bridge/bridge";
import { ConfigData } from "../../bridge/proto/config";
import { CreateCredentialRequest } from "../../bridge/proto/identity";
import { BooleanAttribute } from "./boolean_attribute";
import { CredentialReceipt } from "./credential_receipt";
import { DateAttribute } from "./date_attribute";
import { DateTimeAttribute } from "./datetime_attribute";
import { MultichoiceAttribute } from "./multichoice_attribute";
import { NumberAttribute } from "./number_attribute";

export class CredentialBuilder {
  schemaId: string;
  holderKey: string;
  configData: ConfigData;

  booleanAttributes: BooleanAttribute[];
  dateAttributes: DateAttribute[];
  dateTimeAttributes: DateTimeAttribute[];
  multichoiceAttributes: MultichoiceAttribute[];
  numberAttributes: NumberAttribute[];

  constructor(schemaId: string, holderKey: string, configData: ConfigData) {
    this.schemaId = schemaId;
    this.holderKey = holderKey;
    this.configData = configData;

    this.booleanAttributes = [];
    this.dateAttributes = [];
    this.dateTimeAttributes = [];
    this.multichoiceAttributes = [];
    this.numberAttributes = [];
  }

  public withBoleanAttribute(key: string, value: boolean): CredentialBuilder {
    this.booleanAttributes.push(new BooleanAttribute(key, value));
    return this;
  }

  public withDateAttribute(key: string, value: Date): CredentialBuilder {
    this.dateAttributes.push(new DateAttribute(key, value.getTime()));
    return this;
  }

  public withDateTimeAttribute(key: string, value: Date): CredentialBuilder {
    this.dateTimeAttributes.push(new DateTimeAttribute(key, value.getTime()));
    return this;
  }

  public withMultichoiceAttribute(
    key: string,
    value: string
  ): CredentialBuilder {
    this.multichoiceAttributes.push(new MultichoiceAttribute(key, value));
    return this;
  }

  public withNumberAttribute(key: string, value: number): CredentialBuilder {
    this.numberAttributes.push(new NumberAttribute(key, value));
    return this;
  }

  async build(): Promise<CredentialReceipt> {
    const bridge = new BloockBridge();

    const req = CreateCredentialRequest.fromPartial({
      configData: this.configData,
      schemaId: this.schemaId,
      holderKey: this.holderKey,
      booleanAttributes: this.booleanAttributes.map(a => a.toProto()),
      dateAttributes: this.dateAttributes.map(a => a.toProto()),
      datetimeAttributes: this.dateTimeAttributes.map(a => a.toProto()),
      multichoiceAttributes: this.multichoiceAttributes.map(a => a.toProto()),
      numberAttributes: this.numberAttributes.map(a => a.toProto())
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
